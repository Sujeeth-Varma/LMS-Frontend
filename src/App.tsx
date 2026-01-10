import { useEffect } from 'react';
import Dashboard from './components/Dashboard';
import { useAppDispatch } from './app/hooks';
import { restoreSession } from './features/auth/authSlice';

function App() {
  const dispatch = useAppDispatch();

  // Restore session from localStorage on app mount
  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-background">
      <Dashboard />
    </div>
  );
}

export default App;
