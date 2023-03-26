import { createContext, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { api } from '../utils/api';
import { toastConfig } from '../utils/ToastConfig';
import { AuthContext } from './AuthContext';

export const AdminContext = createContext({} as any);
interface IAdminContext {
	getCostumerReport: (cpf: string) => {};
	disableAccount: (numeroConta: number) => {};
}

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
				console.log(response);
				const data = await response.json();
				toast.success('Conta desativada com sucesso', toastConfig);
				// console.log(data);

				return data;
			} else {
				console.log(response);
				toast.error('Algo deu errado', toastConfig);
				return;
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<AdminContext.Provider value={{ getCostumerReport, disableAccount }}>
			{children}
		</AdminContext.Provider>
	);
};
