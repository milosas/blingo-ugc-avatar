import { useState, FormEvent } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/Button';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Mode = 'signin' | 'signup';

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { t } = useLanguage();
  const [mode, setMode] = useState<Mode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setError(null);
    setSuccessMessage(null);
    setLoading(false);
  };

  const handleClose = () => {
    resetForm();
    setMode('signin');
    onClose();
  };

  const handleEmailSignIn = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      switch (error.message) {
        case 'Invalid login credentials':
          setError(t.auth.invalidCredentials);
          break;
        case 'Email not confirmed':
          setError(t.auth.emailNotConfirmed);
          break;
        default:
          setError(t.auth.genericError);
      }
      setLoading(false);
    } else {
      handleClose();
    }
  };

  const handleEmailSignUp = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin
      }
    });

    if (error) {
      switch (error.message) {
        case 'User already registered':
          setError(t.auth.emailAlreadyExists);
          break;
        case 'Password should be at least 6 characters':
          setError(t.auth.weakPassword);
          break;
        default:
          if (error.message.includes('already registered')) {
            setError(t.auth.emailAlreadyExists);
          } else if (error.message.includes('password')) {
            setError(t.auth.weakPassword);
          } else {
            setError(t.auth.genericError);
          }
      }
      setLoading(false);
    } else {
      setSuccessMessage(t.auth.checkEmail);
      setLoading(false);
      setTimeout(() => {
        handleClose();
      }, 3000);
    }
  };

  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });
  };

  const switchMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    setError(null);
    setSuccessMessage(null);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

      {/* Full-screen container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md bg-white rounded-2xl shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <DialogTitle className="text-xl font-semibold text-gray-900">
              {mode === 'signin' ? t.auth.signIn : t.auth.signUp}
            </DialogTitle>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={mode === 'signin' ? handleEmailSignIn : handleEmailSignUp} className="p-6 space-y-4">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                {t.auth.email}
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                required
                disabled={loading}
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                {t.auth.password}
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                required
                minLength={6}
                disabled={loading}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-600 bg-red-50 rounded-lg p-3 text-sm">
                {error}
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="text-green-600 bg-green-50 rounded-lg p-3 text-sm">
                {successMessage}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
            >
              {loading
                ? (mode === 'signin' ? t.auth.signingIn : t.auth.signingUp)
                : (mode === 'signin' ? t.auth.signInButton : t.auth.createAccount)
              }
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">{t.auth.orContinueWith}</span>
              </div>
            </div>

            {/* Google OAuth Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-gray-700 font-medium">{t.auth.continueWithGoogle}</span>
            </button>

            {/* Mode Switch Link */}
            <div className="text-center text-sm">
              <span className="text-gray-600">
                {mode === 'signin' ? t.auth.dontHaveAccount : t.auth.alreadyHaveAccount}
              </span>
              {' '}
              <button
                type="button"
                onClick={switchMode}
                className="text-indigo-600 hover:text-indigo-500 font-medium"
                disabled={loading}
              >
                {mode === 'signin' ? t.auth.signUp : t.auth.signIn}
              </button>
            </div>

            {/* Continue as Guest */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                disabled={loading}
              >
                {t.auth.continueAsGuest}
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
