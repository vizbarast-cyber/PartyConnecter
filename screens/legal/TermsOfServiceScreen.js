import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { theme } from '../../config/theme';
import { LEGAL_URLS } from '../../config/legal';

export default function TermsOfServiceScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Terms of Service</Text>
        <Text style={styles.lastUpdated}>Last Updated: {new Date().toLocaleDateString()}</Text>

        <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
        <Text style={styles.text}>
          By accessing and using PartyConnect, you accept and agree to be bound by the terms and provision of this agreement.
        </Text>

        <Text style={styles.sectionTitle}>2. Eligibility</Text>
        <Text style={styles.text}>
          You must be at least 18 years old to use PartyConnect. By using our service, you represent and warrant that you meet this age requirement.
        </Text>

        <Text style={styles.sectionTitle}>3. User Accounts</Text>
        <Text style={styles.text}>
          You are responsible for:
        </Text>
        <Text style={styles.bulletPoint}>• Maintaining the confidentiality of your account credentials</Text>
        <Text style={styles.bulletPoint}>• All activities that occur under your account</Text>
        <Text style={styles.bulletPoint}>• Providing accurate and complete information</Text>
        <Text style={styles.bulletPoint}>• Completing identity verification as required</Text>

        <Text style={styles.sectionTitle}>4. User Conduct</Text>
        <Text style={styles.text}>
          You agree not to:
        </Text>
        <Text style={styles.bulletPoint}>• Use the service for any illegal purpose</Text>
        <Text style={styles.bulletPoint}>• Harass, abuse, or harm other users</Text>
        <Text style={styles.bulletPoint}>• Post false, misleading, or fraudulent information</Text>
        <Text style={styles.bulletPoint}>• Violate any applicable laws or regulations</Text>
        <Text style={styles.bulletPoint}>• Interfere with or disrupt the service</Text>
        <Text style={styles.bulletPoint}>• Create multiple accounts to circumvent restrictions</Text>

        <Text style={styles.sectionTitle}>5. Party Creation and Participation</Text>
        <Text style={styles.text}>
          When creating or joining parties:
        </Text>
        <Text style={styles.bulletPoint}>• You are responsible for the accuracy of party information</Text>
        <Text style={styles.bulletPoint}>• You must comply with all applicable laws and venue policies</Text>
        <Text style={styles.bulletPoint}>• You are responsible for your own safety and conduct</Text>
        <Text style={styles.bulletPoint}>• PartyConnect is not liable for any incidents at parties</Text>

        <Text style={styles.sectionTitle}>6. Payments and Refunds</Text>
        <Text style={styles.text}>
          Payment terms:
        </Text>
        <Text style={styles.bulletPoint}>• Payments are processed through secure third-party providers</Text>
        <Text style={styles.bulletPoint}>• Refund policies are determined by individual party organizers</Text>
        <Text style={styles.bulletPoint}>• PartyConnect may charge service fees as disclosed</Text>
        <Text style={styles.bulletPoint}>• All payments are final unless otherwise stated</Text>

        <Text style={styles.sectionTitle}>7. Identity Verification</Text>
        <Text style={styles.text}>
          You agree to:
        </Text>
        <Text style={styles.bulletPoint}>• Provide accurate identity verification documents</Text>
        <Text style={styles.bulletPoint}>• Allow PartyConnect to verify your identity</Text>
        <Text style={styles.bulletPoint}>• Understand that verification is required for certain features</Text>

        <Text style={styles.sectionTitle}>8. Intellectual Property</Text>
        <Text style={styles.text}>
          The PartyConnect service, including its design, features, and content, is protected by copyright, trademark, and other laws. You may not copy, modify, or distribute our content without permission.
        </Text>

        <Text style={styles.sectionTitle}>9. Limitation of Liability</Text>
        <Text style={styles.text}>
          PartyConnect is provided "as is" without warranties. We are not liable for any damages arising from your use of the service, including but not limited to incidents at parties, payment disputes, or user interactions.
        </Text>

        <Text style={styles.sectionTitle}>10. Termination</Text>
        <Text style={styles.text}>
          We may terminate or suspend your account at any time for violations of these terms. You may also delete your account at any time.
        </Text>

        <Text style={styles.sectionTitle}>11. Changes to Terms</Text>
        <Text style={styles.text}>
          We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.
        </Text>

        <Text style={styles.sectionTitle}>12. Contact Information</Text>
        <Text style={styles.text}>
          For questions about these Terms of Service, please contact us at {LEGAL_URLS.supportEmail}
        </Text>

        <TouchableOpacity 
          style={styles.viewFullButton}
          onPress={async () => {
            try {
              const canOpen = await Linking.canOpenURL(LEGAL_URLS.termsOfService);
              if (canOpen) {
                await Linking.openURL(LEGAL_URLS.termsOfService);
              } else {
                Alert.alert('Error', 'Unable to open the terms of service URL');
              }
            } catch (error) {
              Alert.alert('Error', 'Failed to open terms of service');
            }
          }}
        >
          <Text style={styles.viewFullButtonText}>View Full Terms of Service Online</Text>
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
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 10,
    textShadowColor: theme.colors.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  lastUpdated: {
    fontSize: 14,
    color: theme.colors.textMuted,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.primary,
    marginTop: 24,
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    lineHeight: 24,
    marginBottom: 12,
  },
  bulletPoint: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    lineHeight: 24,
    marginLeft: 16,
    marginBottom: 8,
  },
  viewFullButton: {
    backgroundColor: theme.colors.accent,
    padding: 18,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
    ...theme.shadows.glow,
  },
  viewFullButtonText: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
});
