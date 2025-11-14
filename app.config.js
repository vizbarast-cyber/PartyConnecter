// Dynamic app configuration based on environment
const isDev = process.env.NODE_ENV !== 'production' && !process.env.EXPO_PUBLIC_ENV;

module.exports = {
  expo: {
    name: "PartyConnect",
    slug: "partyconnect",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "dark",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#0A0A0F" // Dark purple theme background
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: process.env.EXPO_PUBLIC_BUNDLE_ID || "com.mycompany.partyconnect",
      googleServicesFile: "./GoogleService-Info.plist",
      buildNumber: process.env.EXPO_PUBLIC_IOS_BUILD_NUMBER || "1",
      infoPlist: {
        NSCameraUsageDescription: "PartyConnect needs access to your camera to take photos for party creation and identity verification.",
        NSPhotoLibraryUsageDescription: "PartyConnect needs access to your photo library to upload party images and profile pictures.",
        NSLocationWhenInUseUsageDescription: "PartyConnect needs your location to show nearby parties and people.",
        NSLocationAlwaysUsageDescription: "PartyConnect needs your location to show nearby parties and people."
      }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#0A0A0F" // Dark purple theme background
      },
      package: process.env.EXPO_PUBLIC_ANDROID_PACKAGE || "com.mycompany.partyconnect",
      googleServicesFile: "./google-services.json",
      versionCode: parseInt(process.env.EXPO_PUBLIC_ANDROID_VERSION_CODE || "1", 10),
      permissions: [
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION"
      ]
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    scheme: "partyconnect",
    plugins: [
      "expo-camera",
      "expo-image-picker",
      "expo-location",
      "expo-notifications",
      [
        "@stripe/stripe-react-native",
        {
          merchantIdentifier: "merchant.com.mycompany.partyconnect",
          enableGooglePay: true,
        }
      ]
    ],
    extra: {
      eas: {
        projectId: "f1a57509-42af-48c8-bd42-8368e28857b6"
      },
      apiUrl: process.env.EXPO_PUBLIC_API_URL || (isDev ? 'http://localhost:3000/api' : 'https://api.partyconnect.app/api'),
      environment: process.env.NODE_ENV || process.env.EXPO_PUBLIC_ENV || 'production',
      googleClientId: {
        android: "982593123040-rg5efsforta6gm396mdjgg793ff9k69b.apps.googleusercontent.com",
        ios: "982593123040-8l4to10lnnb8sp8g1t9ugg63fl56h7jc.apps.googleusercontent.com",
        web: "982593123040-vbjhf65ti83g3evn8n4nirqiuilathao.apps.googleusercontent.com",
      },
      stripePublishableKey: process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_live_51OMCDWGYSmJketTkw3nnIbyDg54BFBIG8zjxm3UIh7RvSTVetC0bOzcqvfvmWdkWknz8g2qxMc8dalNfu5xHrwUW00ONoP1mId",
    },
    updates: {
      enabled: true,
      checkAutomatically: "ON_LOAD",
      fallbackToCacheTimeout: 0
    }
  }
};

