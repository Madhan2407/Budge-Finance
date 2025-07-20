# 💸 Budge - Personal Finance Tracking App

A modern, AI-powered personal finance tracking application built with React, TypeScript, and Firebase.

## Features

### 🔐 Authentication & Security
- Firebase Authentication with email/password and Google OAuth
- Secure user data protection
- Dark/light mode with persistent settings

### 💳 Financial Management
- Real-time transaction tracking
- Category-based expense organization
- Multi-wallet support (bank accounts, UPI, cards)
- Budget creation and monitoring

### 📊 Analytics & Insights
- Interactive spending charts and visualizations
- Monthly and category-based reports
- Goal tracking with progress indicators
- Comprehensive financial dashboard

### 🤖 AI Assistant
- Intelligent financial advice and insights
- Voice input support (simulated)
- Quick question templates
- Personalized spending recommendations

### 👨‍💻 Admin Panel
- User analytics and management
- Transaction monitoring
- System health dashboard
- Flagged transaction review

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Routing**: React Router
- **Form Handling**: React Hook Form
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd budge-finance-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
   - Create a new Firebase project at https://console.firebase.google.com
   - Enable Authentication (Email/Password and Google providers)
   - Create a Firestore database
   - Copy your Firebase config and replace the demo config in `src/utils/firebase.ts`

4. Start the development server:
```bash
npm run dev
```

### Firebase Configuration

Replace the demo configuration in `src/utils/firebase.ts` with your actual Firebase project credentials:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

### Firestore Security Rules

Set up the following security rules in your Firestore database:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /transactions/{transactionId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    match /budgets/{budgetId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    match /goals/{goalId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    match /wallets/{walletId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Auth/            # Authentication components
│   ├── Charts/          # Data visualization components
│   ├── Dashboard/       # Dashboard-specific components
│   ├── Goals/           # Goal management components
│   └── Layout/          # Layout components (Header, Navigation)
├── hooks/               # Custom React hooks
├── pages/               # Page components
├── types/               # TypeScript type definitions
├── utils/               # Utility functions and Firebase config
└── App.tsx             # Main application component
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features to Implement

### Phase 1 (Current)
- ✅ Authentication & User Management
- ✅ Basic Dashboard
- ✅ Transaction Management
- ✅ Goal Tracking
- ✅ AI Assistant Interface
- ✅ Admin Panel

### Phase 2 (Future)
- [ ] Real bank integration (Plaid API)
- [ ] OCR Receipt Scanning (Tesseract.js)
- [ ] Push Notifications
- [ ] PWA Capabilities
- [ ] Real-time AI Integration (GPT-4 API)
- [ ] Advanced Analytics
- [ ] Budgeting Tools
- [ ] Bill Reminders
- [ ] Export Reports (PDF/CSV)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please email support@budge-app.com or create an issue in the repository.