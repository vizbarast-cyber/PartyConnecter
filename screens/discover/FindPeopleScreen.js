import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { api } from '../../services/api';
import { theme } from '../../config/theme';

export default function FindPeopleScreen() {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await api.get('/user/list');
      setUsers(response.data.users || []);
    } catch (error) {
      console.error('Error loading users:', error);
      Alert.alert('Error', 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const renderUser = ({ item }) => {
    return (
      <TouchableOpacity style={styles.userCard}>
        {item.profile?.images && item.profile.images.length > 0 ? (
          <Image
            source={{ uri: item.profile.images[0].url }}
            style={styles.userImage}
          />
        ) : (
          <View style={[styles.userImage, styles.placeholderImage]}>
            <Text style={styles.placeholderText}>
              {item.email?.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
        <View style={styles.userInfo}>
          <Text style={styles.userName}>
            {item.email?.split('@')[0] || 'User'}
          </Text>
          {item.profile?.age && (
            <Text style={styles.userAge}>{item.profile.age} years old</Text>
          )}
          {item.profile?.bio && (
            <Text style={styles.userBio} numberOfLines={2}>
              {item.profile.bio}
            </Text>
          )}
          <Text style={styles.userRole}>
            {item.role === 'organizer' ? '🎉 Organizer' : 
             item.role === 'participant' ? '🎊 Participant' : 
             '🎉🎊 Both'}
          </Text>
        </View>
      </TouchableOpacity>
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
      <FlatList
        data={users}
        renderItem={renderUser}
        keyExtractor={(item) => item.userId}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.centerContainer}>
            <Text style={styles.emptyText}>No users found</Text>
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
  list: {
    padding: 15,
  },
  userCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.glow,
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  placeholderImage: {
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
  },
  userAge: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  userBio: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  userRole: {
    fontSize: 12,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 16,
    color: theme.colors.textMuted,
  },
});

