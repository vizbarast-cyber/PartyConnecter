// Legal URLs - Configure via environment variables or update defaults
const isDev = typeof __DEV__ !== 'undefined' ? __DEV__ : process.env.NODE_ENV !== 'production';

// Get URLs from environment or use defaults
const getPrivacyPolicyUrl = () => {
  if (process.env.EXPO_PUBLIC_PRIVACY_POLICY_URL) {
    return process.env.EXPO_PUBLIC_PRIVACY_POLICY_URL;
  }
  // Default URLs - update these when you have your actual legal pages
  return isDev
    ? 'https://partyconnect.app/privacy-policy' // Development/placeholder
    : 'https://partyconnect.app/privacy-policy'; // Production - UPDATE THIS
};

const getTermsOfServiceUrl = () => {
  if (process.env.EXPO_PUBLIC_TERMS_URL) {
    return process.env.EXPO_PUBLIC_TERMS_URL;
  }
  // Default URLs - update these when you have your actual legal pages
  return isDev
    ? 'https://partyconnect.app/terms-of-service' // Development/placeholder
    : 'https://partyconnect.app/terms-of-service'; // Production - UPDATE THIS
};

export const LEGAL_URLS = {
  privacyPolicy: getPrivacyPolicyUrl(),
  termsOfService: getTermsOfServiceUrl(),
  supportEmail: process.env.EXPO_PUBLIC_SUPPORT_EMAIL || 'support@partyconnect.app',
  website: process.env.EXPO_PUBLIC_WEBSITE_URL || 'https://partyconnect.app',
};

