import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { useAuthStore } from '../../store/authStore';
import { theme } from '../../config/theme';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuthStore();

  const handleEmailLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Navigation handled by auth state change
    } catch (error) {
      Alert.alert('Login Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
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
        await signInWithCredential(auth, credential);
        // Navigation handled by auth state change
      } else if (result.type === 'error') {
        console.error('Google Auth Error:', result.error);
        Alert.alert(
          'Google Sign-In Error',
          result.error?.message || 'Failed to authenticate with Google. Please try again.'
        );
      } else {
        // User cancelled
        console.log('Google sign in cancelled');
      }
    } catch (error) {
      console.error('Google Login Error:', error);
      Alert.alert(
        'Google Login Error',
        error.message || 'Failed to sign in with Google. Please check your configuration and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    navigation.navigate('RoleSelection');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>PartyConnect</Text>
        <Text style={styles.subtitle}>Connect. Party. Celebrate.</Text>

        <View style={styles.form}>
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
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleEmailLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={theme.colors.text} />
            ) : (
              <Text style={styles.buttonText}>Sign In</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.googleButton, loading && styles.buttonDisabled]}
            onPress={handleGoogleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={theme.colors.text} />
            ) : (
              <Text style={styles.buttonText}>Sign in with Google</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSignUp} style={styles.signUpLink}>
            <Text style={styles.signUpText}>
              Don't have an account? <Text style={styles.signUpBold}>Sign Up</Text>
            </Text>
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
    fontSize: 42,
    fontWeight: 'bold',
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: theme.colors.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  subtitle: {
    fontSize: 18,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: 40,
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
    opacity: 0.6,
  },
  buttonText: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  signUpLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  signUpText: {
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
  signUpBold: {
    fontWeight: '600',
    color: theme.colors.primary,
  },
});

