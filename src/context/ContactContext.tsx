import { createContext, useContext } from 'react';
import { api } from '../utils/api';
import { AuthContext } from './AuthContext';

export const ContactContext = createContext({} as any);

interface IContactContext {
	createContact: (telefone: string, email: string) => Promise<any>;
}

export const ContactProvider = ({ children }: any) => {
	const { token } = useContext(AuthContext);

	const createContact = async (telefone: string, email: string) => {
		try {
			const response = await fetch(`${api}/contato`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token,
				},
				body: JSON.stringify({ telefone, email }),
			});

			if (response.ok) {
				const data = await response.json();
				return data;
			} else {
				console.log('Um erro foi encontrado');
			}
		} catch (error) {
			console.error(error);
		}
	};

	const getContact = async () => {
		try {
			const response = await fetch(`${api}/contato`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json', Authorization: token },
			});

			if (response.ok) {
				const dataUser = await response.json();
				return dataUser;
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<ContactContext.Provider value={{ createContact }}>
			{children}
		</ContactContext.Provider>
	);
};
