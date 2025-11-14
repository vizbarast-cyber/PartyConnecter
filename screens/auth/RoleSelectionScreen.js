import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { auth } from '../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { api } from '../../services/api';
import { useAuthStore } from '../../store/authStore';
import { theme } from '../../config/theme';
import { useNavigation } from '@react-navigation/native';

WebBrowser.maybeCompleteAuthSession();

export default function RoleSelectionScreen() {
  const navigation = useNavigation();
  const [selectedRole, setSelectedRole] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuthStore();

  const handleSignUp = async () => {
    if (!selectedRole) {
      Alert.alert('Error', 'Please select a role');
      return;
    }

    if (!name || name.trim().length === 0) {
      Alert.alert('Error', 'Please enter your real name');
      return;
    }

    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Verify role is set before sending
      if (!selectedRole) {
        throw new Error('Please select a role before signing up');
      }
      
      console.log('Creating user with role:', selectedRole);
      
      // Create user profile
      const response = await api.post('/user/create', {
        role: selectedRole,
        name: name.trim(),
      });
      
      console.log('User created with role:', response.data.user?.role);
      
      // Verify the role was saved correctly
      if (response.data.user?.role !== selectedRole) {
        console.warn('Role mismatch! Expected:', selectedRole, 'Got:', response.data.user?.role);
        // Try to update role if mismatch (silently - don't show error to user)
        try {
          const updateResponse = await api.put('/user/role', { role: selectedRole });
          if (updateResponse.data?.user) {
            // Update profile with corrected role
            const { updateUserProfile } = useAuthStore.getState();
            updateUserProfile(updateResponse.data.user);
          }
        } catch (updateError) {
          // Silently log - account is created successfully, role can be fixed later
          console.warn('Role update failed (non-critical):', updateError.response?.data?.error || updateError.message);
        }
      }

      // Update user profile in store
      const { updateUserProfile, setUser } = useAuthStore.getState();
      if (response.data.user) {
        updateUserProfile(response.data.user);
        // Also update the user in store to ensure auth state is synced
        if (userCredential?.user) {
          await setUser(userCredential.user);
        }
      }

      // Navigate to verification screen after signup
      navigation.replace('Verification');
    } catch (error) {
      console.error('Sign up error:', error);
      Alert.alert('Sign Up Error', error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    if (!selectedRole) {
      Alert.alert('Error', 'Please select a role');
      return;
    }

    setLoading(true);
    try {
      // Use Web Client ID for Expo (works across all platforms)
      const clientId = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || 
                       '982593123040-vbjhf65ti83g3evn8n4nirqiuilathao.apps.googleusercontent.com';
      
      if (!clientId || clientId === 'YOUR_GOOGLE_CLIENT_ID') {
        Alert.alert(
          'Configuration Error',
          'Google Sign-In is not configured. Please set EXPO_PUBLIC_GOOGLE_CLIENT_ID in your environment variables.\n\nTo set it up:\n1. Go to Firebase Console → Authentication → Sign-in method\n2. Enable Google Sign-In\n3. Get the Web Client ID from Google Cloud Console\n4. Add it to your .env file as EXPO_PUBLIC_GOOGLE_CLIENT_ID',
          [{ text: 'OK' }]
        );
        setLoading(false);
        return;
      }

      const discovery = {
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
        tokenEndpoint: 'https://oauth2.googleapis.com/token',
      };

      const redirectUri = AuthSession.makeRedirectUri({
        useProxy: true,
        scheme: 'partyconnect',
      });

      const request = new AuthSession.AuthRequest({
        clientId: clientId,
        scopes: ['openid', 'profile', 'email'],
        redirectUri: redirectUri,
        responseType: AuthSession.ResponseType.IdToken,
        usePKCE: false,
      });

      const result = await request.promptAsync(discovery);

      if (result.type === 'success') {
        const { id_token } = result.params;
        if (!id_token) {
          throw new Error('No ID token received from Google');
        }
        const credential = GoogleAuthProvider.credential(id_token);
        const userCredential = await signInWithCredential(auth, credential);
        
        // Verify role is set before sending
        if (!selectedRole) {
          throw new Error('Please select a role before signing up');
        }
        
        console.log('Creating user with role:', selectedRole);
        
        // Get name from Google account if available, otherwise use email prefix
        const googleName = userCredential.user.displayName || '';
        const fallbackName = userCredential.user.email?.split('@')[0] || 'User';

        // Create user profile with selected role
        const response = await api.post('/user/create', {
          role: selectedRole,
          name: googleName || fallbackName,
        });
        
        console.log('User created with role:', response.data.user?.role);
        
        // Verify the role was saved correctly
        if (response.data.user?.role !== selectedRole) {
          console.warn('Role mismatch! Expected:', selectedRole, 'Got:', response.data.user?.role);
          // Try to update role if mismatch (silently - don't show error to user)
          try {
            const updateResponse = await api.put('/user/role', { role: selectedRole });
            if (updateResponse.data?.user) {
              // Update profile with corrected role
              const { updateUserProfile } = useAuthStore.getState();
              updateUserProfile(updateResponse.data.user);
            }
          } catch (updateError) {
            // Silently log - account is created successfully, role can be fixed later
            console.warn('Role update failed (non-critical):', updateError.response?.data?.error || updateError.message);
          }
        }
        
        // Update user profile in store
        const { updateUserProfile, setUser } = useAuthStore.getState();
        if (response.data.user) {
          updateUserProfile(response.data.user);
          // Also update the user in store to ensure auth state is synced
          if (userCredential?.user) {
            await setUser(userCredential.user);
          }
        }

        // Navigate to verification screen after signup
        navigation.replace('Verification');
      } else if (result.type === 'error') {
        console.error('Google Auth Error:', result.error);
        Alert.alert(
          'Google Sign-Up Error',
          result.error?.message || 'Failed to authenticate with Google. Please try again.'
        );
      } else {
        // User cancelled
        console.log('Google sign up cancelled');
      }
    } catch (error) {
      console.error('Google Sign Up Error:', error);
      Alert.alert(
        'Google Sign Up Error',
        error.response?.data?.error || error.message || 'Failed to sign up with Google. Please check your configuration and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Choose Your Role</Text>
        <Text style={styles.subtitle}>Select how you want to use PartyConnect</Text>

        <View style={styles.roleContainer}>
          <TouchableOpacity
            style={[
              styles.roleButton,
              selectedRole === 'organizer' && styles.roleButtonSelected,
            ]}
            onPress={() => {
              console.log('Role selected: organizer');
              setSelectedRole('organizer');
            }}
          >
            <Text style={styles.roleTitle}>
              Organizer {selectedRole === 'organizer' && '✓'}
            </Text>
            <Text style={styles.roleDescription}>
              Create and host parties
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.roleButton,
              selectedRole === 'participant' && styles.roleButtonSelected,
            ]}
            onPress={() => {
              console.log('Role selected: participant');
              setSelectedRole('participant');
            }}
          >
            <Text style={styles.roleTitle}>
              Participant {selectedRole === 'participant' && '✓'}
            </Text>
            <Text style={styles.roleDescription}>
              Discover and join parties
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.roleButton,
              selectedRole === 'both' && styles.roleButtonSelected,
            ]}
            onPress={() => {
              console.log('Role selected: both');
              setSelectedRole('both');
            }}
          >
            <Text style={styles.roleTitle}>
              Both {selectedRole === 'both' && '✓'}
            </Text>
            <Text style={styles.roleDescription}>
              Create and join parties
            </Text>
          </TouchableOpacity>
        </View>
        
        {selectedRole && (
          <View style={styles.selectedRoleIndicator}>
            <Text style={styles.selectedRoleText}>
              Selected: {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
            </Text>
          </View>
        )}

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Real Name *"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password (min 6 characters)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={[styles.button, (!selectedRole || loading) && styles.buttonDisabled]}
            onPress={handleSignUp}
            disabled={!selectedRole || loading}
          >
            {loading ? (
              <ActivityIndicator color={theme.colors.text} />
            ) : (
              <Text style={styles.buttonText}>Sign Up</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.googleButton, (!selectedRole || loading) && styles.buttonDisabled]}
            onPress={handleGoogleSignUp}
            disabled={!selectedRole || loading}
          >
            {loading ? (
              <ActivityIndicator color={theme.colors.text} />
            ) : (
              <Text style={styles.buttonText}>Sign up with Google</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: theme.colors.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: 30,
  },
  roleContainer: {
    marginBottom: 30,
  },
  roleButton: {
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.lg,
    padding: 20,
    marginBottom: 15,
    backgroundColor: theme.colors.surface,
  },
  roleButtonSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.surfaceLight,
    ...theme.shadows.glow,
  },
  roleTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 5,
  },
  roleDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  form: {
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginBottom: 15,
    ...theme.shadows.glow,
  },
  googleButton: {
    backgroundColor: '#4285F4',
    ...theme.shadows.glow,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  selectedRoleIndicator: {
    backgroundColor: theme.colors.surfaceLight,
    padding: 12,
    borderRadius: theme.borderRadius.md,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    ...theme.shadows.glow,
  },
  selectedRoleText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

