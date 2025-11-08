# Final Testing Guide

## What Was Fixed

**Root Cause:** localStorage is domain-specific. Token stored on `zerodha-os.netlify.app` cannot be read by `dashboard-os.netlify.app`.

**Solution:** Pass token via URL parameter during redirect, then store in dashboard's localStorage.

## Changes Made

### Frontend
- Login/Register now redirect to: `https://dashboard-os.netlify.app?token=<JWT>`

### Dashboard  
- Reads token from URL parameter on load
- Stores in its own localStorage
- Removes token from URL (security)
- Sends token in Authorization header

### Backend
- Accepts token from Authorization header
- Returns token in login/signup responses

## Deploy & Test

### 1. Deploy All Changes
```bash
git add .
git commit -m "fix: pass token via URL for cross-domain authentication"
git push origin main
```

Wait 5 minutes for all deployments to complete.

### 2. Test Login Flow

#### Step 1: Login
1. Open https://zerodha-os.netlify.app/Login
2. Open DevTools → Console
3. Enter credentials and click Login
4. Should see: "✅ Token stored in localStorage"

#### Step 2: Redirect
1. Should redirect to: `https://dashboard-os.netlify.app?token=eyJhbG...`
2. URL should briefly show token parameter
3. Token should disappear from URL after ~100ms

#### Step 3: Dashboard Loads
1. Console should show:
   ```
   🔍 Token found in URL, storing in localStorage
   🔍 Token from localStorage: Present
   ✅ Verification successful for: username
   ```
2. Dashboard should stay loaded (NO redirect back to login)

#### Step 4: Verify Token Storage
1. Open DevTools → Application → Local Storage
2. Check `https://dashboard-os.netlify.app`
3. Should see: `authToken: eyJhbG...`

### 3. Test Backend Logs

Open Render logs, should see:
```
Cookie set for login - Options: { ... }
🔍 CORS check for origin: https://dashboard-os.netlify.app
✅ CORS allowed for: https://dashboard-os.netlify.app
verify cookies: [Object: null prototype] {}
Verification request - Headers: {
  authorization: 'Bearer eyJhbG...',  ← Should be present now!
  origin: 'https://dashboard-os.netlify.app',
  ...
}
Token found in Authorization header
Verification successful for user: username
```

### 4. Test Network Tab

1. Open DevTools → Network tab
2. Find POST request to `/verify`
3. Check Request Headers:
   ```
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
4. Check Response:
   ```json
   {
     "status": true,
     "user": "username"
   }
   ```

### 5. Test Persistence

1. Refresh the dashboard page
2. Should stay logged in (no redirect)
3. Token should still be in localStorage
4. Verification should succeed

### 6. Test Logout

1. Click logout button
2. Should redirect to: `https://zerodha-os.netlify.app/Register`
3. Check localStorage - `authToken` should be removed
4. Trying to access dashboard should redirect to login

## Expected Results

✅ Login redirects to dashboard with token in URL  
✅ Token appears briefly in URL then disappears  
✅ Dashboard stays loaded (no redirect)  
✅ Backend logs show: "Token found in Authorization header"  
✅ Backend logs show: "Verification successful for user: username"  
✅ Refresh dashboard → stays logged in  
✅ Logout → token removed, redirects to login  

## Troubleshooting

### If dashboard still redirects to login:

**Check Console:**
```javascript
// Should see:
🔍 Token found in URL, storing in localStorage
🔍 Token from localStorage: Present

// If you see:
❌ No token found in localStorage or URL
// → Token not being passed in URL
```

**Check URL:**
- After login, URL should briefly be: `dashboard-os.netlify.app?token=...`
- If no `?token=` in URL → frontend not passing token

**Check Backend Logs:**
```
// Should see:
authorization: 'Bearer eyJhbG...'

// If you see:
authorization: undefined
// → Dashboard not sending token in header
```

### If token not in URL:

1. Check frontend console for: "✅ Token stored in localStorage"
2. Check login response in Network tab → should have `token` field
3. Verify redirect URL includes `?token=`

### If backend doesn't receive token:

1. Check dashboard console for: "🔍 Token from localStorage: Present"
2. Check Network tab → Request Headers → should have `Authorization: Bearer ...`
3. Verify axios request includes headers config

## Security Notes

- ✅ Token only appears in URL briefly (removed immediately)
- ✅ Token stored in localStorage (accessible only to dashboard domain)
- ✅ Token sent over HTTPS only
- ✅ Token has 7-day expiration
- ✅ Token is JWT signed with secret key

## Success Criteria

The fix is successful when:
1. You can login from frontend
2. Dashboard loads and stays loaded
3. Backend logs show "Token found in Authorization header"
4. No more "authorization: undefined" in logs
5. Dashboard persists after refresh

If all these work → **DONE!** 🎉
