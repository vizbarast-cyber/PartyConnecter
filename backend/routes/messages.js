const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const User = require('../models/User');
const Message = require('../models/Message');

// Get conversations (list of users you've messaged or who messaged you)
router.get('/conversations', verifyToken, async (req, res) => {
  try {
    const userId = req.user.uid;
    
    // Get all unique conversation partners
    const sentMessages = await Message.find({ senderId: userId })
      .select('recipientId createdAt')
      .sort({ createdAt: -1 })
      .lean();
    
    const receivedMessages = await Message.find({ recipientId: userId })
      .select('senderId createdAt')
      .sort({ createdAt: -1 })
      .lean();
    
    // Combine and get unique user IDs
    const conversationPartners = new Set();
    const lastMessageMap = new Map();
    
    sentMessages.forEach(msg => {
      conversationPartners.add(msg.recipientId);
      if (!lastMessageMap.has(msg.recipientId) || lastMessageMap.get(msg.recipientId).createdAt < msg.createdAt) {
        lastMessageMap.set(msg.recipientId, { userId: msg.recipientId, lastMessageAt: msg.createdAt, isSender: true });
      }
    });
    
    receivedMessages.forEach(msg => {
      conversationPartners.add(msg.senderId);
      if (!lastMessageMap.has(msg.senderId) || lastMessageMap.get(msg.senderId).lastMessageAt < msg.createdAt) {
        lastMessageMap.set(msg.senderId, { userId: msg.senderId, lastMessageAt: msg.createdAt, isSender: false });
      }
    });
    
    // Get user details for each conversation partner
    const conversations = await Promise.all(
      Array.from(conversationPartners).map(async (partnerId) => {
        const user = await User.findOne({ userId: partnerId })
          .select('userId name profile.images profile.bio verification.status')
          .lean();
        
        if (!user) return null;
        
        const lastMessage = lastMessageMap.get(partnerId);
        const unreadCount = await Message.countDocuments({
          senderId: partnerId,
          recipientId: userId,
          read: false,
        });
        
        return {
          userId: user.userId,
          name: user.name,
          avatar: user.profile?.images?.[0]?.url || null,
          bio: user.profile?.bio || null,
          verified: user.verification?.status === 'approved',
          lastMessageAt: lastMessage?.lastMessageAt || null,
          unreadCount,
        };
      })
    );
    
    // Filter out nulls and sort by last message time
    const validConversations = conversations
      .filter(c => c !== null)
      .sort((a, b) => {
        if (!a.lastMessageAt) return 1;
        if (!b.lastMessageAt) return -1;
        return new Date(b.lastMessageAt) - new Date(a.lastMessageAt);
      });
    
    res.json({ conversations: validConversations });
  } catch (error) {
    console.error('Get conversations error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get messages for a conversation
router.get('/conversations/:userId', verifyToken, async (req, res) => {
  try {
    const currentUserId = req.user.uid;
    const targetUserId = req.params.userId;
    
    // Check if blocked
    const user = await User.findOne({ userId: currentUserId });
    const targetUser = await User.findOne({ userId: targetUserId });
    
    if (!targetUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user && user.blockedUsers.includes(targetUserId)) {
      return res.status(403).json({ error: 'User is blocked' });
    }

    if (targetUser && targetUser.blockedUsers.includes(currentUserId)) {
      return res.status(403).json({ error: 'You are blocked by this user' });
    }

    // Get messages between the two users
    const messages = await Message.find({
      $or: [
        { senderId: currentUserId, recipientId: targetUserId },
        { senderId: targetUserId, recipientId: currentUserId },
      ],
    })
      .sort({ createdAt: 1 })
      .limit(100)
      .lean();
    
    // Mark received messages as read
    await Message.updateMany(
      {
        senderId: targetUserId,
        recipientId: currentUserId,
        read: false,
      },
      {
        $set: {
          read: true,
          readAt: new Date(),
        },
      }
    );
    
    res.json({ messages });
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Send message
router.post('/send', verifyToken, async (req, res) => {
  try {
    const { recipientId, message } = req.body;

    if (!recipientId || !message) {
      return res.status(400).json({ error: 'Recipient ID and message required' });
    }

    // Check if blocked
    const user = await User.findOne({ userId: req.user.uid });
    const recipient = await User.findOne({ userId: recipientId });
    
    if (!recipient) {
      return res.status(404).json({ error: 'Recipient not found' });
    }

    if (user && user.blockedUsers.includes(recipientId)) {
      return res.status(403).json({ error: 'User is blocked' });
    }

    if (recipient && recipient.blockedUsers.includes(req.user.uid)) {
      return res.status(403).json({ error: 'You are blocked by this user' });
    }

    // Create and save message
    const newMessage = new Message({
      senderId: req.user.uid,
      recipientId: recipientId,
      message: message.trim(),
      read: false,
    });
    
    await newMessage.save();
    
    res.json({ 
      message: 'Message sent',
      messageId: newMessage._id,
      createdAt: newMessage.createdAt,
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

