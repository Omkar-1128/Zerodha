# Authentication Fix Implementation

## Problem Summary
Dashboard loses authentication after 4-5 seconds because httpOnly cookies don't work cross-site between:
- Frontend: `zerodha-272.netlify.app`
- Dashboard: `dashboard-272.netlify.app`  
- Backend: `zerodha-onfe.onrender.com`

## Recommended Solution: Token-Based Authentication

Switch from httpOnly cookies to localStorage + JWT tokens with Authorization headers.

## Changes Required

### 1. Backend Changes

#### A. Modify AuthController.js - Return token in response body

**Current (cookie-only):**
```javascript
const token = createSecretToken(user._id);
res.cookie("token", token, cookieOptions);
return res.status(200).json({
  success: true,
  message: "User logged in successfully",
  user: { ... }
});
```

**New (token in body + cookie for backward compatibility):**
```javascript
const token = createSecretToken(user._id);

// Keep cookie for backward compatibility (optional)
res.cookie("token", token, cookieOptions);

return res.status(200).json({
  success: true,
  message: "User logged in successfully",
  token: token,  // ADD THIS
  user: { ... }
});
```

#### B. Modify AuthMiddleware.js - Accept Authorization header

**Current (cookie-only):**
```javascript
export const userVerification = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false });
  }
  // ... verify token
};
```

**New (header OR cookie):**
```javascript
export const userVerification = (req, res) => {
  // Try Authorization header first, fall back to cookie
  let token = null;
  
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
    console.log("Token from Authorization header");
  } else if (req.cookies.token) {
    token = req.cookies.token;
    console.log("Token from cookie");
  }
  
  if (!token) {
    console.log("Verification failed: No token");
    return res.json({ status: false });
  }
  
  // ... rest of verification logic
};
```

#### C. Protect other routes (optional but recommended)

Add authentication middleware to routes that need protection:
```javascript
app.get("/getHoldings", userVerification, async (req, res) => {
  // Only authenticated users can access
});
```

### 2. Frontend Changes (Login Site)

#### Modify LoginForm.jsx

**Current:**
```javascript
const { data } = await axios.post(
  `${API_BASE_URL}/login`,
  { ...inputValue },
  { withCredentials: true }
);

if (data.success) {
  navigate("/");
}
```

**New:**
```javascript
const { data } = await axios.post(
  `${API_BASE_URL}/login`,
  { ...inputValue },
  { withCredentials: true }
);

if (data.success) {
  // Save token to localStorage
  if (data.token) {
    localStorage.setItem('authToken', data.token);
    console.log("✅ Token saved to localStorage");
  }
  
  // Redirect to dashboard with token
  window.location.href = "https://dashboard-272.netlify.app";
}
```

### 3. Dashboard Changes

#### A. Create an axios instance with interceptor

**Create Dashboard/src/config/axios.js:**
```javascript
import axios from 'axios';
import { API_BASE_URL } from './api.js';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Add token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 responses
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = 'https://zerodha-272.netlify.app/Login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
```

#### B. Update Menu.jsx to use the axios instance

**Replace:**
```javascript
import axios from "axios";
```

**With:**
```javascript
import axios from "../config/axios.js";
```

**Simplify verification:**
```javascript
useEffect(() => {
  const verifyCookie = async () => {
    try {
      const { data } = await axios.post('/verify', {});
      
      if (data.status && data.user) {
        setUsername(data.user);
        setIsVerifying(false);
      } else {
        // No valid session
        localStorage.removeItem('authToken');
        window.location.href = "https://zerodha-272.netlify.app/Login";
      }
    } catch (error) {
      console.error("Verification error:", error);
      localStorage.removeItem('authToken');
      window.location.href = "https://zerodha-272.netlify.app/Login";
    }
  };
  
  // Check if token exists before verifying
  const token = localStorage.getItem('authToken');
  if (!token) {
    window.location.href = "https://zerodha-272.netlify.app/Login";
    return;
  }
  
  verifyCookie();
}, []);
```

#### C. Update all other components

Replace `axios` imports with the configured instance in:
- Summary.jsx
- Holdings.jsx
- WatchList.jsx
- Profile.jsx
- Orders.jsx
- Positions.jsx

## Testing Steps

1. **Clear all storage**: DevTools → Application → Clear site data
2. **Login on frontend**: Should save token to localStorage
3. **Check localStorage**: Should see `authToken` key
4. **Redirect to dashboard**: Should stay logged in
5. **Check Network tab**: Verify requests include `Authorization: Bearer ...` header
6. **Refresh dashboard**: Should remain authenticated

## Rollback Plan

If issues occur, the backend still supports cookies, so you can:
1. Revert frontend/dashboard changes
2. Keep using cookie-based auth
3. Debug cookie issues separately

## Security Considerations

**localStorage vs httpOnly cookies:**
- localStorage is vulnerable to XSS attacks
- httpOnly cookies are more secure but don't work cross-site
- Mitigation: Implement Content Security Policy (CSP) headers

**Token expiration:**
- Current: 7 days (from backend)
- Consider: Shorter expiration + refresh token mechanism

**HTTPS only:**
- Both Netlify sites use HTTPS ✓
- Render uses HTTPS ✓
- Tokens are safe in transit

## Next Steps

Would you like me to:
1. Implement these changes automatically?
2. Create a step-by-step guide for manual implementation?
3. Explore alternative solutions?
