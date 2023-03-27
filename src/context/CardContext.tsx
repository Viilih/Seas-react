import { createContext, useContext, useState } from 'react';
import { api } from '../utils/api';
import { ICartao, IPagamento } from '../utils/interfaces';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';

interface ICardContext {
	createCard: (cardData: string) => Promise<void>;
	cardsList: () => Promise<ICartao | any>;
	deleteCard: (numeroCartao: number) => Promise<void>;
	updateCard: (numeroCartao: number, updatedCardData: ICartao) => Promise<void>;
	addCompra: (
		numeroCartao: number,
		codigoSeguranca: number,
		valor: number
	) => Promise<void>;
	cartoes: ICartao[];
}

export const CardContext = createContext({} as ICardContext);

export const CardProvider = ({ children }: any) => {
	const { token } = useContext(AuthContext);

	const [cartoes, setCartoes] = useState<ICartao[]>([]);

	// Criar Cartão
	const createCard = async (typeOfCard: string) => {
		const requestBody = {
			type: typeOfCard,
		};
		try {
			const response = await fetch(`${api}/cartao/criar/${typeOfCard}`, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
					Authorization: token,
				},
				body: JSON.stringify(requestBody),
			});
			if (response.ok) {
				const cartao = await response.json();
				toast.success('Cartão criado com sucesso!');
				setCartoes([...cartoes, cartao]);
			} else {
				console.log('Um erro foi encontrado');
				console.log(cartoes);
			}
		} catch (error) {
			console.log(error);
		}
	};

	// Listar Cartões
	const cardsList = async () => {
		try {
			const response = await fetch(`${api}/cartao/listarDaConta`, {
				method: 'GET',
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
			});
			if (response.ok) {
				const arrayCartões = await response.json();
				return arrayCartões;
			} else {
				console.log('Um erro foi encontrado');
				return [];
			}
		} catch (error) {
			console.log('Um erro foi encontrado', error);
			return [];
		}
	};

	// Deletar Cartao
	const deleteCard = async (numeroCartao: number) => {
		try {
			const response = await fetch(`${api}/cartao/${numeroCartao}`, {
				method: 'DELETE',
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
			});

			if (response.ok) {
				console.log('funcionou');
				setCartoes(
					cartoes.filter(cartao => cartao.numeroCartao !== numeroCartao)
				);
				toast.success('Cartão removido com sucesso!');
			} else {
				console.log('Não foi possível remover o cartão.');
			}
		} catch (error) {
			console.log('Um erro foi encontrado', error);
		}
	};

	// Atualizar Cartão
	const updateCard = async (numeroCartao: number, updatedCardData: ICartao) => {
		try {
			const response = await fetch(`${api}/cartao/${numeroCartao}`, {
				method: 'PUT',
				headers: {
					'Content-type': 'application/json',
					Authorization: token,
				},
				body: JSON.stringify(updatedCardData),
			});
			if (response.ok) {
				const updatedCard = await response.json();
				const updatedCards = cartoes.map(card =>
					card.numeroCartao === updatedCard.numeroCartao ? updatedCard : card
				);
				setCartoes(updatedCards);
			} else {
				console.log('Um erro foi encontrado');
				console.log(cartoes);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const addCompra = async (
		numeroCartao: number,
		codigoSeguranca: number,
		valor: number
	) => {
		try {
			const response = await fetch(`${api}/cartao/pagar?valor=${valor}`, {
				method: 'PUT',
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ numeroCartao, codigoSeguranca }),
			});

			if (response.ok) {
				toast.success('A conta foi paga com sucesso!');
			} else {
				toast.error('Erro ao pagar a compra.');
			}
		} catch (error) {
			console.log('Um erro foi encontrado', error);
		}
	};

	return (
		<CardContext.Provider
			value={{
				createCard,
				cardsList,
				cartoes,
				deleteCard,
				updateCard,
				addCompra,
			}}
		>
			{children}
		</CardContext.Provider>
	);
};
