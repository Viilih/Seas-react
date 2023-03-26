import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { toast } from 'react-toastify';
import { toastConfig } from '../utils/ToastConfig';
import { IAddress, IContact, IRegisterData, IConta } from '../utils/interfaces';
import { AuthContext } from './AuthContext';

interface IUserContext {
	createUser: (userData: any) => Promise<void>;
	getCostumer: () => Promise<void>;
	editCostumer: (nome: string, cpf: string) => Promise<void>;
}

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: any) => {
	const navigate = useNavigate();
	const { token } = useContext(AuthContext);

	// Criar Usuário
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

	const getCostumer = async () => {
		try {
			const response = await fetch(`${api}/cliente`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token,
				},
			});

			if (response.ok) {
				const data = await response.json();
				return data;
			} else {
				console.log(response);
			}
		} catch (error) {}
	};

	const editCostumer = async (nome: string, cpf: string) => {
		try {
			const response = await fetch(`${api}/cliente`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token,
				},
				body: JSON.stringify({ nome, cpf }),
			});

			if (response.ok) {
				const data = await response.json();
				console.log(data);
			} else {
				console.log(response);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<UserContext.Provider
			value={{
				createUser,
				getCostumer,
				editCostumer,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
