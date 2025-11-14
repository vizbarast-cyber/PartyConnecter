import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { api } from '../../services/api';
import { useAuthStore } from '../../store/authStore';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../config/theme';
import { storage } from '../../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function CreatePartyScreen() {
  const navigation = useNavigation();
  const { userProfile, updateUserProfile } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    pricePerPerson: '',
    maxParticipants: '',
    location: {
      address: '',
      city: '',
      coordinates: { lat: 0, lng: 0 },
    },
    images: [],
    musicType: '',
    dressCode: '',
    ageRange: { min: '', max: '' },
  });

  const pickImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera roll permissions');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets) {
      try {
        setLoading(true);
        // Upload images to Firebase Storage
        const imageUrls = await uploadImages(result.assets);
        setFormData({
          ...formData,
          images: [...formData.images, ...imageUrls],
        });
      } catch (error) {
        Alert.alert('Error', error.message || 'Failed to upload images');
      } finally {
        setLoading(false);
      }
    }
  };

  const uploadImages = async (assets) => {
    try {
      const { user } = useAuthStore.getState();
      const userId = userProfile?.userId || user?.uid;
      
      if (!userId) {
        throw new Error('User not found');
      }
      
      const uploadPromises = assets.map(async (asset, index) => {
        try {
          // Read the file as blob
          const response = await fetch(asset.uri);
          if (!response.ok) {
            throw new Error('Failed to read image file');
          }
          const blob = await response.blob();
          
          // Create a unique filename
          const timestamp = Date.now();
          const randomStr = Math.random().toString(36).substring(7);
          const filename = `party_${timestamp}_${index}_${randomStr}.jpg`;
          const storageRef = ref(storage, `parties/${userId}/${filename}`);
          
          // Upload to Firebase Storage
          await uploadBytes(storageRef, blob);
          
          // Get download URL
          const downloadURL = await getDownloadURL(storageRef);
          return { url: downloadURL, order: formData.images.length + index };
        } catch (error) {
          console.error('Error uploading image:', error);
          throw new Error(`Failed to upload image ${index + 1}: ${error.message}`);
        }
      });
      
      const uploadedImages = await Promise.all(uploadPromises);
      return uploadedImages;
    } catch (error) {
      console.error('Error uploading images:', error);
      throw new Error(`Failed to upload images: ${error.message}`);
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.description || !formData.date || 
        !formData.time || !formData.pricePerPerson || !formData.maxParticipants) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (formData.images.length < 3) {
      Alert.alert('Error', 'Please upload at least 3 images');
      return;
    }

    setLoading(true);
    try {
      // Refresh user profile before creating party to ensure we have latest role
      try {
        const profileResponse = await api.get('/user/me');
        if (profileResponse.data.user) {
          updateUserProfile(profileResponse.data.user);
          console.log('Profile refreshed before party creation. Role:', profileResponse.data.user.role);
        }
      } catch (profileError) {
        console.warn('Could not refresh profile:', profileError);
      }

      const response = await api.post('/party/create', formData);
      Alert.alert('Success', 'Party saved as draft', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error('Create party error:', error);
      console.error('Error details:', {
        status: error.response?.status,
        data: error.response?.data,
        userRole: userProfile?.role,
        verificationStatus: userProfile?.verification?.status,
      });
      
      const errorData = error.response?.data;
      let errorMessage = 'Failed to create party';
      
      if (errorData?.error) {
        errorMessage = errorData.error;
        // Add helpful context for common errors
        if (errorData.error.includes('permissions') || errorData.error.includes('Insufficient')) {
          errorMessage += `\n\nYour role: ${userProfile?.role || 'unknown'}\nRequired: organizer or both`;
          errorMessage += '\n\nTip: Go to Settings → Change Role to update your role.';
        }
        if (errorData.error.includes('verification') || errorData.verificationStatus) {
          const status = errorData.verificationStatus || userProfile?.verification?.status || 'not_submitted';
          errorMessage += `\n\nVerification status: ${status}`;
          if (status === 'pending') {
            errorMessage += '\nYour verification is pending. Please wait for admin approval.';
          } else if (status === 'rejected') {
            errorMessage += '\nYour verification was rejected. Please resubmit.';
          } else {
            errorMessage += '\nPlease complete identity verification first.';
          }
        }
        if (errorData.message) {
          errorMessage += `\n\n${errorData.message}`;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!formData.title || !formData.description || !formData.date || 
        !formData.time || !formData.pricePerPerson || !formData.maxParticipants) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (formData.images.length < 3) {
      Alert.alert('Error', 'Please upload at least 3 images');
      return;
    }

    setPublishing(true);
    try {
      // First save as draft
      const createResponse = await api.post('/party/create', formData);
      const partyId = createResponse.data.party._id;
      
      // Then publish
      await api.post(`/party/${partyId}/publish`);
      Alert.alert('Success', 'Party published!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('Error', error.response?.data?.error || 'Failed to publish party');
    } finally {
      setPublishing(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Title *</Text>
        <TextInput
          style={styles.input}
          value={formData.title}
          onChangeText={(text) => setFormData({ ...formData, title: text })}
          placeholder="Enter party title"
        />

        <Text style={styles.label}>Description *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.description}
          onChangeText={(text) => setFormData({ ...formData, description: text })}
          placeholder="Describe your party"
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Date *</Text>
        <TextInput
          style={styles.input}
          value={formData.date}
          onChangeText={(text) => setFormData({ ...formData, date: text })}
          placeholder="YYYY-MM-DD"
        />

        <Text style={styles.label}>Time *</Text>
        <TextInput
          style={styles.input}
          value={formData.time}
          onChangeText={(text) => setFormData({ ...formData, time: text })}
          placeholder="HH:MM (e.g., 20:00)"
        />

        <Text style={styles.label}>Price per Person ($) *</Text>
        <TextInput
          style={styles.input}
          value={formData.pricePerPerson}
          onChangeText={(text) => setFormData({ ...formData, pricePerPerson: text })}
          placeholder="0.00"
          keyboardType="decimal-pad"
        />

        <Text style={styles.label}>Max Participants *</Text>
        <TextInput
          style={styles.input}
          value={formData.maxParticipants}
          onChangeText={(text) => setFormData({ ...formData, maxParticipants: text })}
          placeholder="50"
          keyboardType="number-pad"
        />

        <Text style={styles.label}>Address *</Text>
        <TextInput
          style={styles.input}
          value={formData.location.address}
          onChangeText={(text) => setFormData({
            ...formData,
            location: { ...formData.location, address: text },
          })}
          placeholder="Full address (hidden until payment)"
        />

        <Text style={styles.label}>City *</Text>
        <TextInput
          style={styles.input}
          value={formData.location.city}
          onChangeText={(text) => setFormData({
            ...formData,
            location: { ...formData.location, city: text },
          })}
          placeholder="City"
        />

        <Text style={styles.label}>Music Type</Text>
        <TextInput
          style={styles.input}
          value={formData.musicType}
          onChangeText={(text) => setFormData({ ...formData, musicType: text })}
          placeholder="e.g., EDM, Hip-Hop, Rock"
        />

        <Text style={styles.label}>Dress Code</Text>
        <TextInput
          style={styles.input}
          value={formData.dressCode}
          onChangeText={(text) => setFormData({ ...formData, dressCode: text })}
          placeholder="e.g., Casual, Formal, Themed"
        />

        <Text style={styles.label}>Age Range</Text>
        <View style={styles.ageRangeContainer}>
          <TextInput
            style={[styles.input, styles.ageInput]}
            value={formData.ageRange.min}
            onChangeText={(text) => setFormData({
              ...formData,
              ageRange: { ...formData.ageRange, min: text },
            })}
            placeholder="Min"
            keyboardType="number-pad"
          />
          <Text style={styles.ageSeparator}>-</Text>
          <TextInput
            style={[styles.input, styles.ageInput]}
            value={formData.ageRange.max}
            onChangeText={(text) => setFormData({
              ...formData,
              ageRange: { ...formData.ageRange, max: text },
            })}
            placeholder="Max"
            keyboardType="number-pad"
          />
        </View>

        <Text style={styles.label}>Images * (at least 3)</Text>
        <TouchableOpacity style={styles.imageButton} onPress={pickImages}>
          <Text style={styles.imageButtonText}>Pick Images</Text>
        </TouchableOpacity>
        {formData.images.length > 0 && (
          <Text style={styles.imageCount}>
            {formData.images.length} image(s) selected
          </Text>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.saveButton, loading && styles.buttonDisabled]}
            onPress={handleSave}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={theme.colors.text} />
            ) : (
              <Text style={styles.buttonText}>Save Draft</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.publishButton, publishing && styles.buttonDisabled]}
            onPress={handlePublish}
            disabled={publishing}
          >
            {publishing ? (
              <ActivityIndicator color={theme.colors.text} />
            ) : (
              <Text style={styles.buttonText}>Publish</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    padding: 15,
    fontSize: 16,
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  ageRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ageInput: {
    flex: 1,
  },
  ageSeparator: {
    marginHorizontal: 10,
    fontSize: 18,
    color: theme.colors.textSecondary,
  },
  imageButton: {
    backgroundColor: theme.colors.surfaceLight,
    padding: 15,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  imageButtonText: {
    color: theme.colors.accent,
    fontSize: 16,
    fontWeight: '600',
  },
  imageCount: {
    marginTop: 8,
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  buttonContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  button: {
    padding: 18,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: theme.colors.textMuted,
  },
  publishButton: {
    backgroundColor: theme.colors.accent,
    ...theme.shadows.glow,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '600',
  },
});

