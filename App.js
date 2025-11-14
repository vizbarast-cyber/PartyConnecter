import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View, Text, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { auth } from './config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from './store/authStore';
import { useDevModeStore } from './store/devModeStore';
import { theme } from './config/theme';

// Simple icon components
const TabIcon = ({ name, focused }) => {
  const icons = {
    Discover: focused ? '🎉' : '🎊',
    Messages: focused ? '💬' : '💭',
    Parties: focused ? '🎈' : '🎀',
    Profile: focused ? '👤' : '👥',
  };
  return <Text style={{ fontSize: 24 }}>{icons[name] || '•'}</Text>;
};

// Screens
import LoginScreen from './screens/auth/LoginScreen';
import RoleSelectionScreen from './screens/auth/RoleSelectionScreen';
import DiscoverScreen from './screens/discover/DiscoverScreen';
import FindPartiesScreen from './screens/discover/FindPartiesScreen';
import FindPeopleScreen from './screens/discover/FindPeopleScreen';
import PartyDetailScreen from './screens/party/PartyDetailScreen';
import CreatePartyScreen from './screens/party/CreatePartyScreen';
import MyPartiesScreen from './screens/party/MyPartiesScreen';
import JoinedPartiesScreen from './screens/party/JoinedPartiesScreen';
import PartyRequestsScreen from './screens/party/PartyRequestsScreen';
import ProfileScreen from './screens/profile/ProfileScreen';
import EditProfileScreen from './screens/profile/EditProfileScreen';
import VerificationScreen from './screens/verification/VerificationScreen';
import MessagesScreen from './screens/messages/MessagesScreen';
import ChatScreen from './screens/messages/ChatScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import DevModeScreen from './screens/dev/DevModeScreen';
import PaymentScreen from './screens/payment/PaymentScreen';
import PrivacyPolicyScreen from './screens/legal/PrivacyPolicyScreen';
import TermsOfServiceScreen from './screens/legal/TermsOfServiceScreen';
import SettingsScreen from './screens/settings/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

function DiscoverTabs() {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
        },
        tabBarIndicatorStyle: {
          backgroundColor: theme.colors.primary,
        },
        tabBarLabelStyle: {
          fontWeight: '600',
        },
      }}
    >
      <TopTab.Screen 
        name="FindParties" 
        component={FindPartiesScreen}
        options={{ title: 'Find Parties' }}
      />
      <TopTab.Screen 
        name="FindPeople" 
        component={FindPeopleScreen}
        options={{ title: 'Find People' }}
      />
    </TopTab.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
          ...theme.shadows.glow,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen 
        name="Discover" 
        component={DiscoverScreen}
        options={{ 
          title: 'Discover',
          tabBarIcon: ({ focused }) => <TabIcon name="Discover" focused={focused} />
        }}
      />
      <Tab.Screen 
        name="Messages" 
        component={MessagesScreen}
        options={{ 
          title: 'Messages',
          tabBarIcon: ({ focused }) => <TabIcon name="Messages" focused={focused} />
        }}
      />
      <Tab.Screen 
        name="Parties" 
        component={MyPartiesScreen}
        options={{ 
          title: 'My Parties',
          tabBarIcon: ({ focused }) => <TabIcon name="Parties" focused={focused} />
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ 
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabIcon name="Profile" focused={focused} />
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [devModeModal, setDevModeModal] = useState(false);
  const [devPassword, setDevPassword] = useState('');
  const { user, setUser, loading } = useAuthStore();
  const { checkDevMode, unlockDevMode, shouldShowModal, clearModalFlag } = useDevModeStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      if (initializing) setInitializing(false);
    });

    checkDevMode();

    return unsubscribe;
  }, [initializing]);

  useEffect(() => {
    if (shouldShowModal) {
      setDevModeModal(true);
      clearModalFlag();
    }
  }, [shouldShowModal, clearModalFlag]);

  const handleDevModeSubmit = async () => {
    const success = await unlockDevMode(devPassword);
    if (success) {
      setDevModeModal(false);
      setDevPassword('');
      Alert.alert('Success', 'Developer Mode unlocked!');
    } else {
      Alert.alert('Error', 'Incorrect password');
    }
  };

  if (initializing || loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Modal
        visible={devModeModal}
        transparent
        animationType="fade"
        onRequestClose={() => setDevModeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Developer Mode</Text>
            <Text style={styles.modalSubtitle}>Enter password to unlock</Text>
            <TextInput
              style={styles.modalInput}
              value={devPassword}
              onChangeText={setDevPassword}
              placeholder="Password"
              secureTextEntry
              autoFocus
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => {
                  setDevModeModal(false);
                  setDevPassword('');
                }}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonSubmit]}
                onPress={handleDevModeSubmit}
              >
                <Text style={styles.modalButtonText}>Unlock</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Stack.Navigator 
        screenOptions={{ 
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      >
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen 
              name="PartyDetail" 
              component={PartyDetailScreen}
              options={{ 
                headerShown: true, 
                title: 'Party Details',
                headerStyle: { backgroundColor: theme.colors.surface },
                headerTintColor: theme.colors.primary,
                headerTitleStyle: { color: theme.colors.text, fontWeight: 'bold' },
              }}
            />
            <Stack.Screen 
              name="CreateParty" 
              component={CreatePartyScreen}
              options={{ 
                headerShown: true, 
                title: 'Create Party',
                headerStyle: { backgroundColor: theme.colors.surface },
                headerTintColor: theme.colors.primary,
                headerTitleStyle: { color: theme.colors.text, fontWeight: 'bold' },
              }}
            />
            <Stack.Screen 
              name="JoinedParties" 
              component={JoinedPartiesScreen}
              options={{ 
                headerShown: true, 
                title: 'Joined Parties',
                headerStyle: { backgroundColor: theme.colors.surface },
                headerTintColor: theme.colors.primary,
                headerTitleStyle: { color: theme.colors.text, fontWeight: 'bold' },
              }}
            />
            <Stack.Screen 
              name="PartyRequests" 
              component={PartyRequestsScreen}
              options={{ 
                headerShown: true, 
                title: 'Party Requests',
                headerStyle: { backgroundColor: theme.colors.surface },
                headerTintColor: theme.colors.primary,
                headerTitleStyle: { color: theme.colors.text, fontWeight: 'bold' },
              }}
            />
            <Stack.Screen 
              name="EditProfile" 
              component={EditProfileScreen}
              options={{ 
                headerShown: true, 
                title: 'Edit Profile',
                headerStyle: { backgroundColor: theme.colors.surface },
                headerTintColor: theme.colors.primary,
                headerTitleStyle: { color: theme.colors.text, fontWeight: 'bold' },
              }}
            />
            <Stack.Screen 
              name="Verification" 
              component={VerificationScreen}
              options={{ 
                headerShown: true, 
                title: 'Identity Verification',
                headerStyle: { backgroundColor: theme.colors.surface },
                headerTintColor: theme.colors.primary,
                headerTitleStyle: { color: theme.colors.text, fontWeight: 'bold' },
              }}
            />
            <Stack.Screen 
              name="Chat" 
              component={ChatScreen}
              options={{ 
                headerShown: true,
                headerStyle: { backgroundColor: theme.colors.surface },
                headerTintColor: theme.colors.primary,
                headerTitleStyle: { color: theme.colors.text, fontWeight: 'bold' },
              }}
            />
            <Stack.Screen 
              name="Notifications" 
              component={NotificationsScreen}
              options={{ 
                headerShown: true, 
                title: 'Notifications',
                headerStyle: { backgroundColor: theme.colors.surface },
                headerTintColor: theme.colors.primary,
                headerTitleStyle: { color: theme.colors.text, fontWeight: 'bold' },
              }}
            />
            <Stack.Screen 
              name="DevMode" 
              component={DevModeScreen}
              options={{ 
                headerShown: true, 
                title: 'Developer Mode',
                headerStyle: { backgroundColor: theme.colors.surface },
                headerTintColor: theme.colors.primary,
                headerTitleStyle: { color: theme.colors.text, fontWeight: 'bold' },
              }}
            />
            <Stack.Screen 
              name="Payment" 
              component={PaymentScreen}
              options={{ 
                headerShown: true, 
                title: 'Payment',
                headerStyle: { backgroundColor: theme.colors.surface },
                headerTintColor: theme.colors.primary,
                headerTitleStyle: { color: theme.colors.text, fontWeight: 'bold' },
              }}
            />
            <Stack.Screen 
              name="PrivacyPolicy" 
              component={PrivacyPolicyScreen}
              options={{ 
                headerShown: true, 
                title: 'Privacy Policy',
                headerStyle: { backgroundColor: theme.colors.surface },
                headerTintColor: theme.colors.primary,
                headerTitleStyle: { color: theme.colors.text, fontWeight: 'bold' },
              }}
            />
            <Stack.Screen 
              name="TermsOfService" 
              component={TermsOfServiceScreen}
              options={{ 
                headerShown: true, 
                title: 'Terms of Service',
                headerStyle: { backgroundColor: theme.colors.surface },
                headerTintColor: theme.colors.primary,
                headerTitleStyle: { color: theme.colors.text, fontWeight: 'bold' },
              }}
            />
            <Stack.Screen 
              name="Settings" 
              component={SettingsScreen}
              options={{ 
                headerShown: true, 
                title: 'Settings',
                headerStyle: { backgroundColor: theme.colors.surface },
                headerTintColor: theme.colors.primary,
                headerTitleStyle: { color: theme.colors.text, fontWeight: 'bold' },
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = {
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    padding: 30,
    width: '80%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    ...theme.shadows.glow,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 10,
    textAlign: 'center',
    textShadowColor: theme.colors.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  modalSubtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  modalButtonCancel: {
    backgroundColor: theme.colors.surfaceLight,
  },
  modalButtonSubmit: {
    backgroundColor: theme.colors.primary,
    ...theme.shadows.glow,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
};

