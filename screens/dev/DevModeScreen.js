import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { useDevModeStore } from '../../store/devModeStore';
import { useAuthStore } from '../../store/authStore';
import { api } from '../../services/api';
import { theme } from '../../config/theme';

export default function DevModeScreen() {
  const { isDevMode, lockDevMode } = useDevModeStore();
  const { userProfile, updateUserProfile } = useAuthStore();
  const [testMode, setTestMode] = useState(false);
  const [manualVerification, setManualVerification] = useState(false);
  const [pendingVerifications, setPendingVerifications] = useState([]);
  const [loadingVerifications, setLoadingVerifications] = useState(false);

  const handleManualVerify = async () => {
    try {
      // Approve current user's verification
      const response = await api.post(`/admin/verifications/${userProfile?.userId}/approve`);
      Alert.alert('Success', 'Verification approved!');
      // Refresh user profile
      const userResponse = await api.get('/user/me');
      updateUserProfile(userResponse.data.user);
    } catch (error) {
      Alert.alert('Error', error.response?.data?.error || 'Failed to approve verification');
    }
  };

  const handleViewLogs = () => {
    Alert.alert('Dev Mode', 'Logs viewer would open here');
  };

  const handleAPIInspector = () => {
    Alert.alert('Dev Mode', 'API Inspector would open here');
  };

  const loadPendingVerifications = async () => {
    setLoadingVerifications(true);
    try {
      const response = await api.get('/admin/verifications/pending');
      setPendingVerifications(response.data.users || []);
    } catch (error) {
      console.error('Error loading verifications:', error);
      Alert.alert('Error', 'Failed to load pending verifications');
    } finally {
      setLoadingVerifications(false);
    }
  };

  const handleApproveVerification = async (userId) => {
    try {
      await api.post(`/admin/verifications/${userId}/approve`);
      Alert.alert('Success', 'Verification approved!');
      loadPendingVerifications();
    } catch (error) {
      Alert.alert('Error', error.response?.data?.error || 'Failed to approve verification');
    }
  };

  const handleRejectVerification = async (userId) => {
    Alert.prompt(
      'Reject Verification',
      'Enter rejection reason:',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reject',
          onPress: async (reason) => {
            try {
              await api.post(`/admin/verifications/${userId}/reject`, { reason: reason || 'Verification rejected' });
              Alert.alert('Success', 'Verification rejected!');
              loadPendingVerifications();
            } catch (error) {
              Alert.alert('Error', error.response?.data?.error || 'Failed to reject verification');
            }
          },
        },
      ],
      'plain-text'
    );
  };

  useEffect(() => {
    if (isDevMode) {
      loadPendingVerifications();
    }
  }, [isDevMode]);

  if (!isDevMode) {
    return (
      <View style={styles.container}>
        <Text style={styles.lockedText}>Developer Mode is locked</Text>
        <Text style={styles.lockedSubtext}>
          Tap the app logo 10 times and enter the password to unlock
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Developer Mode</Text>
        <TouchableOpacity style={styles.lockButton} onPress={lockDevMode}>
          <Text style={styles.lockButtonText}>Lock Dev Mode</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Debug Console</Text>
        <View style={styles.debugInfo}>
          <Text style={styles.debugLabel}>User ID:</Text>
          <Text style={styles.debugValue}>{userProfile?.userId || 'N/A'}</Text>
        </View>
        <View style={styles.debugInfo}>
          <Text style={styles.debugLabel}>Verification Status:</Text>
          <Text style={styles.debugValue}>
            {userProfile?.verification?.status || 'N/A'}
          </Text>
        </View>
        <View style={styles.debugInfo}>
          <Text style={styles.debugLabel}>Role:</Text>
          <Text style={styles.debugValue}>{userProfile?.role || 'N/A'}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Test Mode</Text>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Bypass Stripe/PayPal</Text>
          <Switch
            value={testMode}
            onValueChange={setTestMode}
            trackColor={{ false: theme.colors.border, true: theme.colors.accent }}
            thumbColor={testMode ? theme.colors.text : theme.colors.textMuted}
          />
        </View>
        {testMode && (
          <Text style={styles.warningText}>
            ⚠️ Payment test mode enabled. Payments will be simulated.
          </Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Manual Verification Override</Text>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Enable Override</Text>
          <Switch
            value={manualVerification}
            onValueChange={setManualVerification}
            trackColor={{ false: theme.colors.border, true: theme.colors.accent }}
            thumbColor={manualVerification ? theme.colors.text : theme.colors.textMuted}
          />
        </View>
        {manualVerification && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleManualVerify}
          >
            <Text style={styles.actionButtonText}>Approve Verification</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>User Verification</Text>
        <TouchableOpacity style={styles.toolButton} onPress={loadPendingVerifications}>
          <Text style={styles.toolButtonText}>
            {loadingVerifications ? 'Loading...' : `View Pending (${pendingVerifications.length})`}
          </Text>
        </TouchableOpacity>
        
        {pendingVerifications.length > 0 && (
          <View style={styles.verificationList}>
            {pendingVerifications.map((user) => (
              <View key={user.userId} style={styles.verificationItem}>
                <View style={styles.verificationInfo}>
                  <Text style={styles.verificationEmail}>{user.email}</Text>
                  <Text style={styles.verificationName}>{user.profile?.name || 'No name'}</Text>
                  <Text style={styles.verificationAge}>Age: {user.verification?.age || 'N/A'}</Text>
                  {user.verification?.idPhotoUrl && (
                    <Text style={styles.verificationLink} numberOfLines={1}>
                      ID: {user.verification.idPhotoUrl.substring(0, 50)}...
                    </Text>
                  )}
                </View>
                <View style={styles.verificationActions}>
                  <TouchableOpacity
                    style={styles.approveButton}
                    onPress={() => handleApproveVerification(user.userId)}
                  >
                    <Text style={styles.approveButtonText}>✓</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.rejectButton}
                    onPress={() => handleRejectVerification(user.userId)}
                  >
                    <Text style={styles.rejectButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tools</Text>
        <TouchableOpacity style={styles.toolButton} onPress={handleViewLogs}>
          <Text style={styles.toolButtonText}>View Dev Logs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolButton} onPress={handleAPIInspector}>
          <Text style={styles.toolButtonText}>API Inspector</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  lockButton: {
    backgroundColor: theme.colors.error,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.md,
  },
  lockButtonText: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  lockedText: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: 100,
  },
  lockedSubtext: {
    fontSize: 14,
    color: theme.colors.textMuted,
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 40,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 15,
  },
  debugInfo: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  debugLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    width: 150,
  },
  debugValue: {
    fontSize: 14,
    color: theme.colors.text,
    flex: 1,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  switchLabel: {
    fontSize: 16,
    color: theme.colors.text,
  },
  warningText: {
    fontSize: 12,
    color: theme.colors.warning,
    marginTop: 10,
    fontStyle: 'italic',
  },
  actionButton: {
    backgroundColor: theme.colors.success,
    padding: 15,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginTop: 10,
    ...theme.shadows.glow,
  },
  actionButtonText: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  toolButton: {
    backgroundColor: theme.colors.surfaceLight,
    padding: 15,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  toolButtonText: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  verificationList: {
    marginTop: 10,
  },
  verificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: theme.borderRadius.md,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  verificationInfo: {
    flex: 1,
  },
  verificationEmail: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
  },
  verificationName: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: 2,
  },
  verificationAge: {
    fontSize: 12,
    color: theme.colors.textMuted,
    marginBottom: 2,
  },
  verificationLink: {
    fontSize: 10,
    color: theme.colors.textMuted,
    fontStyle: 'italic',
  },
  verificationActions: {
    flexDirection: 'row',
    gap: 8,
  },
  approveButton: {
    backgroundColor: theme.colors.success,
    width: 36,
    height: 36,
    borderRadius: theme.borderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
  },
  approveButtonText: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  rejectButton: {
    backgroundColor: theme.colors.error,
    width: 36,
    height: 36,
    borderRadius: theme.borderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rejectButtonText: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

