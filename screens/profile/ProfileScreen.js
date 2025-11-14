import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../../store/authStore';
import { api } from '../../services/api';
import { theme } from '../../config/theme';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { user, userProfile, signOut, updateUserProfile } = useAuthStore();

  useEffect(() => {
    // Refresh profile when screen is focused
    const unsubscribe = navigation.addListener('focus', async () => {
      try {
        const response = await api.get('/user/me');
        if (response.data.user) {
          updateUserProfile(response.data.user);
          console.log('Profile refreshed. Role:', response.data.user.role);
        }
      } catch (error) {
        console.error('Error refreshing profile:', error);
      }
    });
    // Also load on mount
    const loadProfile = async () => {
      try {
        const response = await api.get('/user/me');
        if (response.data.user) {
          updateUserProfile(response.data.user);
          console.log('Profile loaded. Role:', response.data.user.role);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };
    loadProfile();
    return unsubscribe;
  }, [navigation, updateUserProfile]);

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            await signOut();
          },
        },
      ]
    );
  };

  const getVerificationStatus = () => {
    if (!userProfile?.verification) return 'Not Started';
    return userProfile.verification.status.charAt(0).toUpperCase() + 
           userProfile.verification.status.slice(1);
  };

  const getVerificationColor = () => {
    const status = userProfile?.verification?.status;
    if (status === 'approved') return theme.colors.success;
    if (status === 'pending') return theme.colors.warning;
    if (status === 'rejected') return theme.colors.error;
    return theme.colors.textMuted;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
        {userProfile?.profile?.images && userProfile.profile.images.length > 0 ? (
          <Image
            source={{ uri: userProfile.profile.images[0].url }}
            style={styles.avatar}
          />
        ) : (
          <View style={[styles.avatar, styles.placeholderAvatar]}>
            <Text style={styles.placeholderText}>
              {userProfile?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
            </Text>
          </View>
        )}
        <Text style={styles.name}>{userProfile?.name || 'User'}</Text>
        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>
            {userProfile?.role === 'organizer' ? '🎉 Organizer' :
             userProfile?.role === 'participant' ? '🎊 Participant' :
             '🎉🎊 Both'}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Verification Status</Text>
        <View style={[styles.statusBadge, { backgroundColor: getVerificationColor() }]}>
          <Text style={styles.statusText}>{getVerificationStatus()}</Text>
        </View>
        {userProfile?.verification?.status !== 'approved' && (
          <TouchableOpacity
            style={styles.verifyButton}
            onPress={() => navigation.navigate('Verification')}
          >
            <Text style={styles.verifyButtonText}>
              {userProfile?.verification?.status === 'pending' 
                ? 'Check Verification Status' 
                : 'Verify Identity'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile Information</Text>
        {userProfile?.profile?.bio && (
          <Text style={styles.bio}>{userProfile.profile.bio}</Text>
        )}
        {userProfile?.profile?.age && (
          <Text style={styles.info}>Age: {userProfile.profile.age}</Text>
        )}
        {userProfile?.profile?.city && (
          <Text style={styles.info}>City: {userProfile.profile.city}</Text>
        )}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Parties</Text>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Parties', { screen: 'MyParties' })}
        >
          <Text style={styles.menuItemText}>Created Parties</Text>
          <Text style={styles.menuItemArrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('JoinedParties')}
        >
          <Text style={styles.menuItemText}>Joined Parties</Text>
          <Text style={styles.menuItemArrow}>›</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Notifications')}
        >
          <Text style={styles.menuItemText}>Notifications</Text>
          <Text style={styles.menuItemArrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('PrivacyPolicy')}
        >
          <Text style={styles.menuItemText}>Privacy Policy</Text>
          <Text style={styles.menuItemArrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('TermsOfService')}
        >
          <Text style={styles.menuItemText}>Terms of Service</Text>
          <Text style={styles.menuItemArrow}>›</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    ...theme.shadows.glow,
    position: 'relative',
  },
  settingsButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    padding: 10,
    zIndex: 10,
  },
  settingsIcon: {
    fontSize: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: theme.colors.primary,
  },
  placeholderAvatar: {
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 10,
  },
  roleBadge: {
    backgroundColor: theme.colors.surfaceLight,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.round,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  roleText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  section: {
    backgroundColor: theme.colors.surface,
    marginTop: 15,
    padding: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 15,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.md,
    marginBottom: 15,
  },
  statusText: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  verifyButton: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    ...theme.shadows.glow,
  },
  verifyButtonText: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  bio: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: 15,
    lineHeight: 24,
  },
  info: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 8,
  },
  editButton: {
    backgroundColor: theme.colors.surfaceLight,
    padding: 15,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  editButtonText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  menuItemText: {
    fontSize: 16,
    color: theme.colors.text,
  },
  menuItemArrow: {
    fontSize: 24,
    color: theme.colors.primary,
  },
  signOutButton: {
    backgroundColor: theme.colors.error,
    margin: 20,
    padding: 18,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    ...theme.shadows.glow,
  },
  signOutText: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '600',
  },
});

