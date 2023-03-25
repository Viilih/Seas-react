import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { AuthContext } from '../../context/AuthContext';

export const AdminRoute = () => {
	const { token } = useContext(AuthContext);
	const decoded: any = jwtDecode(token);
	const isAdmin = decoded?.cargos.some((cargo: any) => cargo === 'ROLE_ADMIN');
	//Ao utilizar a função jwtDecode, o JWT é decodificado para obter as informações contidas no token, como o papel ou função do usuário. No caso desta função, a função verifica se o usuário tem o papel ou função de "ROLE_ADMIN".
	return isAdmin ? <Outlet /> : <Navigate to="/dashboard" />;
};
