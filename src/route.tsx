import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Register from './pages/Register/Register';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './context/UserContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserInfo from './pages/Info/UserInfo';
import { UserAddress } from './pages/Info/UserAddress';
import { CardProvider } from './context/CardContext';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { AdminPage } from './pages/Admin/AdminPage';
import { AuthProvider } from './context/AuthContext';

const Router = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <AuthProvider>
        <UserProvider>
          <CardProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/info" element={<UserInfo />} />
                <Route path="/address" element={<UserAddress />} />
              </Route>
            </Routes>
          </CardProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Router;
