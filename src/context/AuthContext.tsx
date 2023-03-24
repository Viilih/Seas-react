import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../utils/api';

interface IAuthContext {
	createNewUser: (userData: any) => Promise<void>;
	authenticateUser: (login: string, senha: string) => Promise<void>;
	getUserInfo: () => Promise<void>;
	token: string;
}
export const AuthContext = createContext({} as IAuthContext);

export const AuthProvider = ({ children }: any) => {
	const [token, setToken] = useState<string>(
		localStorage.getItem('token') || ''
	);
	const navigate = useNavigate();

	const createNewUser = async (userData: any) => {
		try {
			const response = await fetch(`${api}/conta`, {
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: JSON.stringify(userData),
			});

			if (response.ok) {
				toast.success('Usuário cadastro com sucesso');
				navigate('/');
			} else {
				toast.error('Ocorreu um erro ao cadastrar o usuário. Tente novamente!');
			}
		} catch (error) {
			toast.error('Ocorreu um erro inesperado');
			console.error(error);
		}
	};

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
				console.log(data);
			} else {
				console.log('erro');
			}
		} catch (error) {
			console.error(error);
		} finally {
		}
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
				navigate('/dashboard');
			} else {
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<AuthContext.Provider
			value={{ authenticateUser, createNewUser, getUserInfo, token }}
		>
			{children}
		</AuthContext.Provider>
	);
};
