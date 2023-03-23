import { createContext } from 'react';
import { api } from '../utils/api';

interface ICardContext {
	createCard: (cardData: any) => Promise<void>;
}

export const CardContext = createContext({} as any);

export const cardProvider = ({ children }: any) => {
	const createCard = async (cardData: any) => {
		try {
			const response = await fetch(`${api}/cartao/criar/${cardData.cardType}`, {
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: JSON.stringify(cardData),
			});

			if (response.ok) {
				console.log(await response.json());
			} else {
				console.log('Um erro foi encontrado');
			}
		} catch (error) {}
	};

	return (
		<CardContext.Provider value={{ createCard }}>
			{children}
		</CardContext.Provider>
	);
};
