# Token Flow Diagram

## The Complete Authentication Flow

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. USER LOGS IN                                                 │
│    Domain: zerodha-os.netlify.app/Login                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. FRONTEND SENDS CREDENTIALS                                   │
│    POST https://zerodha-onfe.onrender.com/login                 │
│    Body: { username, password }                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. BACKEND VALIDATES & RETURNS TOKEN                            │
│    Response: {                                                  │
│      success: true,                                             │
│      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",         │
│      user: { ... }                                              │
│    }                                                            │
│    + Sets cookie (for backward compatibility)                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. FRONTEND STORES TOKEN                                        │
│    localStorage.setItem('authToken', token)                     │
│    Domain: zerodha-os.netlify.app                               │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 5. FRONTEND REDIRECTS WITH TOKEN IN URL                         │
│    window.location.href =                                       │
│      "https://dashboard-os.netlify.app?token=eyJhbG..."         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 6. DASHBOARD LOADS                                              │
│    Domain: dashboard-os.netlify.app                             │
│    URL: ?token=eyJhbG...                                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 7. DASHBOARD READS TOKEN FROM URL                               │
│    const urlParams = new URLSearchParams(window.location.search)│
│    const urlToken = urlParams.get('token')                      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 8. DASHBOARD STORES TOKEN IN ITS OWN LOCALSTORAGE              │
│    localStorage.setItem('authToken', urlToken)                  │
│    Domain: dashboard-os.netlify.app                             │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 9. DASHBOARD CLEANS URL (SECURITY)                              │
│    window.history.replaceState({}, '', window.location.pathname)│
│    URL becomes: dashboard-os.netlify.app (no ?token)            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 10. DASHBOARD VERIFIES TOKEN                                    │
│     POST https://zerodha-onfe.onrender.com/verify               │
│     Headers: {                                                  │
│       Authorization: "Bearer eyJhbG..."                         │
│     }                                                           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 11. BACKEND VERIFIES TOKEN                                      │
│     - Reads from Authorization header                           │
│     - Validates JWT signature                                   │
│     - Checks expiration                                         │
│     - Finds user in database                                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 12. BACKEND RETURNS SUCCESS                                     │
│     Response: {                                                 │
│       status: true,                                             │
│       user: "username"                                          │
│     }                                                           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 13. DASHBOARD STAYS AUTHENTICATED ✅                            │
│     - Shows user interface                                      │
│     - Token stored in localStorage                              │
│     - Future requests include Authorization header              │
└─────────────────────────────────────────────────────────────────┘
```

## Key Points

### Why URL Parameter?
- **localStorage is domain-specific**
- Token stored on `zerodha-os.netlify.app` ≠ accessible on `dashboard-os.netlify.app`
- URL parameter transfers data during cross-domain redirect

### Security Measures
1. Token only in URL briefly (~100ms)
2. URL cleaned immediately after reading
3. Token stored in localStorage (domain-isolated)
4. Token sent over HTTPS only
5. JWT signed and expires in 7 days

### What Happens on Refresh?
```
Dashboard Refresh
       │
       ▼
Read token from localStorage (no URL param needed)
       │
       ▼
Send to backend in Authorization header
       │
       ▼
Backend verifies → Success → Stay logged in ✅
```

### What Happens on Logout?
```
User clicks Logout
       │
       ▼
localStorage.removeItem('authToken')
       │
       ▼
Redirect to zerodha-os.netlify.app/Register
       │
       ▼
No token → Must login again
```

## Domain Isolation

```
┌──────────────────────────┐     ┌──────────────────────────┐
│ zerodha-os.netlify.app   │     │ dashboard-os.netlify.app │
│                          │     │                          │
│ localStorage:            │     │ localStorage:            │
│   authToken: "abc123"    │     │   authToken: "xyz789"    │
│                          │     │                          │
│ ❌ Cannot read each      │     │ ❌ Cannot read each      │
│    other's storage       │     │    other's storage       │
└──────────────────────────┘     └──────────────────────────┘
           │                                  │
           └──────────────┬───────────────────┘
                          │
                    URL Parameter
                  ?token=abc123
                (transfers once)
```

## Backend Token Acceptance

```
Backend /verify endpoint accepts token from:

1. Cookie (req.cookies.token)
   └─ For same-site requests
   └─ Backward compatibility

2. Authorization Header (req.headers.authorization)
   └─ For cross-site requests
   └─ Format: "Bearer <token>"
   └─ Primary method for dashboard
```

## Complete Flow Summary

1. ✅ Login on frontend → get token
2. ✅ Store in frontend localStorage
3. ✅ Redirect to dashboard with `?token=...`
4. ✅ Dashboard reads from URL
5. ✅ Dashboard stores in its localStorage
6. ✅ Dashboard removes from URL
7. ✅ Dashboard sends in Authorization header
8. ✅ Backend verifies from header
9. ✅ Dashboard stays authenticated
10. ✅ Refresh works (token in localStorage)
