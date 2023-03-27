import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Register from './pages/Register/Register';
import AccountInfo from './pages/Account/AccountInfo';
import Shop from './pages/Shop/Shop';
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
import { AddressProvider } from './context/AddressContext';
import { ContactProvider } from './context/ContactContext';
import { AdminRoute } from './components/AdminRoute/AdminRoute';
import { AdminProvider } from './context/AdminContext';
import { EconomicProvider } from './context/EconomicContext';

const Router = () => {
	return (
		<BrowserRouter>
			<ToastContainer />
			<AuthProvider>
				<UserProvider>
					<AddressProvider>
						<ContactProvider>
							<CardProvider>
								<AdminProvider>
									<EconomicProvider>
										<Routes>
											<Route path="/" element={<Login />} />
											<Route path="/register" element={<Register />} />

											<Route element={<PrivateRoute />}>
												<Route path="/dashboard" element={<Dashboard />} />
												<Route path="/info" element={<UserInfo />} />
												<Route path="/address" element={<UserAddress />} />
												<Route path="/account" element={<AccountInfo />} />
												<Route path="/shop" element={<Shop />} />
											</Route>
											<Route element={<AdminRoute />}>
												<Route path="/admin" element={<AdminPage />} />
											</Route>
										</Routes>
									</EconomicProvider>
								</AdminProvider>
							</CardProvider>
						</ContactProvider>
					</AddressProvider>
				</UserProvider>
			</AuthProvider>
		</BrowserRouter>
	);
};

export default Router;
