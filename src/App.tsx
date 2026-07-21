import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignInPage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import RegistrationFlow from './components/registration/RegistrationFlow';
import { RegistrationProvider } from './components/registration/RegistrationContext';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './pages/Dashboard';

function RegisterWithProvider() {
  const location = useLocation();
  const state = location.state as { email?: string; ownerId?: string } | null;
  const initialEmail = state?.email || '';
  const initialOwnerId = state?.ownerId || '';

  return (
    <RegistrationProvider initialEmail={initialEmail} initialOwnerId={initialOwnerId}>
      <RegistrationFlow />
    </RegistrationProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/register" element={<RegisterWithProvider />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
