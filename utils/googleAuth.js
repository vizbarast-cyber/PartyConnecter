// Google Sign In using Firebase Web SDK
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { auth } from '../config/firebase';

// Complete the auth session properly
WebBrowser.maybeCompleteAuthSession();

// Google OAuth configuration
const discovery = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
};

export const useGoogleAuth = () => {
  // Use Web Client ID for Expo (works across all platforms)
  const clientId = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || 
                   '982593123040-vbjhf65ti83g3evn8n4nirqiuilathao.apps.googleusercontent.com';
  
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: clientId,
      scopes: ['openid', 'profile', 'email'],
      redirectUri: AuthSession.makeRedirectUri({
        useProxy: true,
      }),
    },
    discovery
  );

  const signInWithGoogle = async () => {
    try {
      const result = await promptAsync();
      
      if (result.type === 'success') {
        const { id_token } = result.params;
        
        // Create credential from Google ID token
        const credential = GoogleAuthProvider.credential(id_token);
        
        // Sign in with credential
        const userCredential = await signInWithCredential(auth, credential);
        
        return userCredential;
      } else {
        throw new Error('Google sign in was cancelled');
      }
    } catch (error) {
      console.error('Google sign in error:', error);
      throw error;
    }
  };

  return { signInWithGoogle, loading: !request };
};

// Alternative: Direct Google Sign In (simpler but requires web client ID)
export const signInWithGoogleDirect = async () => {
  try {
    const provider = new GoogleAuthProvider();
    // Note: signInWithPopup doesn't work in React Native
    // We need to use expo-auth-session instead
    // This is a fallback for web
    if (typeof window !== 'undefined') {
      const { signInWithPopup } = await import('firebase/auth');
      return await signInWithPopup(auth, provider);
    }
    throw new Error('Google sign in requires expo-auth-session on mobile');
  } catch (error) {
    console.error('Google sign in error:', error);
    throw error;
  }
};

