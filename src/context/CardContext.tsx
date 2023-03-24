import { createContext, useContext, useState } from 'react';
import { api } from '../utils/api';
import { ICartao } from '../utils/interfaces';
import { AuthContext } from './AuthContext';

interface ICardContext {
	createCard: (cardData: string) => Promise<void>;
	cardsList: () => Promise<ICartao | any>;
	cartoes: ICartao[];
}

export const CardContext = createContext({} as ICardContext);

export const CardProvider = ({ children }: any) => {
	const { token } = useContext(AuthContext);

	const [cartoes, setCartoes] = useState<ICartao[]>([]);
	const createCard = async (typeOfCard: string) => {
		try {
			const response = await fetch(`${api}/cartao/criar/${typeOfCard}`, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',

					Authorization: token,
				},
				body: JSON.stringify(typeOfCard),
			});
			if (response.ok) {
				const cartao = await response.json();
				setCartoes([...cartoes, cartao]);
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
				const arrayCartões = await response.json();
				setCartoes(arrayCartões);
				return cartoes;
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
		<CardContext.Provider value={{ createCard, cardsList, cartoes }}>
			{children}
		</CardContext.Provider>
	);
};
