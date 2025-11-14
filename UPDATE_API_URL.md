# 🔗 Update API URL in EAS

You've created the secret, but it has a placeholder URL. Let's update it with your real Railway URL.

## Step 1: Get Your Railway API URL

```bash
cd backend
railway domain
```

This will show your Railway URL (e.g., `https://your-app.up.railway.app`)

## Step 2: Update the EAS Secret

Use the new command (the old one is deprecated):

```bash
# Replace YOUR_ACTUAL_RAILWAY_URL with the URL from Step 1
npx eas-cli env:create --scope project --name EXPO_PUBLIC_API_URL --value "https://YOUR_ACTUAL_RAILWAY_URL/api" --type string
```

Or update the existing one:

```bash
npx eas-cli env:delete --scope project --name EXPO_PUBLIC_API_URL
npx eas-cli env:create --scope project --name EXPO_PUBLIC_API_URL --value "https://YOUR_ACTUAL_RAILWAY_URL/api" --type string
```

## Step 3: Verify

```bash
npx eas-cli env:list --scope project
```

You should see `EXPO_PUBLIC_API_URL` with your actual Railway URL.

## Step 4: Build

Once the URL is updated, build:

```bash
npx eas-cli build --platform android --profile preview
```

When prompted for Android application ID, enter: `com.mycompany.partyconnect`

