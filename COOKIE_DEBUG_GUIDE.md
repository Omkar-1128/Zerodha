# Cookie Authentication Debugging Guide

## Current Issue
Dashboard redirects to login after 4-5 seconds because cookie-based auth is failing cross-site.

## Why This Happens
1. **Cross-site cookies are complex**: Browsers have strict rules for cookies sent between different origins
2. **Your setup**: frontend (zerodha-272.netlify.app) → backend (Render) → dashboard (dashboard-272.netlify.app)
3. **The cookie is set by backend but not accessible to dashboard** because they're different origins

## Immediate Debugging Steps

### 1. Check if cookies are being set at all
After logging in on the frontend, open DevTools → Application → Cookies:
- Check `zerodha-onfe.onrender.com` - you should see a `token` cookie
- Check the cookie attributes: `Secure`, `HttpOnly`, `SameSite=None`

### 2. Check if cookies are being sent from dashboard
On the dashboard, open DevTools → Network tab:
- Look for the `/verify` request
- Check Request Headers → Cookie header
- **If Cookie header is missing or empty, the cookie isn't being sent**

### 3. Check browser console logs
The Menu.jsx now has detailed logging:
- Look for "🔍 Verifying authentication..."
- Look for "✅ Verification response:" - check if status is false

## Root Cause: Cross-Site Cookie Limitations

Your backend sets cookies correctly:
```javascript
sameSite: "none"  // Required for cross-site
secure: true      // Required for SameSite=none
httpOnly: true    // Security best practice
```

**BUT**: Cookies are domain-scoped. A cookie set by `zerodha-onfe.onrender.com` is only sent to `zerodha-onfe.onrender.com`, not to Netlify sites.

## Solution Options

### Option A: Switch to Token-Based Auth (RECOMMENDED)
Instead of httpOnly cookies, use localStorage + Authorization headers:

**Backend changes:**
- Return the JWT token in the response body (not as a cookie)
- Verify tokens from `Authorization: Bearer <token>` header

**Frontend/Dashboard changes:**
- Store token in localStorage after login
- Send token in Authorization header with every request
- Check localStorage on dashboard load

**Pros:**
- Works perfectly cross-site
- Simpler to debug
- More control over token lifecycle

**Cons:**
- Slightly less secure than httpOnly cookies (XSS risk)
- Need to implement token refresh logic

### Option B: Use a Shared Parent Domain (Complex)
Move all apps to subdomains of one domain:
- frontend.yourdomain.com
- dashboard.yourdomain.com  
- api.yourdomain.com

Set cookie domain to `.yourdomain.com` so it's shared.

**Pros:**
- httpOnly cookies work
- More secure against XSS

**Cons:**
- Requires custom domain setup
- More complex deployment
- Costs money (domain + SSL)

### Option C: Proxy Backend Through Netlify (Workaround)
Use Netlify redirects to proxy backend requests:

**netlify.toml** (in both frontend and dashboard):
```toml
[[redirects]]
  from = "/api/*"
  to = "https://zerodha-onfe.onrender.com/:splat"
  status = 200
  force = true
```

Then call `/api/verify` instead of `https://zerodha-onfe.onrender.com/verify`.

**Pros:**
- Same-origin requests (cookies work)
- No code changes needed

**Cons:**
- Adds latency (extra hop)
- Netlify bandwidth limits
- More complex debugging

## Recommended: Option A (Token-Based Auth)

This is the standard approach for SPAs with separate frontend/backend domains.

### Implementation Steps:

1. **Backend**: Modify login to return token in response body
2. **Frontend**: Save token to localStorage after login, redirect to dashboard with token in URL or localStorage
3. **Dashboard**: Read token from localStorage, send in Authorization header
4. **Backend**: Verify Authorization header instead of cookie

Would you like me to implement Option A for you?
