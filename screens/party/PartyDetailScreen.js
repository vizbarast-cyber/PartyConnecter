import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Dimensions,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { api } from '../../services/api';
import { useAuthStore } from '../../store/authStore';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import { theme } from '../../config/theme';

const { width } = Dimensions.get('window');

export default function PartyDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { partyId } = route.params;
  const { userProfile } = useAuthStore();
  const [party, setParty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [requestStatus, setRequestStatus] = useState(null);

  useEffect(() => {
    loadParty();
    loadRequestStatus();
  }, [partyId]);

  const loadParty = async () => {
    try {
      const response = await api.get(`/party/${partyId}`);
      setParty(response.data.party);
    } catch (error) {
      console.error('Error loading party:', error);
      Alert.alert('Error', 'Failed to load party details');
    } finally {
      setLoading(false);
    }
  };

  const loadRequestStatus = async () => {
    try {
      const response = await api.get(`/party/${partyId}/request-status`);
      setRequestStatus(response.data.requestStatus);
    } catch (error) {
      console.error('Error loading request status:', error);
    }
  };

  const handleJoin = async () => {
    if (!userProfile) {
      Alert.alert('Error', 'Please log in to join parties');
      return;
    }

    if (userProfile.verification?.status !== 'approved') {
      Alert.alert(
        'Verification Required',
        'You must verify your identity before joining paid parties.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Verify Now',
            onPress: () => navigation.navigate('Verification'),
          },
        ]
      );
      return;
    }

    setJoining(true);
    try {
      const response = await api.post(`/party/${partyId}/join`);
      // Navigate to payment screen
      navigation.navigate('Payment', {
        partyId,
        amount: response.data.amount,
      });
    } catch (error) {
      Alert.alert('Error', error.response?.data?.error || 'Failed to join party');
    } finally {
      setJoining(false);
    }
  };

  const handleConfirmArrival = async () => {
    try {
      await api.post(`/party/${partyId}/confirm-arrival`);
      Alert.alert('Success', 'Arrival confirmed!');
      loadParty();
    } catch (error) {
      Alert.alert('Error', error.response?.data?.error || 'Failed to confirm arrival');
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={theme.colors.accent} />
      </View>
    );
  }

  if (!party) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Party not found</Text>
      </View>
    );
  }

  const partyDate = new Date(party.date);
  const formattedDate = partyDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const isParticipant = party.participants?.some(
    (p) => p.userId === userProfile?.userId && p.paymentStatus === 'completed'
  );
  const hasArrived = party.participants?.find(
    (p) => p.userId === userProfile?.userId
  )?.arrivalConfirmed;

  return (
    <ScrollView style={styles.container}>
      {party.images && party.images.length > 0 && (
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.imageContainer}
        >
          {party.images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image.url }}
              style={styles.image}
            />
          ))}
        </ScrollView>
      )}

      <View style={styles.content}>
        <Text style={styles.title}>{party.title}</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>📅 Date:</Text>
          <Text style={styles.infoValue}>{formattedDate}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>🕐 Time:</Text>
          <Text style={styles.infoValue}>{party.time}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>💰 Price:</Text>
          <Text style={styles.infoValue}>${party.pricePerPerson} per person</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>👥 Participants:</Text>
          <Text style={styles.infoValue}>
            {party.participants?.length || 0} / {party.maxParticipants}
          </Text>
        </View>

        {party.location?.address && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>📍 Location:</Text>
            <Text style={styles.infoValue}>{party.location.address}</Text>
          </View>
        )}

        {party.location?.city && !party.location?.address && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>📍 City:</Text>
            <Text style={styles.infoValue}>{party.location.city}</Text>
          </View>
        )}

        {party.description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{party.description}</Text>
          </View>
        )}

        {party.musicType && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>🎵 Music:</Text>
            <Text style={styles.infoValue}>{party.musicType}</Text>
          </View>
        )}

        {party.dressCode && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>👔 Dress Code:</Text>
            <Text style={styles.infoValue}>{party.dressCode}</Text>
          </View>
        )}

        {party.ageRange && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>🎂 Age Range:</Text>
            <Text style={styles.infoValue}>
              {party.ageRange.min} - {party.ageRange.max} years
            </Text>
          </View>
        )}

        {isParticipant && !hasArrived && (
          <TouchableOpacity
            style={styles.arrivalButton}
            onPress={handleConfirmArrival}
          >
            <Text style={styles.arrivalButtonText}>Confirm Arrival</Text>
          </TouchableOpacity>
        )}

        {hasArrived && (
          <View style={styles.arrivedBadge}>
            <Text style={styles.arrivedText}>✓ Arrival Confirmed</Text>
          </View>
        )}

        {!isParticipant && party.status === 'published' && (
          <>
            {requestStatus === 'pending' && (
              <View style={styles.requestStatusBadge}>
                <Text style={styles.requestStatusText}>
                  ⏳ Request Pending - Waiting for organizer approval
                </Text>
              </View>
            )}
            
            {requestStatus === 'accepted' && (
              <TouchableOpacity
                style={[styles.joinButton, joining && styles.joinButtonDisabled]}
                onPress={handleJoin}
                disabled={joining}
              >
                <Text style={styles.joinButtonText}>
                  {joining ? 'Processing...' : `Pay $${party.pricePerPerson} to Join`}
                </Text>
              </TouchableOpacity>
            )}
            
            {requestStatus === 'rejected' && (
              <View style={styles.requestRejectedBadge}>
                <Text style={styles.requestRejectedText}>
                  ✕ Request Rejected - Your request to join was not accepted
                </Text>
              </View>
            )}
            
            {!requestStatus && (
              <View style={styles.requestInfoBadge}>
                <Text style={styles.requestInfoText}>
                  💡 Like this party to send a request to the organizer
                </Text>
              </View>
            )}
          </>
        )}

        {party.status === 'full' && (
          <View style={styles.fullBadge}>
            <Text style={styles.fullText}>Party is Full</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  imageContainer: {
    height: 300,
  },
  image: {
    width,
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    marginRight: 10,
    minWidth: 100,
  },
  infoValue: {
    fontSize: 16,
    color: theme.colors.text,
    flex: 1,
  },
  section: {
    marginTop: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    lineHeight: 24,
  },
  joinButton: {
    backgroundColor: theme.colors.accent,
    padding: 18,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginTop: 20,
    ...theme.shadows.glow,
  },
  joinButtonDisabled: {
    opacity: 0.6,
  },
  joinButtonText: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '600',
  },
  arrivalButton: {
    backgroundColor: theme.colors.success,
    padding: 18,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginTop: 20,
    ...theme.shadows.glow,
  },
  arrivalButtonText: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '600',
  },
  arrivedBadge: {
    backgroundColor: theme.colors.success + '30',
    padding: 15,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: theme.colors.success,
  },
  arrivedText: {
    color: theme.colors.success,
    fontSize: 16,
    fontWeight: '600',
  },
  fullBadge: {
    backgroundColor: theme.colors.error + '30',
    padding: 15,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: theme.colors.error,
  },
  fullText: {
    color: theme.colors.error,
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 16,
    color: theme.colors.textMuted,
  },
  requestStatusBadge: {
    backgroundColor: theme.colors.warning + '30',
    padding: 15,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: theme.colors.warning,
  },
  requestStatusText: {
    color: theme.colors.warning,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  requestRejectedBadge: {
    backgroundColor: theme.colors.error + '30',
    padding: 15,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: theme.colors.error,
  },
  requestRejectedText: {
    color: theme.colors.error,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  requestInfoBadge: {
    backgroundColor: theme.colors.info + '30',
    padding: 15,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: theme.colors.info,
  },
  requestInfoText: {
    color: theme.colors.info,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

