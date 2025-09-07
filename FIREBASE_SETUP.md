# Firebase Setup Guide

## 🔥 Fixing "Missing or insufficient permissions" Error

The error you're seeing is due to Firestore security rules that need to be configured. Here's how to fix it:

### Step 1: Update Firestore Security Rules

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Select your project**: `eco-friendly-app-6f373`
3. **Navigate to Firestore Database**:
   - Click on "Firestore Database" in the left sidebar
   - Click on the "Rules" tab
4. **Replace the existing rules** with the following:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow users to read and write their own menu data
    match /userMenus/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow users to read and write their own settings
    match /userSettings/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

5. **Click "Publish"** to save the rules

### Step 2: Verify Authentication is Enabled

1. **Go to Authentication** in Firebase Console
2. **Click on "Sign-in method"** tab
3. **Ensure "Email/Password" is enabled**:
   - If not enabled, click on it and toggle "Enable"
   - Click "Save"

### Step 3: Test the Application

1. **Refresh your application** in the browser
2. **Try signing in** with your existing account
3. **The error should be resolved**

## 🆕 New Features Added

### ✅ **Fixed Issues:**

1. **"View All Days" Button**: Now works correctly and shows all days of the selected month
2. **Firebase Permissions**: Added proper security rules for user data access
3. **Month Selection**: Added ability to navigate between different months and years

### 🎯 **New Features:**

1. **Month & Year Selector**: 
   - Choose any month and year to view
   - Automatically loads data for selected month
   - Creates default selections for new months

2. **Default Days Configuration**:
   - Click "Set Default Days" in the month selector
   - Choose which days of the week should have meals selected by default
   - Useful for setting up weekend vs weekday preferences

3. **Improved Data Management**:
   - Better error handling and loading states
   - Automatic data initialization for new months
   - Persistent data across month changes

## 🔧 How to Use New Features

### **Month Navigation:**
1. Use the Month/Year dropdowns at the top of the dashboard
2. Select any month and year to view that month's data
3. The app will automatically load or create data for that month

### **Default Days Setup:**
1. Click "Set Default Days" button in the month selector
2. Check/uncheck the days of the week you want meals selected by default
3. Click "Apply Default Days" to save your preferences
4. Future months will use these default settings

### **View All Days:**
1. Click "View All Days of the Month" button
2. See all days of the selected month in a grid layout
3. Click "Back to Weekly View" to return to weekly navigation

## 🚨 Troubleshooting

### **Still Getting Permission Errors?**

1. **Check Firebase Console**:
   - Ensure you're in the correct project
   - Verify the rules were published successfully
   - Check that Authentication is enabled

2. **Clear Browser Cache**:
   - Hard refresh the page (Ctrl+F5 or Cmd+Shift+R)
   - Clear browser cache and cookies

3. **Check Network Tab**:
   - Open browser DevTools (F12)
   - Go to Network tab
   - Look for any failed requests to Firebase

### **Data Not Loading?**

1. **Check Authentication**:
   - Ensure you're signed in
   - Try signing out and back in

2. **Check Console Errors**:
   - Open browser DevTools (F12)
   - Look for any JavaScript errors in the Console tab

## 📱 Mobile Compatibility

The new features are fully responsive and work on:
- ✅ Desktop computers
- ✅ Tablets
- ✅ Mobile phones

## 🔄 Data Persistence

- All your meal selections are saved to Firebase
- Data persists across devices and sessions
- Each month's data is stored separately
- You can switch between months without losing data

---

**Need Help?** If you're still experiencing issues, check the browser console for specific error messages and ensure your Firebase project is properly configured.
