import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../utils/api';
import { IChildren, IConta } from '../utils/interfaces';
import { toastConfig } from '../utils/ToastConfig';

interface IAuthContext {
	authenticateUser: (login: string, senha: string) => Promise<void>;
	getUserInfo: () => Promise<IConta[] | any>;
	token: string;
	deposit: (valor: number) => Promise<void>;
	withdraw: (valor: number) => Promise<void>;
}
export const AuthContext = createContext({} as IAuthContext);

export const AuthProvider = ({ children }: IChildren) => {
	const [token, setToken] = useState<string>(
		localStorage.getItem('token') || ''
	);

	const navigate = useNavigate();

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
				toast.success('Bem-vindo', toastConfig);
				const token = await response.text();
				localStorage.setItem('token', token);
				setToken(token);
				console.log(response);

				navigate('/dashboard');
			} else {
				toast.error('Usuário Inválido', toastConfig);

				console.log(response);
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
			value={{ authenticateUser, getUserInfo, deposit, withdraw, token }}
		>
			{children}
		</AuthContext.Provider>
	);
};
