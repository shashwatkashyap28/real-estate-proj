import { useState } from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app, isFirebaseConfigured } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { safeFetchJson } from '../utils/api';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  const handleGoogleClick = async () => {
    try {
      setAuthError(null);
      setLoading(true);

      if (!isFirebaseConfigured()) {
        const msg = 'Firebase API Key is missing. Please set VITE_FIREBASE_API_KEY in your environment.';
        setAuthError(msg);
        dispatch(signInFailure(msg));
        setLoading(false);
        return;
      }

      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const data = await safeFetchJson('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      if (!data || data.success === false) {
        const errorMsg = data?.message || 'Failed to authenticate with backend server.';
        setAuthError(errorMsg);
        dispatch(signInFailure(errorMsg));
        setLoading(false);
        return;
      }

      dispatch(signInSuccess(data));
      setLoading(false);
      navigate(data.isAdmin ? '/dashboard' : '/');
    } catch (error) {
      console.error('Google sign-in error:', error);
      const msg = error?.code === 'auth/popup-closed-by-user'
        ? 'Sign-in cancelled'
        : error?.message || 'Could not sign in with Google';
      setAuthError(msg);
      dispatch(signInFailure(msg));
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col gap-2'>
      <button
        onClick={handleGoogleClick}
        disabled={loading}
        type='button'
        className='w-full bg-red-700 text-white p-3 rounded-lg uppercase font-semibold hover:opacity-95 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2'
      >
        {loading ? 'Connecting to Google...' : 'Continue with Google'}
      </button>

      {authError && (
        <p className='text-red-400 text-xs text-center mt-1'>{authError}</p>
      )}
    </div>
  );
}