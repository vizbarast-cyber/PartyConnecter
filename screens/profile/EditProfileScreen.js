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

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const { userProfile, updateUserProfile } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: userProfile?.name || '',
    bio: userProfile?.profile?.bio || '',
    gender: userProfile?.profile?.gender || '',
    interests: userProfile?.profile?.interests?.join(', ') || '',
    city: userProfile?.profile?.city || '',
    distancePreference: userProfile?.profile?.distancePreference?.toString() || '',
    images: userProfile?.profile?.images || [],
  });

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera roll permissions');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets) {
      try {
        setLoading(true);
        // Upload image to Firebase Storage
        const imageUrl = await uploadImage(result.assets[0]);
        const newImages = [...formData.images, { url: imageUrl, order: formData.images.length }];
        if (newImages.length > 5) {
          Alert.alert('Limit', 'Maximum 5 images allowed');
          return;
        }
        setFormData({ ...formData, images: newImages });
      } catch (error) {
        Alert.alert('Error', error.message || 'Failed to upload image');
      } finally {
        setLoading(false);
      }
    }
  };

  const uploadImage = async (asset) => {
    try {
      const { user } = useAuthStore.getState();
      const userId = userProfile?.userId || user?.uid;
      
      if (!userId) {
        throw new Error('User not found');
      }
      
      // Read the file as blob
      const response = await fetch(asset.uri);
      if (!response.ok) {
        throw new Error('Failed to read image file');
      }
      const blob = await response.blob();
      
      // Create a unique filename
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(7);
      const filename = `profile_${timestamp}_${randomStr}.jpg`;
      const storageRef = ref(storage, `users/${userId}/profile/${filename}`);
      
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

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const handleSave = async () => {
    if (!formData.name || formData.name.trim().length === 0) {
      Alert.alert('Error', 'Real name is required');
      return;
    }

    if (formData.bio.length > 200) {
      Alert.alert('Error', 'Bio must be 200 characters or less');
      return;
    }

    setLoading(true);
    try {
      const interestsArray = formData.interests
        .split(',')
        .map(i => i.trim())
        .filter(i => i.length > 0);

      await api.put('/user/profile', {
        name: formData.name.trim(),
        bio: formData.bio,
        gender: formData.gender || undefined,
        interests: interestsArray.length > 0 ? interestsArray : undefined,
        city: formData.city || undefined,
        distancePreference: formData.distancePreference ? parseInt(formData.distancePreference) : undefined,
        images: formData.images,
      });

      Alert.alert('Success', 'Profile updated', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('Error', error.response?.data?.error || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Real Name *</Text>
        <TextInput
          style={styles.input}
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          placeholder="Enter your real name"
          autoCapitalize="words"
        />

        <Text style={styles.label}>Bio (max 200 characters)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.bio}
          onChangeText={(text) => setFormData({ ...formData, bio: text })}
          placeholder="Tell us about yourself"
          multiline
          numberOfLines={4}
          maxLength={200}
        />
        <Text style={styles.charCount}>{formData.bio.length} / 200</Text>

        <Text style={styles.label}>Gender</Text>
        <TextInput
          style={styles.input}
          value={formData.gender}
          onChangeText={(text) => setFormData({ ...formData, gender: text })}
          placeholder="Optional"
        />

        <Text style={styles.label}>Interests (comma-separated)</Text>
        <TextInput
          style={styles.input}
          value={formData.interests}
          onChangeText={(text) => setFormData({ ...formData, interests: text })}
          placeholder="e.g., Music, Dancing, Socializing"
        />

        <Text style={styles.label}>City</Text>
        <TextInput
          style={styles.input}
          value={formData.city}
          onChangeText={(text) => setFormData({ ...formData, city: text })}
          placeholder="Your city"
        />

        <Text style={styles.label}>Distance Preference (km)</Text>
        <TextInput
          style={styles.input}
          value={formData.distancePreference}
          onChangeText={(text) => setFormData({ ...formData, distancePreference: text })}
          placeholder="50"
          keyboardType="number-pad"
        />

        <Text style={styles.label}>Profile Images (max 5)</Text>
        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          <Text style={styles.imageButtonText}>Add Image</Text>
        </TouchableOpacity>
        {formData.images.length > 0 && (
          <View style={styles.imagesContainer}>
            {formData.images.map((image, index) => (
              <View key={index} style={styles.imageItem}>
                <Text style={styles.imageUrl} numberOfLines={1}>
                  Image {index + 1}
                </Text>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeImage(index)}
                >
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        <TouchableOpacity
          style={[styles.saveButton, loading && styles.buttonDisabled]}
          onPress={handleSave}
          disabled={loading}
        >
            {loading ? (
              <ActivityIndicator color={theme.colors.text} />
            ) : (
              <Text style={styles.saveButtonText}>Save Changes</Text>
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
  charCount: {
    fontSize: 12,
    color: theme.colors.textMuted,
    textAlign: 'right',
    marginTop: 5,
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
  imagesContainer: {
    marginTop: 15,
  },
  imageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  imageUrl: {
    flex: 1,
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  removeButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: theme.colors.error,
    borderRadius: theme.borderRadius.sm,
  },
  removeButtonText: {
    color: theme.colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: theme.colors.accent,
    padding: 18,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
    ...theme.shadows.glow,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '600',
  },
});

