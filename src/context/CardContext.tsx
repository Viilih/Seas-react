import { createContext, useState } from 'react';
import { api } from '../utils/api';
import { ICartao } from '../utils/interfaces';

interface ICardContext {
	createCard: (cardData: string) => Promise<void>;
	cardsList: () => Promise<ICartao | any>;
	cartao: ICartao[];
}

export const CardContext = createContext({} as ICardContext);

export const CardProvider = ({ children }: any) => {
	const [cartao, setCartao] = useState<ICartao[]>([]);
	const createCard = async (cardData: any) => {
		console.log(typeof cardData);
		try {
			const response = await fetch(`${api}/cartao/criar/${cardData}`, {
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: JSON.stringify(cardData),
			});

			console.log(response);

			if (response.ok) {
				console.log(await response.json());
			} else {
				console.log('Um erro foi encontrado');
			}
		} catch (error) {
			console.log(error);
		}
	};

	const cardsList = async () => {
		try {
			const response = await fetch(`${api}/cartao/listarDaConta`);
			if (response.ok) {
				const data = await response.json();
				setCartao(data);
			} else {
				console.log('Um erro foi encontrado');
				return [];
			}
		} catch (error) {
			console.log('Um erro foi encontrado', error);
			return [];
		}
	};
	return (
		<CardContext.Provider value={{ createCard, cardsList, cartao }}>
			{children}
		</CardContext.Provider>
	);
};
