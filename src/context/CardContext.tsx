import { createContext, useContext, useState } from 'react';
import { api } from '../utils/api';
import { ICartao, IPagamento } from '../utils/interfaces';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';

interface ICardContext {
  createCard: (cardData: string) => Promise<void>;
  cardsList: () => Promise<ICartao | any>;
  cartoes: ICartao[];
  deleteCard: (numeroCartao: number) => Promise<void>;
  updateCard: (numeroCartao: number, updatedCardData: ICartao) => Promise<void>;
}

export const CardContext = createContext({} as ICardContext);

export const CardProvider = ({ children }: any) => {
  const { token } = useContext(AuthContext);

  const [cartoes, setCartoes] = useState<ICartao[]>([]);

  // Criar Cartão
  const createCard = async (typeOfCard: string) => {
    console.log(typeOfCard);
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

  // Deletar Cartao
  const deleteCard = async (numeroCartao: number) => {
    try {
      const response = await fetch(`${api}/cartao/deletar/${numeroCartao}`, {
        method: 'DELETE',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setCartoes(
          cartoes.filter((cartao) => cartao.numeroCartao !== numeroCartao)
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
        const updatedCards = cartoes.map((card) =>
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

  // const addCompra = async (newCompra: IPagamento) => {
  //   try {
  //     const response = await fetch(`${api}/cartao/compra`, {
  //       method: 'POST',
  //       headers: {
  //         Authorization: token,
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(newCompra),
  //     });

  //     if (response.ok) {
  //       toast.success('Compra adicionada com sucesso!');
  //     } else {
  //       toast.error('Erro ao adicionar compra.');
  //     }
  //   } catch (error) {
  //     console.log('Um erro foi encontrado', error);
  //   }
  // };

  return (
    <CardContext.Provider
      value={{ createCard, cardsList, cartoes, deleteCard, updateCard }}
    >
      {children}
    </CardContext.Provider>
  );
};
