# Mess Menu Dashboard

A comprehensive web application for managing and calculating monthly mess menu expenses with authentication, daily meal selections, and visual analytics.

## Features

- 🔐 **Firebase Authentication** - Secure login/signup functionality
- 📊 **Dynamic Price Calculation** - Real-time daily, weekly, and monthly totals
- 🍽️ **Meal Selection Management** - Easy toggle for morning, afternoon, and evening meals
- 💰 **Custom Pricing** - Adjustable meal prices per day
- 📈 **Visual Analytics** - Interactive charts showing spending patterns
- 📱 **Responsive Design** - Works seamlessly on mobile and desktop
- 🔄 **Real-time Updates** - All changes sync instantly with Firebase

## Technology Stack

- **Frontend**: React 19, Vite, Custom CSS
- **Backend**: Firebase Authentication, Firestore Database
- **Charts**: Recharts for data visualization
- **Routing**: React Router DOM
- **Styling**: Custom CSS with CSS Variables and Grid/Flexbox

## Setup Instructions

### 1. Firebase Configuration

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication with Email/Password provider
3. Create a Firestore database
4. Copy your Firebase configuration

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Firebase

Update `src/firebase/config.js` with your Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

### 4. Run the Application

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage

### Getting Started

1. **Sign Up**: Create a new account with your email and password
2. **Login**: Sign in to access your dashboard
3. **Default Setup**: All meals are pre-selected for the current month
4. **Customize**: Toggle meals on/off and adjust prices as needed

### Dashboard Features

- **Monthly Summary**: View daily, weekly, and monthly totals
- **Weekly View**: Navigate through weeks of the month
- **Daily Cards**: Individual meal selection for each day
- **Price Editor**: Customize meal prices for specific days
- **Visual Charts**: See spending patterns with interactive charts

### Meal Pricing

Default prices:
- Morning: ₹35
- Afternoon: ₹60
- Evening: ₹35

Prices can be customized per day using the price editor (✏️ button).

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── DailyMenuCard.jsx
│   ├── MonthlySummary.jsx
│   ├── Navigation.jsx
│   ├── ProtectedRoute.jsx
│   └── WeeklyChart.jsx
├── contexts/           # React contexts
│   └── AuthContext.jsx
├── firebase/           # Firebase configuration
│   └── config.js
├── hooks/              # Custom React hooks
│   └── useMenuData.js
├── pages/              # Page components
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   ├── Profile.jsx
│   └── Signup.jsx
├── App.jsx             # Main app component
└── main.jsx           # App entry point
```

## Key Features Explained

### Authentication Flow
- Protected routes require authentication
- Automatic redirect to login for unauthenticated users
- User session persistence across browser refreshes

### Data Management
- All user data stored in Firestore
- Real-time synchronization across devices
- Automatic initialization with default selections

### Price Calculation Logic
```javascript
// Daily Total = Sum of selected meal prices
dailyTotal = morning + afternoon + evening

// Weekly Total = Sum of daily totals for 7 days
weeklyTotal = sum(dailyTotals for week)

// Monthly Total = Sum of all daily totals
monthlyTotal = sum(all dailyTotals)
```

### Responsive Design
- Mobile-first approach with TailwindCSS
- Adaptive grid layouts for different screen sizes
- Touch-friendly interface elements

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Features

1. **New Pages**: Add routes in `App.jsx`
2. **Components**: Create in `src/components/`
3. **Hooks**: Add custom logic in `src/hooks/`
4. **Styling**: Use TailwindCSS classes

## Deployment

### Firebase Hosting (Recommended)

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Build: `npm run build`
5. Deploy: `firebase deploy`

### Other Platforms

The app can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For issues and questions:
1. Check the Firebase console for authentication/database issues
2. Verify your Firebase configuration
3. Check browser console for JavaScript errors
4. Ensure all dependencies are installed correctly

---

**Note**: Remember to replace the Firebase configuration with your actual project credentials before running the application.