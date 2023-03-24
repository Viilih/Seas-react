import { createContext, useContext } from 'react';
import { api } from '../utils/api';
import { AuthContext } from './AuthContext';

export const AddressContext = createContext({} as any);

export const AddressProvider = ({ children }: any) => {
	const { token } = useContext(AuthContext);

	const createAddress = async (
		cep: string,
		rua: string,
		numero: number,
		complemento: string,
		bairro: string,
		cidade: string,
		estado: string
	) => {
		try {
			const response = await fetch(`${api}/endereco`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token,
				},
				body: JSON.stringify({
					cep,
					rua,
					numero,
					complemento,
					bairro,
					cidade,
					estado,
				}),
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

	return (
		<AddressContext.Provider value={{ createAddress }}>
			{children}
		</AddressContext.Provider>
	);
};
