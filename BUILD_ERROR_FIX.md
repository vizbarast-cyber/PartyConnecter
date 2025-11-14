# 🔧 Build Error Fix - Metro Bundler

## Error
```
expo export:embed --eager --platform android --dev false exited with non-zero code: 1
```

## What I Fixed

1. ✅ **Simplified `metro.config.js`**
   - Removed Windows-specific workarounds that don't work in cloud builds (Linux)
   - Using default Expo Metro config for better compatibility

## Next Steps

### 1. Check Build Logs
Visit the build logs URL to see the specific error:
```
https://expo.dev/accounts/tomelis/projects/partyconnect/builds/24a23fb9-fc72-4fbc-a4c0-1bbe6b5df29d
```

Look for:
- Specific file names with errors
- Line numbers
- Error messages (SyntaxError, ReferenceError, etc.)

### 2. Common Issues to Check

#### Dynamic Requires
Make sure all imports are at the top level:
```javascript
// ❌ Bad
const module = require('module');

// ✅ Good
import module from 'module';
```

#### Missing Dependencies
Check if all dependencies are in `package.json`

#### Syntax Errors
- Unclosed brackets `{` `[` `(`
- Missing quotes
- Trailing commas

### 3. Try Building Again

After fixing any issues found in the logs:

```powershell
$env:EAS_NO_VCS=1
npx eas-cli build --platform android --profile preview
```

### 4. Test Locally First

Before building, test locally to catch errors:

```powershell
npx expo start --no-dev --minify
```

This will show Metro bundling errors before you build.

---

## If Still Failing

Share the specific error from the build logs, and I can help fix it!

