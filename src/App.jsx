import { lazy } from 'react';
import { DataProvider } from './Context/ContextProvider';
import { useAuthStore } from './store/authStore';
import AppRoutes from './routes/AppRoutes';
import './index.css';

const Menu = lazy(() => import("./components/menu/Menu"));

function App() {
  const userLoggedIn = useAuthStore((state) => state.isAuthenticated);

  return (
    <>
      {userLoggedIn ? (
        <DataProvider>
          <AppRoutes />
          <Menu />
        </DataProvider>
      ) : (
        /* Render something else when the user is not logged in */
        <AppRoutes />
      )}
    </>

  );
}

export default App;
