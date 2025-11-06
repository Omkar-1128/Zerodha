# 🚀 Deployment Checklist

## ✅ Pre-Deployment Verification

### Backend (Render)
- [x] **Environment Variables Set:**
  - `atlas_url` - MongoDB Atlas connection string
  - `TOKEN_KEY` - JWT secret key
  - `NODE_ENV` - Set to `production` (optional)
  - `PORT` - Auto-set by Render

- [x] **CORS Configuration:**
  - ✅ Frontend: `https://cosmic-starburst-935c6b.netlify.app`
  - ✅ Dashboard: `https://dashboard-272.netlify.app`
  - ✅ Regex pattern for all `.netlify.app` domains
  - ✅ Credentials enabled
  - ✅ All required methods and headers configured

- [x] **Start Script:**
  - ✅ `npm start` → `node index.js` (production-ready)

- [x] **Error Handling:**
  - ✅ Environment variable validation
  - ✅ Database connection error handling
  - ✅ All API endpoints have try-catch blocks

### Frontend (Netlify - cosmic-starburst-935c6b.netlify.app)
- [x] **API Configuration:**
  - ✅ Centralized config: `src/config/api.js`
  - ✅ Fallback URL: `https://zerodha-onfe.onrender.com`
  - ✅ All API calls use `API_BASE_URL`

- [x] **Routes:**
  - ✅ `/Login` - LoginForm component
  - ✅ `/Register` - RegisterForm component
  - ✅ `/Home` - Home component
  - ✅ All routes properly defined

- [x] **Redirects:**
  - ✅ After login → `https://dashboard-272.netlify.app`
  - ✅ After register → `https://dashboard-272.netlify.app`
  - ✅ Navigation paths use correct case (`/Login`, `/Register`)

- [x] **Build Configuration:**
  - ✅ Build command: `npm run build`
  - ✅ Publish directory: `dist`
  - ✅ Environment variable: `VITE_API_URL` (optional, has fallback)

### Dashboard (Netlify - dashboard-272.netlify.app)
- [x] **API Configuration:**
  - ✅ Centralized config: `src/config/api.js`
  - ✅ Fallback URL: `https://zerodha-onfe.onrender.com`
  - ✅ All components use `API_BASE_URL`

- [x] **Components Updated:**
  - ✅ Menu.jsx - All redirects to frontend
  - ✅ Summary.jsx - All API calls
  - ✅ Profile.jsx - API call
  - ✅ Positions.jsx - API call
  - ✅ Orders.jsx - API call
  - ✅ Holdings.jsx - API call
  - ✅ WatchList.jsx - API call

- [x] **Redirects:**
  - ✅ No token → `https://cosmic-starburst-935c6b.netlify.app`
  - ✅ Invalid token → `https://cosmic-starburst-935c6b.netlify.app/Login`
  - ✅ Logout → `https://cosmic-starburst-935c6b.netlify.app/Register`

- [x] **Build Configuration:**
  - ✅ Build command: `npm run build`
  - ✅ Publish directory: `dist`
  - ✅ Environment variable: `VITE_BACKEND_URL` (optional, has fallback)

## 📋 Deployment Steps

### 1. Backend (Render)
```bash
# No build needed - just ensure environment variables are set
# Render will automatically:
# - Install dependencies
# - Run `npm start`
```

**Checklist:**
- [ ] Environment variables set in Render dashboard
- [ ] Service root directory: `backend`
- [ ] Start command: `npm start` (or auto-detected)
- [ ] Deploy and verify logs show: "✅ Connected to Database" and "🚀 Server listening"

### 2. Frontend (Netlify)
```bash
cd frontend
npm install
npm run build
# Upload dist/ folder to Netlify
```

**Checklist:**
- [ ] Build completes without errors
- [ ] `dist/` folder contains `index.html` and `assets/`
- [ ] Deploy to Netlify
- [ ] Set environment variable `VITE_API_URL` (optional - has fallback)
- [ ] Verify site loads at `https://cosmic-starburst-935c6b.netlify.app`

### 3. Dashboard (Netlify)
```bash
cd Dashboard
npm install
npm run build
# Upload dist/ folder to Netlify
```

**Checklist:**
- [ ] Build completes without errors
- [ ] `dist/` folder contains `index.html` and `assets/`
- [ ] Deploy to Netlify
- [ ] Set environment variable `VITE_BACKEND_URL` (optional - has fallback)
- [ ] Verify site loads at `https://dashboard-272.netlify.app`

## 🧪 Post-Deployment Testing

### Backend Tests
- [ ] Health check: `https://zerodha-onfe.onrender.com/health` returns "ok"
- [ ] CORS headers present in response
- [ ] Database connection successful (check logs)

### Frontend Tests
- [ ] Landing page loads
- [ ] Login page accessible at `/Login`
- [ ] Register page accessible at `/Register`
- [ ] Login redirects to dashboard after success
- [ ] Register redirects to dashboard after success
- [ ] API calls work (check browser console for errors)

### Dashboard Tests
- [ ] Dashboard loads (requires authentication)
- [ ] Redirects to frontend if no token
- [ ] All API calls work (Holdings, Positions, Orders, etc.)
- [ ] Logout redirects to frontend register page
- [ ] Profile page loads user details

## 🔍 Common Issues & Solutions

### CORS Errors
- **Symptom:** "Access-Control-Allow-Origin" error
- **Solution:** Verify backend CORS includes both Netlify URLs

### 404 on API Calls
- **Symptom:** "Failed to load resource: 404"
- **Solution:** Check `VITE_API_URL` or `VITE_BACKEND_URL` environment variables, or verify fallback URL is correct

### Cookie Issues
- **Symptom:** Login doesn't persist
- **Solution:** Verify `withCredentials: true` in axios calls and CORS `credentials: true` in backend

### Route Not Found
- **Symptom:** 404 on frontend routes
- **Solution:** Ensure Netlify redirects all routes to `index.html` (should be automatic with SPA)

## 📝 Environment Variables Summary

### Render (Backend)
```
atlas_url=<your-mongodb-connection-string>
TOKEN_KEY=<your-secret-jwt-key>
NODE_ENV=production
```

### Netlify (Frontend)
```
VITE_API_URL=https://zerodha-onfe.onrender.com
```

### Netlify (Dashboard)
```
VITE_BACKEND_URL=https://zerodha-onfe.onrender.com
```

## ✅ Final Verification

All systems should work correctly after deployment. The codebase has been:
- ✅ Updated with new URLs
- ✅ Centralized API configuration
- ✅ Proper error handling
- ✅ CORS configured correctly
- ✅ Route paths verified
- ✅ No linting errors

**Ready for deployment! 🚀**

