import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Register from './pages/Register/Register';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './context/UserContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserInfo from './pages/Info/UserInfo';
import { UserAddress } from './pages/Info/UserAddress';

const Router = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <UserProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/info" element={<UserInfo />} />
          <Route path="/address" element={<UserAddress />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default Router;
