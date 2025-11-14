import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { api } from '../../services/api';
import { useAuthStore } from '../../store/authStore';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { theme } from '../../config/theme';
import { storage } from '../../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function VerificationScreen() {
  const navigation = useNavigation();
  const { userProfile, updateUserProfile } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [idPhoto, setIdPhoto] = useState(null);
  const [selfie, setSelfie] = useState(null);
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const pickIDPhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera permissions');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets) {
      setIdPhoto(result.assets[0].uri);
    }
  };

  const pickSelfie = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera permissions');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets) {
      setSelfie(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    try {
      // Get userId from userProfile or from auth store
      const { user } = useAuthStore.getState();
      let userId = userProfile?.userId || user?.uid;
      
      // If still no userId, try to refresh profile
      if (!userId) {
        try {
          const response = await api.get('/user/me');
          if (response.data?.user) {
            updateUserProfile(response.data.user);
            userId = response.data.user.userId || user?.uid;
          }
        } catch (refreshError) {
          console.error('Failed to refresh profile:', refreshError);
        }
      }
      
      if (!userId) {
        throw new Error('User not found. Please sign in again.');
      }
      
      // Read the file as blob
      const response = await fetch(uri);
      if (!response.ok) {
        throw new Error('Failed to read image file');
      }
      const blob = await response.blob();
      
      // Create a unique filename
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(7);
      const filename = `verification_${timestamp}_${randomStr}.jpg`;
      const storageRef = ref(storage, `verifications/${userId}/${filename}`);
      
      // Upload to Firebase Storage
      await uploadBytes(storageRef, blob);
      
      // Get download URL
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error(`Failed to upload image: ${error.message}`);
    }
  };

  const handleSubmit = async () => {
    if (!idPhoto || !selfie) {
      Alert.alert('Error', 'Please upload both ID photo and selfie');
      return;
    }

    const age = new Date().getFullYear() - birthDate.getFullYear();
    if (age < 18) {
      Alert.alert('Error', 'You must be 18 or older to use PartyConnect');
      return;
    }

    setLoading(true);
    setUploading(true);
    try {
      // Upload images to Firebase Storage
      const [idPhotoUrl, selfieUrl] = await Promise.all([
        uploadImage(idPhoto),
        uploadImage(selfie),
      ]);

      setUploading(false);

      // Submit verification to backend
      const response = await api.post('/user/upload-id', {
        idPhotoUrl,
        selfieUrl,
        birthDate: birthDate.toISOString(),
      });

      // Update user profile in store
      if (response.data.verification) {
        updateUserProfile({
          ...userProfile,
          verification: response.data.verification,
        });
      }

      Alert.alert(
        'Submitted',
        'Your verification has been submitted. An admin will review it shortly.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error('Verification submission error:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Failed to submit verification';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  const getStatusInfo = () => {
    const status = userProfile?.verification?.status;
    if (status === 'approved') {
      return {
        color: '#4CAF50',
        text: '✓ Verified',
        message: 'Your identity has been verified. You can now create and join parties!',
      };
    }
    if (status === 'pending') {
      return {
        color: '#FF9800',
        text: '⏳ Pending Review',
        message: 'Your verification is being reviewed by our team.',
      };
    }
    if (status === 'rejected') {
      return {
        color: '#F44336',
        text: '✗ Rejected',
        message: userProfile.verification.rejectionReason || 'Verification was rejected. Please try again.',
      };
    }
    return null;
  };

  const statusInfo = getStatusInfo();

  if (statusInfo && userProfile?.verification?.status !== 'rejected') {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.statusContainer}>
          <View style={[styles.statusBadge, { backgroundColor: statusInfo.color }]}>
            <Text style={styles.statusText}>{statusInfo.text}</Text>
          </View>
          <Text style={styles.statusMessage}>{statusInfo.message}</Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Identity Verification</Text>
        <Text style={styles.subtitle}>
          To ensure safety, we require identity verification for all users.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Government ID Photo</Text>
          <Text style={styles.sectionDescription}>
            Take a clear photo of the front of your government-issued ID
          </Text>
          <TouchableOpacity style={styles.uploadButton} onPress={pickIDPhoto}>
            <Text style={styles.uploadButtonText}>
              {idPhoto ? 'Change ID Photo' : 'Take ID Photo'}
            </Text>
          </TouchableOpacity>
          {idPhoto && <Text style={styles.uploadedText}>✓ Photo selected</Text>}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Selfie</Text>
          <Text style={styles.sectionDescription}>
            Take a selfie to verify it's you
          </Text>
          <TouchableOpacity style={styles.uploadButton} onPress={pickSelfie}>
            <Text style={styles.uploadButtonText}>
              {selfie ? 'Change Selfie' : 'Take Selfie'}
            </Text>
          </TouchableOpacity>
          {selfie && <Text style={styles.uploadedText}>✓ Photo selected</Text>}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Birth Date</Text>
          <Text style={styles.sectionDescription}>
            You must be 18 or older to use PartyConnect
          </Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateButtonText}>
              {birthDate.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={birthDate}
              mode="date"
              display="default"
              maximumDate={new Date()}
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setBirthDate(selectedDate);
                }
              }}
            />
          )}
        </View>

        {statusInfo?.status === 'rejected' && (
          <View style={styles.rejectionContainer}>
            <Text style={styles.rejectionTitle}>Previous Rejection Reason:</Text>
            <Text style={styles.rejectionText}>{statusInfo.message}</Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.submitButton, (loading || uploading) && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={loading || uploading}
        >
          {uploading ? (
            <>
              <ActivityIndicator color={theme.colors.text} style={{ marginRight: 10 }} />
              <Text style={styles.submitButtonText}>Uploading images...</Text>
            </>
          ) : loading ? (
            <>
              <ActivityIndicator color={theme.colors.text} style={{ marginRight: 10 }} />
              <Text style={styles.submitButtonText}>Submitting...</Text>
            </>
          ) : (
            <Text style={styles.submitButtonText}>Submit Verification</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 10,
    textShadowColor: theme.colors.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: 30,
    lineHeight: 24,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.primary,
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 15,
  },
  uploadButton: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    ...theme.shadows.glow,
  },
  uploadButtonText: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  uploadedText: {
    marginTop: 10,
    fontSize: 14,
    color: theme.colors.success,
    fontWeight: '600',
  },
  dateButton: {
    backgroundColor: theme.colors.surface,
    padding: 15,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  dateButtonText: {
    fontSize: 16,
    color: theme.colors.text,
    fontWeight: '600',
  },
  statusContainer: {
    padding: 20,
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: theme.borderRadius.round,
    marginBottom: 15,
    ...theme.shadows.glow,
  },
  statusText: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '600',
  },
  statusMessage: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  rejectionContainer: {
    backgroundColor: theme.colors.surface,
    padding: 15,
    borderRadius: theme.borderRadius.md,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: theme.colors.error,
  },
  rejectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.error,
    marginBottom: 8,
  },
  rejectionText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    padding: 18,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    marginTop: 20,
    ...theme.shadows.glow,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '600',
  },
});

