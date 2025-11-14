import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { theme } from '../../config/theme';
import { LEGAL_URLS } from '../../config/legal';

export default function PrivacyPolicyScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.lastUpdated}>Last Updated: {new Date().toLocaleDateString()}</Text>

        <Text style={styles.sectionTitle}>1. Information We Collect</Text>
        <Text style={styles.text}>
          We collect information that you provide directly to us, including:
        </Text>
        <Text style={styles.bulletPoint}>• Name, email address, and profile information</Text>
        <Text style={styles.bulletPoint}>• Government-issued ID for identity verification</Text>
        <Text style={styles.bulletPoint}>• Photos and images you upload</Text>
        <Text style={styles.bulletPoint}>• Location data when you use location-based features</Text>
        <Text style={styles.bulletPoint}>• Payment information processed through secure third-party providers</Text>

        <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
        <Text style={styles.text}>
          We use the information we collect to:
        </Text>
        <Text style={styles.bulletPoint}>• Provide, maintain, and improve our services</Text>
        <Text style={styles.bulletPoint}>• Verify your identity and ensure platform safety</Text>
        <Text style={styles.bulletPoint}>• Process payments and transactions</Text>
        <Text style={styles.bulletPoint}>• Send you notifications and updates</Text>
        <Text style={styles.bulletPoint}>• Respond to your inquiries and provide customer support</Text>

        <Text style={styles.sectionTitle}>3. Information Sharing</Text>
        <Text style={styles.text}>
          We do not sell your personal information. We may share your information only:
        </Text>
        <Text style={styles.bulletPoint}>• With other users as necessary to provide our services</Text>
        <Text style={styles.bulletPoint}>• With service providers who assist us in operating our platform</Text>
        <Text style={styles.bulletPoint}>• When required by law or to protect our rights</Text>
        <Text style={styles.bulletPoint}>• With your consent</Text>

        <Text style={styles.sectionTitle}>4. Data Security</Text>
        <Text style={styles.text}>
          We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.
        </Text>

        <Text style={styles.sectionTitle}>5. Your Rights</Text>
        <Text style={styles.text}>
          You have the right to:
        </Text>
        <Text style={styles.bulletPoint}>• Access and update your personal information</Text>
        <Text style={styles.bulletPoint}>• Delete your account and data</Text>
        <Text style={styles.bulletPoint}>• Opt-out of certain communications</Text>
        <Text style={styles.bulletPoint}>• Request a copy of your data</Text>

        <Text style={styles.sectionTitle}>6. Children's Privacy</Text>
        <Text style={styles.text}>
          Our service is not intended for users under the age of 18. We do not knowingly collect personal information from children.
        </Text>

        <Text style={styles.sectionTitle}>7. Changes to This Policy</Text>
        <Text style={styles.text}>
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.
        </Text>

        <Text style={styles.sectionTitle}>8. Contact Us</Text>
        <Text style={styles.text}>
          If you have any questions about this Privacy Policy, please contact us at {LEGAL_URLS.supportEmail}
        </Text>

        <TouchableOpacity 
          style={styles.viewFullButton}
          onPress={async () => {
            try {
              const canOpen = await Linking.canOpenURL(LEGAL_URLS.privacyPolicy);
              if (canOpen) {
                await Linking.openURL(LEGAL_URLS.privacyPolicy);
              } else {
                Alert.alert('Error', 'Unable to open the privacy policy URL');
              }
            } catch (error) {
              Alert.alert('Error', 'Failed to open privacy policy');
            }
          }}
        >
          <Text style={styles.viewFullButtonText}>View Full Privacy Policy Online</Text>
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
