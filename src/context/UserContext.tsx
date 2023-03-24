import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { toast } from 'react-toastify';
import { toastConfig } from '../utils/ToastConfig';
import { IAddress, IContact, IRegisterData } from '../utils/interfaces';

interface IUserContext {
	createUser: (userData: any) => Promise<void>;
	authenticateUser: (login: string, senha: string) => Promise<void>;
	createAddress: (
		newAddress: IAddress,
		numeroConta: number,
		senha: string
	) => Promise<IAddress[] | undefined>;
	createContact: (
		newContact: IContact,
		numeroConta: number,
		senha: string
	) => Promise<void>;
	getContact: (numeroConta: number, senha: string) => Promise<any>;
	getAccount: () => Promise<void>;
}

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: any) => {
	const navigate = useNavigate();
	const [token, setToken] = useState<string>(
		localStorage.getItem('token') || ''
	);

	const createUser = async (userData: IRegisterData) => {
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
				console.log(token);
				navigate('/dashboard');
			} else {
			}
		} catch (error) {
			console.log(error);
		}
	};

	const getAccount = async () => {
		try {
			const response = await fetch(`${api}/conta`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (response.ok) {
				const data = await response.json();
				console.log(data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const createAddress = async (newAddress: IAddress) => {
		try {
			const response = await fetch(`${api}/endereco`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					numeroConta: '100029',
					senha: '@Testeadmin1234',
				},
				body: JSON.stringify(newAddress),
			});
			if (response.ok) {
				const data = await response.json();

				console.log('Cadastrado com sucesso');
				return data as IAddress[];
			}
		} catch (error) {
			throw error;
		}
	};

	const createContact = async (newContact: IContact) => {
		try {
			const response = await fetch(`/contato`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newContact),
			});
			if (response.ok) {
				const data = await response.json();

				console.log('Cadastrado com sucesso');
				// return data as IContact[];
			}
		} catch (error) {
			throw error;
		}
	};

	const getContact = async () => {
		try {
			const response = await fetch(`${api}/contato/cliente,`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (response.ok) {
				const data = await response.json();
				return data;
			}
		} catch (error) {
			throw error;
		}
	};

	return (
		<UserContext.Provider
			value={{
				createUser,
				authenticateUser,
				createAddress,
				createContact,
				getContact,
				getAccount,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
