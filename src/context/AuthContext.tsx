import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../utils/api';
import { IChildren, IConta } from '../utils/interfaces';
import { toastConfig } from '../utils/ToastConfig';

interface IAuthContext {
	authenticateUser: (login: string, senha: string) => {};
	getUserInfo: () => Promise<IConta[] | any>;
	logOut: () => void;
	deposit: (valor: number) => Promise<void>;
	withdraw: (valor: number) => Promise<void>;
	isAdmin: () => {};
	token: string;
}
export const AuthContext = createContext({} as IAuthContext);

export const AuthProvider = ({ children }: IChildren) => {
	const [token, setToken] = useState<string>(
		localStorage.getItem('token') || ''
	);

	const navigate = useNavigate();

	const logOut = () => {
		localStorage.removeItem('token');
		setToken('');
		navigate('/');
	};

	const authenticateUser = async (login: string, senha: string) => {
		try {
			const response = await fetch(`${api}/auth`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ login, senha }),
			});

			if (response.ok) {
				const token = await response.text();
				localStorage.setItem('token', token);
				setToken(token);
				await isAdmin();

				toast.success('Bem-vindo', toastConfig);
				console.log(response);
			} else {
				toast.error('Usuário Inválido', toastConfig);

				console.log(response);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const isAdmin = async () => {
		try {
			const token = localStorage.getItem('token');
			if (!token) {
				throw new Error('Token não encontrado');
			}
			const response = await fetch(`${api}/usuario/logado`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token,
				},
			});
			if (response.ok) {
				const data = await response.json();
				const roles = data.cargos;
				if (roles.includes('ROLE_ADMIN')) {
					navigate('/admin');
				} else {
					navigate('/dashboard');
				}
			} else {
				throw new Error('Não foi possível obter as informações do usuário');
			}
		} catch (error) {
			console.log(error);
		}
	};

	// Listar informações do Usuário

	const getUserInfo = async () => {
		try {
			const response = await fetch(`${api}/conta`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token,
				},
			});

			if (response.ok) {
				const data = await response.json();
				return data as IConta[];
			} else {
				console.log('erro');
			}
		} catch (error) {
			console.error(error);
		} finally {
		}
	};

	// Realizar um depósito na conta

	const deposit = async (valor: number) => {
		try {
			const response = await fetch(`${api}/conta/depositar/${valor}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token,
				},
			});
			if (response.ok) {
				toast.success('Depósito realizado com sucesso', toastConfig);
			} else {
				toast.error('Erro ao realizar depósito', toastConfig);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const withdraw = async (valor: number) => {
		try {
			const response = await fetch(`${api}/conta/sacar/${valor}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token,
				},
			});

			if (response.ok) {
				toast.success('Saque realizado com sucesso', toastConfig);
			} else {
				toast.error('Erro ao realizar saque', toastConfig);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				authenticateUser,
				isAdmin,
				getUserInfo,
				deposit,
				withdraw,
				token,
				logOut,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
