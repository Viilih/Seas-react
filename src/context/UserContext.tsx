import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { toast } from 'react-toastify';
import { toastConfig } from '../utils/ToastConfig';
import { IAddress, IContact } from '../utils/interfaces';

interface IUserContext {
	createUser: (userData: any) => Promise<void>;
	authenticateUser: (numeroConta: number, senha: string) => Promise<void>;
	createAddress: (data: IAddress) => Promise<void | any>;
	createContact: (newAddress: IContact) => Promise<void | any>;
}

interface IAccount {
	idUser: number;
}

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: any) => {
	const navigate = useNavigate();
	const headers = new Headers();
	const [numeroConta, setNumeroConta] = useState<number | null>(null);
	const [senha, setSenha] = useState<string | null>(null);

	const createUser = async (userData: any) => {
		try {
			const response = await fetch(`${api}/conta`, {
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: JSON.stringify(userData),
			});

			if (response.ok) {
				console.log(await response.json());
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

	const authenticateUser = async (numeroConta2: number, senha2: string) => {
		try {
			const response = await fetch(`${api}/conta/cliente`, {
				method: 'GET',
				redirect: 'follow',
				headers: {
					'Content-Type': 'application/json',
					'numeroConta': String(numeroConta2),
					'senha': senha2,
				},
			});

			if (response.ok) {
				const data = await response.json();
				console.log(data);
				navigate('/dashboard');
			} else {
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
					'numeroConta': '100029',
					'senha': '@Testeadmin1234',
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
					'numeroConta': '100029',
					'senha': '@Testeadmin1234',
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

	return (
		<UserContext.Provider
			value={{ createUser, authenticateUser, createAddress, createContact }}
		>
			{children}
		</UserContext.Provider>
	);
};
