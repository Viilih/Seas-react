import { createContext, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../utils/api';

export const EconomicContext = createContext({} as any);

export const EconomicProvider = ({ children }: any) => {
	const [token, setToken] = useState<string>(
		localStorage.getItem('token') || ''
	);

	const getTransactions = async () => {
		try {
			const response = await fetch(`${api}/transferencia/conta`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token,
				},
			});

			if (response.ok) {
				toast.success('Transações carregadas com sucesso!');
				const data = await response.json();
				return data;
			} else {
				toast.error('Erro ao carregar transações!');
			}
		} catch (error) {
			console.error(error);
		}
	};

	const createTransactions = async (
		numeroContaEnviou: number,
		numeroContaRecebeu: number,
		valor: number
	) => {
		try {
			const response = await fetch(`${api}/transferencia`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token,
				},
				body: JSON.stringify({ numeroContaEnviou, numeroContaRecebeu, valor }),
			});

			if (response.ok) {
				toast.success('Transferência realizada com sucesso!');
				const data = await response.json();
				return data;
			} else {
				toast.error('Erro ao realizar transferência!');
			}
		} catch (error) {
			console.error(error);
		}
	};

	const getBuys = async (numeroCartao: number) => {
		try {
			const response = await fetch(`${api}/compra/${numeroCartao}/cartao`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token,
				},
			});

			if (response.ok) {
				toast.success('Compras carregadas com sucesso!');
				const data = await response.json();
				return data;
			} else {
				toast.error('Erro ao carregar compras!');
			}
		} catch (error) {
			console.error(error);
		}
	};

	const createBuy = async (
		numeroCartao: number,
		docVendedor: string,
		itens: [{ nome: string; valor: number; quantidade: number }],
		codigoSeguranca: number
	) => {
		try {
			const response = await fetch(`${api}/compra/cartao`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token,
				},
				body: JSON.stringify({
					numeroCartao,
					docVendedor,
					itens,
					codigoSeguranca,
				}),
			});
		} catch (error) {}
	};

	const getItem = async (idCompra: number) => {
		try {
			const response = await fetch(`${api}/item/${idCompra}//compra`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token,
				},
			});
			if (response.ok) {
				toast.success('Itens carregados com sucesso!');
				const data = await response.json();
				return data;
			} else {
				toast.error('Erro ao carregar os itens!');
			}
		} catch (error) {
			console.error(error);
		}
	};
};
