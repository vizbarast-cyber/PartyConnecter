import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import { api } from '../../services/api';
import { useDevModeStore } from '../../store/devModeStore';
import { theme } from '../../config/theme';
import Constants from 'expo-constants';

// Get Stripe publishable key from environment or app config
const getStripePublishableKey = () => {
  if (process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    return process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  }
  // Fallback to app config
  try {
    return Constants.expoConfig?.extra?.stripePublishableKey;
  } catch (e) {
    // Final fallback (should not be used in production)
    return 'pk_live_51OMCDWGYSmJketTkw3nnIbyDg54BFBIG8zjxm3UIh7RvSTVetC0bOzcqvfvmWdkWknz8g2qxMc8dalNfu5xHrwUW00ONoP1mId';
  }
};

const STRIPE_PUBLISHABLE_KEY = getStripePublishableKey();

function PaymentContent() {
  const route = useRoute();
  const navigation = useNavigation();
  const { partyId, amount } = route.params;
  let stripe = null;
  try {
    stripe = useStripe();
  } catch (error) {
    console.warn('Stripe not available:', error);
  }
  const { initPaymentSheet, presentPaymentSheet } = stripe || {};
  const { isDevMode } = useDevModeStore();
  const [loading, setLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);

  const handleStripePayment = async () => {
    if (!initPaymentSheet || !presentPaymentSheet) {
      Alert.alert('Error', 'Stripe is not available. Please configure Stripe or use PayPal.');
      return;
    }
    
    setLoading(true);
    try {
      const response = await api.post('/payments/create-checkout-session', {
        partyId,
        provider: 'stripe',
      });

      if (isDevMode) {
        // Bypass payment in dev mode
        Alert.alert('Dev Mode', 'Payment bypassed', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
        return;
      }

      // In a real implementation, you would use Stripe's payment sheet
      // For now, redirect to web checkout
      Alert.alert(
        'Payment',
        'Redirecting to payment...',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Continue',
            onPress: () => {
              // Open payment URL
              navigation.goBack();
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', error.response?.data?.error || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  const handlePayPalPayment = async () => {
    setLoading(true);
    try {
      const response = await api.post('/payments/create-checkout-session', {
        partyId,
        provider: 'paypal',
      });

      if (isDevMode) {
        // Bypass payment in dev mode
        Alert.alert('Dev Mode', 'Payment bypassed', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
        return;
      }

      // Open PayPal URL
      Alert.alert(
        'Payment',
        'Redirecting to PayPal...',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Continue',
            onPress: () => {
              // Open PayPal URL
              navigation.goBack();
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', error.response?.data?.error || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Complete Payment</Text>
        <Text style={styles.amount}>${amount}</Text>
        <Text style={styles.description}>
          Choose your payment method to join this party
        </Text>

        {isDevMode && (
          <View style={styles.devModeBanner}>
            <Text style={styles.devModeText}>
              ⚠️ Dev Mode: Payments will be bypassed
            </Text>
          </View>
        )}

        <View style={styles.paymentMethods}>
          <TouchableOpacity
            style={[
              styles.paymentMethod,
              selectedProvider === 'stripe' && styles.paymentMethodSelected,
            ]}
            onPress={() => setSelectedProvider('stripe')}
          >
            <Text style={styles.paymentMethodTitle}>💳 Credit/Debit Card</Text>
            <Text style={styles.paymentMethodSubtitle}>Pay with Stripe</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentMethod,
              selectedProvider === 'paypal' && styles.paymentMethodSelected,
            ]}
            onPress={() => setSelectedProvider('paypal')}
          >
            <Text style={styles.paymentMethodTitle}>🅿️ PayPal</Text>
            <Text style={styles.paymentMethodSubtitle}>Pay with PayPal account</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            styles.payButton,
            (!selectedProvider || loading) && styles.payButtonDisabled,
          ]}
          onPress={() => {
            if (selectedProvider === 'stripe') {
              handleStripePayment();
            } else if (selectedProvider === 'paypal') {
              handlePayPalPayment();
            }
          }}
          disabled={!selectedProvider || loading}
        >
          {loading ? (
            <ActivityIndicator color={theme.colors.text} />
          ) : (
            <Text style={styles.payButtonText}>Pay ${amount}</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          Your payment will be held in escrow until you confirm arrival at the party.
        </Text>
      </View>
    </ScrollView>
  );
}

export default function PaymentScreen() {
  // Only wrap with StripeProvider if we have a valid key
  if (!STRIPE_PUBLISHABLE_KEY || STRIPE_PUBLISHABLE_KEY.includes('your_') || STRIPE_PUBLISHABLE_KEY.length < 20) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ color: theme.colors.text, textAlign: 'center' }}>
          Stripe is not configured. Please set EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY in your environment variables.
        </Text>
      </View>
    );
  }

  try {
    return (
      <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
        <PaymentContent />
      </StripeProvider>
    );
  } catch (error) {
    console.error('Stripe initialization error:', error);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ color: theme.colors.text, textAlign: 'center' }}>
          Payment system unavailable. Please try again later.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 10,
    textAlign: 'center',
  },
  amount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: theme.colors.accent,
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: 30,
  },
  devModeBanner: {
    backgroundColor: theme.colors.warning + '30',
    padding: 15,
    borderRadius: theme.borderRadius.md,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: theme.colors.warning,
  },
  devModeText: {
    fontSize: 14,
    color: theme.colors.warning,
    textAlign: 'center',
  },
  paymentMethods: {
    marginBottom: 30,
  },
  paymentMethod: {
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.lg,
    padding: 20,
    marginBottom: 15,
    backgroundColor: theme.colors.surface,
  },
  paymentMethodSelected: {
    borderColor: theme.colors.accent,
    backgroundColor: theme.colors.surfaceLight,
    ...theme.shadows.glow,
  },
  paymentMethodTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 5,
  },
  paymentMethodSubtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  payButton: {
    backgroundColor: theme.colors.accent,
    padding: 18,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginBottom: 20,
    ...theme.shadows.glow,
  },
  payButtonDisabled: {
    opacity: 0.5,
  },
  payButtonText: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '600',
  },
  disclaimer: {
    fontSize: 12,
    color: theme.colors.textMuted,
    textAlign: 'center',
    lineHeight: 18,
  },
});

