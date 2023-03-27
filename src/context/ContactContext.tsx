import { createContext, useContext } from 'react';
import { api } from '../utils/api';
import { AuthContext } from './AuthContext';
import { IContact } from '../utils/interfaces';
import { toast } from 'react-toastify';

interface IContactContext {
  createContact: (newContact: any) => Promise<void>;
  getContact: () => Promise<IContact[] | undefined>;
  deleteContact: (id: number) => Promise<void>;
  updateContact: (
    updatedContact: IContact,
    id: number
  ) => Promise<IContact[] | any>;
}

export const ContactContext = createContext({} as IContactContext);

export const ContactProvider = ({ children }: any) => {
  const { token } = useContext(AuthContext);

  // Criar Contato
  const createContact = async (newContact: IContact) => {
    try {
      const response = await fetch(`${api}/contato`, {
        method: 'POST',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContact),
      });
      console.log(response);

      if (response.ok) {
        const data = await response.json();
        toast.success('Contato cadastrado com sucesso!');

        console.log(data);
      }
    } catch (error) {
      throw error;
    }
  };

  // Listar Contato
  const getContact = async () => {
    try {
      const response = await fetch(`${api}/contato/cliente`, {
        method: 'GET',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data as IContact[];
      } else {
        console.log(response);
        throw new Error(`Failed to fetch contacts: ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // Deletar Contato
  const deleteContact = async (idCliente: number) => {
    try {
      const response = await fetch(`${api}/contato/${idCliente}`, {
        method: 'DELETE',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        toast.success('Contato deletado com sucesso!');
      } else {
        toast.error('Erro ao deletar contato.');
      }
    } catch (error) {
      throw error;
    }
  };

  // Atualizar Contato
  const updateContact = async (updatedContact: IContact, id: number) => {
    try {
      const response = await fetch(`${api}/contato/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedContact),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('Contato atualizado com sucesso!');
        return data as IContact[];
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <ContactContext.Provider
      value={{ createContact, getContact, deleteContact, updateContact }}
    >
      {children}
    </ContactContext.Provider>
  );
};
