import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from '../../store/authStore';
import { useDevModeStore } from '../../store/devModeStore';
import { api } from '../../services/api';
import { theme } from '../../config/theme';
import * as Notifications from 'expo-notifications';

const SETTINGS_KEYS = {
  NOTIFICATIONS_ENABLED: 'notifications_enabled',
  DARK_MODE: 'dark_mode',
  SHOW_EMAIL: 'show_email',
  AUTO_CONFIRM_ARRIVAL: 'auto_confirm_arrival',
  SHOW_DISTANCE: 'show_distance',
};

export default function SettingsScreen() {
  const navigation = useNavigation();
  const { user, userProfile, updateUserProfile } = useAuthStore();
  const { isDevMode, unlockDevMode } = useDevModeStore();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [showEmail, setShowEmail] = useState(true);
  const [autoConfirmArrival, setAutoConfirmArrival] = useState(false);
  const [showDistance, setShowDistance] = useState(true);

  useEffect(() => {
    loadSettings();
    // Refresh profile when screen is focused
    const unsubscribe = navigation.addListener('focus', async () => {
      try {
        const response = await api.get('/user/me');
        if (response.data?.user) {
          updateUserProfile(response.data.user);
          console.log('Settings: Profile refreshed. Role:', response.data.user.role);
        }
      } catch (error) {
        console.error('Settings: Error refreshing profile:', error);
      }
    });
    // Also load on mount
    const loadProfile = async () => {
      try {
        const response = await api.get('/user/me');
        if (response.data?.user) {
          updateUserProfile(response.data.user);
          console.log('Settings: Profile loaded. Role:', response.data.user.role);
        }
      } catch (error) {
        console.error('Settings: Error loading profile:', error);
      }
    };
    loadProfile();
    return unsubscribe;
  }, [navigation, updateUserProfile]);

  const loadSettings = async () => {
    try {
      const notifications = await AsyncStorage.getItem(SETTINGS_KEYS.NOTIFICATIONS_ENABLED);
      const darkModeValue = await AsyncStorage.getItem(SETTINGS_KEYS.DARK_MODE);
      const showEmailValue = await AsyncStorage.getItem(SETTINGS_KEYS.SHOW_EMAIL);
      const autoConfirm = await AsyncStorage.getItem(SETTINGS_KEYS.AUTO_CONFIRM_ARRIVAL);
      const showDist = await AsyncStorage.getItem(SETTINGS_KEYS.SHOW_DISTANCE);

      if (notifications !== null) {
        setNotificationsEnabled(notifications === 'true');
      }
      if (darkModeValue !== null) {
        setDarkMode(darkModeValue === 'true');
      }
      if (showEmailValue !== null) {
        setShowEmail(showEmailValue === 'true');
      }
      if (autoConfirm !== null) {
        setAutoConfirmArrival(autoConfirm === 'true');
      }
      if (showDist !== null) {
        setShowDistance(showDist === 'true');
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleNotificationsToggle = async (value) => {
    try {
      setNotificationsEnabled(value);
      await AsyncStorage.setItem(SETTINGS_KEYS.NOTIFICATIONS_ENABLED, value.toString());
      
      if (value) {
        // Request notification permissions
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Permission Required',
            'Please enable notifications in your device settings to receive party updates.',
            [{ text: 'OK' }]
          );
          setNotificationsEnabled(false);
          await AsyncStorage.setItem(SETTINGS_KEYS.NOTIFICATIONS_ENABLED, 'false');
        }
      }
    } catch (error) {
      console.error('Error saving notification settings:', error);
      Alert.alert('Error', 'Failed to update notification settings');
    }
  };

  const handleDarkModeToggle = async (value) => {
    try {
      setDarkMode(value);
      await AsyncStorage.setItem(SETTINGS_KEYS.DARK_MODE, value.toString());
      Alert.alert(
        'Theme Changed',
        'Please restart the app for theme changes to take full effect.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Error saving theme settings:', error);
      Alert.alert('Error', 'Failed to update theme settings');
    }
  };

  const handleSettingToggle = async (key, value, setter) => {
    try {
      setter(value);
      await AsyncStorage.setItem(key, value.toString());
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
      Alert.alert('Error', 'Failed to update setting');
    }
  };

  const SettingItem = ({ title, description, value, onValueChange, icon }) => (
    <View style={styles.settingItem}>
      <View style={styles.settingInfo}>
        {icon && <Text style={styles.settingIcon}>{icon}</Text>}
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {description && (
            <Text style={styles.settingDescription}>{description}</Text>
          )}
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
        thumbColor={value ? theme.colors.text : theme.colors.textMuted}
      />
    </View>
  );

  const SettingButton = ({ title, description, icon, onPress }) => (
    <TouchableOpacity style={styles.settingButton} onPress={onPress}>
      <View style={styles.settingInfo}>
        {icon && <Text style={styles.settingIcon}>{icon}</Text>}
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {description && (
            <Text style={styles.settingDescription}>{description}</Text>
          )}
        </View>
      </View>
      <Text style={styles.settingArrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={styles.headerSubtitle}>Manage your app preferences</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <SettingItem
          title="Enable Notifications"
          description="Receive updates about parties, messages, and requests"
          value={notificationsEnabled}
          onValueChange={handleNotificationsToggle}
          icon="🔔"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        <SettingItem
          title="Dark Mode"
          description="Use dark theme (restart app to apply)"
          value={darkMode}
          onValueChange={handleDarkModeToggle}
          icon="🌙"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacy</Text>
        <SettingItem
          title="Show Email"
          description="Display your email on your profile"
          value={showEmail}
          onValueChange={(value) => handleSettingToggle(SETTINGS_KEYS.SHOW_EMAIL, value, setShowEmail)}
          icon="👁️"
        />
        <SettingItem
          title="Show Distance"
          description="Show distance to parties in search results"
          value={showDistance}
          onValueChange={(value) => handleSettingToggle(SETTINGS_KEYS.SHOW_DISTANCE, value, setShowDistance)}
          icon="📍"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Party Settings</Text>
        <SettingItem
          title="Auto-Confirm Arrival"
          description="Automatically confirm arrival when you're near the party location"
          value={autoConfirmArrival}
          onValueChange={(value) => handleSettingToggle(SETTINGS_KEYS.AUTO_CONFIRM_ARRIVAL, value, setAutoConfirmArrival)}
          icon="✓"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <SettingButton
          title="Edit Profile"
          description="Update your profile information"
          icon="✏️"
          onPress={() => navigation.navigate('EditProfile')}
        />
        <SettingButton
          title="Change Role"
          description={`Current: ${userProfile?.role || 'unknown'}`}
          icon="🔄"
          onPress={() => {
            Alert.alert(
              'Change Role',
              'Select your new role:',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Organizer',
                  onPress: async () => {
                    try {
                      await api.put('/user/role', { role: 'organizer' });
                      const response = await api.get('/user/me');
                      updateUserProfile(response.data.user);
                      Alert.alert('Success', 'Role updated to Organizer');
                    } catch (error) {
                      Alert.alert('Error', error.response?.data?.error || 'Failed to update role');
                    }
                  },
                },
                {
                  text: 'Participant',
                  onPress: async () => {
                    try {
                      await api.put('/user/role', { role: 'participant' });
                      const response = await api.get('/user/me');
                      updateUserProfile(response.data.user);
                      Alert.alert('Success', 'Role updated to Participant');
                    } catch (error) {
                      Alert.alert('Error', error.response?.data?.error || 'Failed to update role');
                    }
                  },
                },
                {
                  text: 'Both',
                  onPress: async () => {
                    try {
                      await api.put('/user/role', { role: 'both' });
                      const response = await api.get('/user/me');
                      updateUserProfile(response.data.user);
                      Alert.alert('Success', 'Role updated to Both');
                    } catch (error) {
                      Alert.alert('Error', error.response?.data?.error || 'Failed to update role');
                    }
                  },
                },
              ]
            );
          }}
        />
        <SettingButton
          title="Verification Status"
          description="Check your identity verification"
          icon="🆔"
          onPress={() => navigation.navigate('Verification')}
        />
        <SettingButton
          title="Privacy Policy"
          description="Read our privacy policy"
          icon="🔒"
          onPress={() => navigation.navigate('PrivacyPolicy')}
        />
        <SettingButton
          title="Terms of Service"
          description="Read our terms of service"
          icon="📄"
          onPress={() => navigation.navigate('TermsOfService')}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.aboutItem}>
          <Text style={styles.aboutLabel}>App Version</Text>
          <Text style={styles.aboutValue}>1.0.0</Text>
        </View>
        <View style={styles.aboutItem}>
          <Text style={styles.aboutLabel}>User ID</Text>
          <Text style={styles.aboutValue} numberOfLines={1}>
            {userProfile?.userId || user?.uid || 'Not available'}
          </Text>
        </View>
        {!isDevMode && (
          <TouchableOpacity
            style={styles.devModeButton}
            onPress={() => {
              Alert.prompt(
                'Developer Mode',
                'Enter password to unlock:',
                [
                  { text: 'Cancel', style: 'cancel' },
                  {
                    text: 'Unlock',
                    onPress: async (password) => {
                      if (password) {
                        const success = await unlockDevMode(password);
                        if (success) {
                          Alert.alert('Success', 'Developer Mode unlocked!');
                        } else {
                          Alert.alert('Error', 'Incorrect password');
                        }
                      }
                    },
                  },
                ],
                'secure-text'
              );
            }}
          >
            <Text style={styles.devModeButtonText}>Unlock Developer Mode</Text>
          </TouchableOpacity>
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
  header: {
    padding: 20,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  section: {
    backgroundColor: theme.colors.surface,
    marginTop: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  settingButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  settingArrow: {
    fontSize: 24,
    color: theme.colors.primary,
    marginLeft: 10,
  },
  aboutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  aboutLabel: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  aboutValue: {
    fontSize: 14,
    color: theme.colors.text,
    fontWeight: '600',
    maxWidth: '60%',
  },
});

