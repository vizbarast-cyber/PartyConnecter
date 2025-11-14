import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { api } from '../../services/api';
import { theme } from '../../config/theme';

export default function PartyRequestsScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { partyId } = route.params;
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadRequests();
    const unsubscribe = navigation.addListener('focus', () => {
      loadRequests();
    });
    return unsubscribe;
  }, [navigation]);

  const loadRequests = async () => {
    try {
      const response = await api.get(`/party/${partyId}/requests`);
      setRequests(response.data.requests);
    } catch (error) {
      console.error('Error loading requests:', error);
      Alert.alert('Error', 'Failed to load requests');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleAccept = async (userId) => {
    try {
      await api.post(`/party/${partyId}/requests/${userId}/accept`);
      Alert.alert('Success', 'Request accepted! Attendee can now proceed to payment.');
      loadRequests();
    } catch (error) {
      Alert.alert('Error', error.response?.data?.error || 'Failed to accept request');
    }
  };

  const handleReject = async (userId) => {
    Alert.alert(
      'Reject Request',
      'Are you sure you want to reject this request?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reject',
          style: 'destructive',
          onPress: async () => {
            try {
              await api.post(`/party/${partyId}/requests/${userId}/reject`);
              Alert.alert('Success', 'Request rejected');
              loadRequests();
            } catch (error) {
              Alert.alert('Error', error.response?.data?.error || 'Failed to reject request');
            }
          },
        },
      ]
    );
  };

  const renderRequest = ({ item }) => {
    const user = item.user;
    const getStatusColor = (status) => {
      switch (status) {
        case 'pending': return theme.colors.warning;
        case 'accepted': return theme.colors.success;
        case 'rejected': return theme.colors.error;
        default: return theme.colors.textSecondary;
      }
    };

    const requestedDate = new Date(item.requestedAt);
    const formattedDate = requestedDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    return (
      <View style={styles.requestCard}>
        <View style={styles.requestHeader}>
          {user?.profile?.images && user.profile.images.length > 0 && (
            <Image
              source={{ uri: user.profile.images[0].url }}
              style={styles.userImage}
            />
          )}
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name || user?.email || 'Unknown User'}</Text>
            {user?.email && user?.name && (
              <Text style={styles.userEmail}>{user.email}</Text>
            )}
            {user?.profile?.age && (
              <Text style={styles.userAge}>Age: {user.profile.age}</Text>
            )}
            {user?.profile?.city && (
              <Text style={styles.userCity}>📍 {user.profile.city}</Text>
            )}
            <Text style={styles.requestDate}>Requested: {formattedDate}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
          </View>
        </View>

        {user?.profile?.bio && (
          <Text style={styles.userBio} numberOfLines={2}>
            {user.profile.bio}
          </Text>
        )}

        {user?.verification?.status && (
          <View style={styles.verificationBadge}>
            <Text style={styles.verificationText}>
              {user.verification.status === 'approved' ? '✓ Verified' : '⚠ Not Verified'}
            </Text>
          </View>
        )}

        {item.status === 'pending' && (
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, styles.rejectButton]}
              onPress={() => handleReject(item.userId)}
            >
              <Text style={styles.rejectButtonText}>Reject</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.acceptButton]}
              onPress={() => handleAccept(item.userId)}
            >
              <Text style={styles.acceptButtonText}>Accept</Text>
            </TouchableOpacity>
          </View>
        )}

        {item.status === 'accepted' && (
          <View style={styles.acceptedMessage}>
            <Text style={styles.acceptedText}>
              ✓ Request accepted - Attendee can now proceed to payment
            </Text>
          </View>
        )}

        {item.status === 'rejected' && (
          <View style={styles.rejectedMessage}>
            <Text style={styles.rejectedText}>
              ✕ Request rejected
            </Text>
          </View>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const otherRequests = requests.filter(r => r.status !== 'pending');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Party Requests</Text>
        <Text style={styles.headerSubtitle}>
          {pendingRequests.length} pending, {requests.length} total
        </Text>
      </View>

      <FlatList
        data={[...pendingRequests, ...otherRequests]}
        renderItem={renderRequest}
        keyExtractor={(item) => `${item.userId}-${item.requestedAt}`}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => {
            setRefreshing(true);
            loadRequests();
          }} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No requests yet</Text>
            <Text style={styles.emptySubtext}>
              Attendees can like your party to send a request
            </Text>
          </View>
        }
      />
    </View>
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
  header: {
    padding: 20,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  list: {
    padding: 15,
  },
  requestCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.glow,
  },
  requestHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  userAge: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 2,
  },
  userCity: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 2,
  },
  requestDate: {
    fontSize: 12,
    color: theme.colors.textMuted,
    marginTop: 4,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: theme.borderRadius.md,
  },
  statusText: {
    color: theme.colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
  userBio: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 10,
    fontStyle: 'italic',
  },
  verificationBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surfaceLight,
    marginBottom: 10,
  },
  verificationText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    padding: 12,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  rejectButton: {
    backgroundColor: theme.colors.error,
  },
  acceptButton: {
    backgroundColor: theme.colors.success,
  },
  rejectButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  acceptButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  acceptedMessage: {
    backgroundColor: theme.colors.success + '20',
    padding: 10,
    borderRadius: theme.borderRadius.md,
    marginTop: 10,
  },
  acceptedText: {
    color: theme.colors.success,
    fontSize: 14,
    fontWeight: '600',
  },
  rejectedMessage: {
    backgroundColor: theme.colors.error + '20',
    padding: 10,
    borderRadius: theme.borderRadius.md,
    marginTop: 10,
  },
  rejectedText: {
    color: theme.colors.error,
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: theme.colors.textMuted,
    textAlign: 'center',
  },
});

