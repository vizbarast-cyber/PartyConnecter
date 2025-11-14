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
import { theme } from '../../config/theme';

export default function JoinedPartiesScreen() {
  const navigation = useNavigation();
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
      const response = await api.get('/party/my/joined');
      setParties(response.data.parties);
    } catch (error) {
      console.error('Error loading joined parties:', error);
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

    const isUpcoming = partyDate > new Date();
    const participant = item.participants?.find(p => p.paymentStatus === 'completed');
    const hasArrived = participant?.arrivalConfirmed;

    return (
      <TouchableOpacity
        style={styles.partyCard}
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
            <Text style={styles.partyLocation}>
              {item.location?.city || 'Location'}
            </Text>
            {hasArrived && (
              <View style={styles.arrivedBadge}>
                <Text style={styles.arrivedText}>✓ Arrived</Text>
              </View>
            )}
          </View>
          {isUpcoming && !hasArrived && (
            <Text style={styles.reminderText}>
              Don't forget to confirm arrival when you get there!
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={theme.colors.accent} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Joined Parties</Text>
      </View>

      <FlatList
        data={parties}
        renderItem={renderParty}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No joined parties yet</Text>
            <Text style={styles.emptySubtext}>
              Discover and join parties from the Discover tab
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
    alignItems: 'center',
    marginBottom: 5,
  },
  partyLocation: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  arrivedBadge: {
    backgroundColor: theme.colors.success,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: theme.borderRadius.md,
  },
  arrivedText: {
    color: theme.colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
  reminderText: {
    fontSize: 12,
    color: theme.colors.warning,
    fontStyle: 'italic',
    marginTop: 5,
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

