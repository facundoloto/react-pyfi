import { lazy } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
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
