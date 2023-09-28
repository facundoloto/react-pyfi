import { lazy } from 'react';
import AppRoutes from './routes/AppRoutes';
import './index.css';

const Menu = lazy(() => import("./components/menu/Menu"));
function App() {
  return (
    <>
      <AppRoutes />
      <Menu />
    </>

  );
}

export default App;
