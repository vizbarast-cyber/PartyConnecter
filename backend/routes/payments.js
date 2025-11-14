const express = require('express');
const router = express.Router();
const { verifyToken, requireVerification } = require('../middleware/auth');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const paypal = require('paypal-rest-sdk');
const Party = require('../models/Party');
const Payment = require('../models/Payment');

// Configure PayPal
paypal.configure({
  mode: process.env.PAYPAL_MODE || 'sandbox',
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_SECRET,
});

const COMMISSION_RATE = parseFloat(process.env.COMMISSION_RATE || '0.05');
const ESCROW_AUTO_RELEASE_HOURS = parseInt(process.env.ESCROW_AUTO_RELEASE_HOURS || '24');

// Create payment intent (Stripe)
router.post('/create-checkout-session', verifyToken, requireVerification, async (req, res) => {
  try {
    const { partyId, provider } = req.body;

    if (!partyId) {
      return res.status(400).json({ error: 'Party ID required' });
    }

    const party = await Party.findById(partyId);
    
    if (!party) {
      return res.status(404).json({ error: 'Party not found' });
    }

    if (party.participants.length >= party.maxParticipants) {
      return res.status(400).json({ error: 'Party is full' });
    }

    const amount = party.pricePerPerson;
    const commission = amount * COMMISSION_RATE;
    const netAmount = amount - commission;

    if (provider === 'stripe') {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: party.title,
                description: `Party ticket for ${party.title}`,
              },
              unit_amount: Math.round(amount * 100), // Convert to cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin || 'partyconnect://'}?payment=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin || 'partyconnect://'}?payment=cancelled`,
        metadata: {
          userId: req.user.uid,
          partyId: partyId.toString(),
        },
      });

      res.json({ 
        sessionId: session.id,
        url: session.url,
        amount,
      });
    } else if (provider === 'paypal') {
      const create_payment_json = {
        intent: 'sale',
        payer: {
          payment_method: 'paypal',
        },
        redirect_urls: {
          return_url: `${req.headers.origin || 'partyconnect://'}?payment=success`,
          cancel_url: `${req.headers.origin || 'partyconnect://'}?payment=cancelled`,
        },
        transactions: [{
          item_list: {
            items: [{
              name: party.title,
              sku: partyId.toString(),
              price: amount.toFixed(2),
              currency: 'USD',
              quantity: 1,
            }],
          },
          amount: {
            currency: 'USD',
            total: amount.toFixed(2),
          },
          description: `Party ticket for ${party.title}`,
          custom: JSON.stringify({
            userId: req.user.uid,
            partyId: partyId.toString(),
          }),
        }],
      };

      paypal.payment.create(create_payment_json, (error, payment) => {
        if (error) {
          console.error('PayPal payment creation error:', error);
          return res.status(500).json({ error: 'Payment creation failed' });
        }

        const approvalUrl = payment.links.find(link => link.rel === 'approval_url');
        res.json({
          paymentId: payment.id,
          url: approvalUrl.href,
          amount,
        });
      });
    } else {
      res.status(400).json({ error: 'Invalid payment provider' });
    }
  } catch (error) {
    console.error('Create payment error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Stripe webhook
router.post('/webhook/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    await handlePaymentSuccess(
      session.metadata.userId,
      session.metadata.partyId,
      'stripe',
      session.id,
      parseFloat(session.amount_total) / 100,
    );
  }

  res.json({ received: true });
});

// PayPal webhook/callback
router.get('/webhook/paypal', async (req, res) => {
  const { paymentId, PayerID } = req.query;

  if (!paymentId || !PayerID) {
    return res.status(400).json({ error: 'Missing payment parameters' });
  }

  paypal.payment.execute(paymentId, { payer_id: PayerID }, async (error, payment) => {
    if (error) {
      console.error('PayPal payment execution error:', error);
      return res.status(500).json({ error: 'Payment execution failed' });
    }

    if (payment.state === 'approved') {
      const custom = JSON.parse(payment.transactions[0].custom);
      const amount = parseFloat(payment.transactions[0].amount.total);

      await handlePaymentSuccess(
        custom.userId,
        custom.partyId,
        'paypal',
        paymentId,
        amount,
      );

      res.redirect(`${req.headers.origin || 'partyconnect://'}?payment=success`);
    } else {
      res.status(400).json({ error: 'Payment not approved' });
    }
  });
});

// Handle payment success
async function handlePaymentSuccess(userId, partyId, provider, transactionId, amount) {
  try {
    const party = await Party.findById(partyId);
    
    if (!party) {
      throw new Error('Party not found');
    }

    // Check if already paid
    const existingPayment = await Payment.findOne({
      userId,
      partyId,
      status: 'completed',
    });

    if (existingPayment) {
      return; // Already processed
    }

    const commission = amount * COMMISSION_RATE;
    const netAmount = amount - commission;

    // Create payment record
    const payment = new Payment({
      userId,
      partyId,
      amount,
      commission,
      netAmount,
      provider,
      providerTransactionId: transactionId,
      status: 'completed',
      escrowStatus: 'held',
    });

    await payment.save();

    // Add participant to party
    party.participants.push({
      userId,
      joinedAt: new Date(),
      paymentId: payment._id.toString(),
      paymentStatus: 'completed',
    });

    // Update party status if full
    if (party.participants.length >= party.maxParticipants) {
      party.status = 'full';
    }

    await party.save();
  } catch (error) {
    console.error('Handle payment success error:', error);
    throw error;
  }
}

// Release escrow (when arrival confirmed or auto-release)
router.post('/release-escrow', verifyToken, async (req, res) => {
  try {
    const { paymentId } = req.body;

    const payment = await Payment.findById(paymentId);
    
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    if (payment.escrowStatus !== 'held') {
      return res.status(400).json({ error: 'Escrow already released or refunded' });
    }

    // Check if arrival confirmed
    const party = await Party.findById(payment.partyId);
    const participant = party.participants.find(p => p.userId === payment.userId);
    
    if (!participant || !participant.arrivalConfirmed) {
      return res.status(400).json({ error: 'Arrival not confirmed' });
    }

    payment.escrowStatus = 'released';
    payment.status = 'released';
    payment.releasedAt = new Date();
    await payment.save();

    // In production, transfer funds to organizer's account
    // For now, just mark as released

    res.json({ message: 'Escrow released', payment });
  } catch (error) {
    console.error('Release escrow error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Refund payment
router.post('/refund', verifyToken, async (req, res) => {
  try {
    const { paymentId, reason } = req.body;

    const payment = await Payment.findById(paymentId);
    
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    if (payment.status === 'refunded') {
      return res.status(400).json({ error: 'Already refunded' });
    }

    // Process refund through provider
    if (payment.provider === 'stripe') {
      const refund = await stripe.refunds.create({
        payment_intent: payment.providerTransactionId,
        amount: Math.round(payment.amount * 100),
      });
      
      payment.status = 'refunded';
      payment.escrowStatus = 'refunded';
      payment.refundedAt = new Date();
      payment.refundReason = reason;
      await payment.save();

      // Remove participant from party
      const party = await Party.findById(payment.partyId);
      party.participants = party.participants.filter(
        p => p.paymentId !== paymentId
      );
      await party.save();

      res.json({ message: 'Refund processed', refund });
    } else if (payment.provider === 'paypal') {
      // PayPal refund logic
      // Implementation depends on PayPal SDK version
      res.json({ message: 'PayPal refund initiated' });
    }
  } catch (error) {
    console.error('Refund error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

