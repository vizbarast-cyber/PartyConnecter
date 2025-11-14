import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { api } from '../../services/api';
import { useAuthStore } from '../../store/authStore';
import { theme } from '../../config/theme';

export default function MyPartiesScreen() {
  const navigation = useNavigation();
  const { userProfile } = useAuthStore();
  const [parties, setParties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadParties();
    const unsubscribe = navigation.addListener('focus', () => {
      loadParties();
    });
    return unsubscribe;
  }, [navigation]);

  const loadParties = async () => {
    try {
      const response = await api.get('/party/my/created');
      setParties(response.data.parties);
    } catch (error) {
      console.error('Error loading parties:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderParty = ({ item }) => {
    const partyDate = new Date(item.date);
    const formattedDate = partyDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const getStatusColor = (status) => {
      switch (status) {
        case 'published': return theme.colors.success;
        case 'draft': return theme.colors.warning;
        case 'full': return theme.colors.error;
        case 'cancelled': return theme.colors.textMuted;
        default: return theme.colors.textSecondary;
      }
    };

    const pendingRequests = item.requests?.filter(r => r.status === 'pending').length || 0;

    return (
      <View style={styles.partyCard}>
        <TouchableOpacity
          onPress={() => navigation.navigate('PartyDetail', { partyId: item._id })}
        >
          {item.images && item.images.length > 0 && (
            <Image
              source={{ uri: item.images[0].url }}
              style={styles.partyImage}
            />
          )}
          <View style={styles.partyInfo}>
            <Text style={styles.partyTitle}>{item.title}</Text>
            <Text style={styles.partyDate}>{formattedDate} at {item.time}</Text>
            <View style={styles.partyMeta}>
              <Text style={styles.partyPrice}>${item.pricePerPerson}</Text>
              <Text style={styles.partyParticipants}>
                {item.participants?.length || 0} / {item.maxParticipants}
              </Text>
            </View>
            <View style={styles.partyFooter}>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
              </View>
              {pendingRequests > 0 && (
                <View style={styles.requestsBadge}>
                  <Text style={styles.requestsText}>
                    {pendingRequests} {pendingRequests === 1 ? 'request' : 'requests'}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
        {item.status === 'published' && (
          <TouchableOpacity
            style={styles.requestsButton}
            onPress={() => navigation.navigate('PartyRequests', { partyId: item._id })}
          >
            <Text style={styles.requestsButtonText}>
              {pendingRequests > 0 ? `View Requests (${pendingRequests})` : 'View Requests'}
            </Text>
          </TouchableOpacity>
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Parties</Text>
        {userProfile?.role === 'organizer' || userProfile?.role === 'both' ? (
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => navigation.navigate('CreateParty')}
          >
            <Text style={styles.createButtonText}>+ Create</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <FlatList
        data={parties}
        renderItem={renderParty}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No parties created yet</Text>
            {userProfile?.role === 'organizer' || userProfile?.role === 'both' ? (
              <TouchableOpacity
                style={styles.emptyButton}
                onPress={() => navigation.navigate('CreateParty')}
              >
                <Text style={styles.emptyButtonText}>Create Your First Party</Text>
              </TouchableOpacity>
            ) : null}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    ...theme.shadows.glow,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    textShadowColor: theme.colors.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  createButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: theme.borderRadius.round,
    ...theme.shadows.glow,
  },
  createButtonText: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  list: {
    padding: 15,
  },
  partyCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    marginBottom: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.glow,
  },
  partyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  requestsBadge: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: theme.borderRadius.md,
  },
  requestsText: {
    color: theme.colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
  requestsButton: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  requestsButtonText: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  partyImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  partyInfo: {
    padding: 15,
  },
  partyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 5,
  },
  partyDate: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 10,
  },
  partyMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  partyPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.accent,
  },
  partyParticipants: {
    fontSize: 14,
    color: theme.colors.textSecondary,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: theme.colors.textMuted,
    marginBottom: 20,
  },
  emptyButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: theme.borderRadius.round,
    ...theme.shadows.glow,
  },
  emptyButtonText: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
});

