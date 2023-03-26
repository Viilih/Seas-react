import { createContext, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { api } from '../utils/api';
import { toastConfig } from '../utils/ToastConfig';
import { AuthContext } from './AuthContext';

export const AdminContext = createContext({} as any);

export const AdminProvider = ({ children }: any) => {
	const [token, setToken] = useState<string>(
		localStorage.getItem('token') || ''
	);

	const getCostumerReport = async (cpf: string) => {
		try {
			const response = await fetch(
				`${api}/admin/relatorio-cliente?paginaSolicitada=0&tamanhoPagina=10&cpf=${cpf}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: token,
					},
				}
			);

			if (response.ok) {
				const data = await response.json();
				return data;
			} else {
				toast.error('Algo deu errado', toastConfig);
				return;
			}
		} catch (error) {
			console.log(error);
		}
	};

	const disableAccount = async (numeroConta: number) => {
		try {
			const response = await fetch(
				`${api}/admin/conta/${numeroConta}/desativar`,
				{
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						Authorization: token,
					},
				}
			);

			if (response.ok) {
				toast.success('Conta desativada com sucesso', toastConfig);
			} else {
				toast.error('Algo deu errado', toastConfig);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const reactivateAccount = async (cpf: string) => {
		try {
			const response = await fetch(`${api}/admin/conta/${cpf}/reativar`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token,
				},
			});

			if (response.ok) {
				toast.success('Conta reativada com sucesso', toastConfig);
				// const data = await response.json();
				// return data;
			} else {
				toast.error(
					'Um erro foi encontrado ao tentar reativar sua conta',
					toastConfig
				);
				// return;
			}
		} catch (error) {}
	};
	return (
		<AdminContext.Provider
			value={{ getCostumerReport, disableAccount, reactivateAccount }}
		>
			{children}
		</AdminContext.Provider>
	);
};
