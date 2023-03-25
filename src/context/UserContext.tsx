import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { toast } from 'react-toastify';
import { toastConfig } from '../utils/ToastConfig';
import { IAddress, IContact, IRegisterData } from '../utils/interfaces';
import { AuthContext } from './AuthContext';

interface IUserContext {
  createUser: (userData: any) => Promise<void>;
  createAddress: (newAddress: IAddress) => Promise<IAddress[] | undefined>;
  createContact: (newContact: IContact) => Promise<IContact[] | undefined>;
  getContact: (numeroConta: number, senha: string) => Promise<any>;
  getAccount: () => Promise<void>;
}

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: any) => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  // Criar Usuário
  const createUser = async (userData: IRegisterData) => {
    try {
      const response = await fetch(`${api}/conta`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        toast.success('Usuário cadastro com sucesso');
        navigate('/');
      } else {
        toast.error('Ocorreu um erro ao cadastrar o usuário. Tente novamente!');
      }
    } catch (error) {
      toast.error('Ocorreu um erro inesperado');
      console.error(error);
    }
  };

  // Listar informações do Usuário

  const getAccount = async () => {
    try {
      const response = await fetch(`${api}/conta`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Criar Endereço

  const createAddress = async (newAddress: IAddress) => {
    try {
      const response = await fetch(`${api}/endereco`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(newAddress),
      });
      if (response.ok) {
        const data = await response.json();

        toast.success('Endereço cadastrado com sucesso!');

        return data as IAddress[];
      }
    } catch (error) {
      throw error;
    }
  };

  // Listar Endereço

  const getAddress = async () => {
    try {
      const response = await fetch(`${api}/endereco,`, {
        method: 'GET',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
      }
    } catch (error) {
      throw error;
    }
  };

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

        console.log('Cadastrado com sucesso');
        return data as IContact[]; //
        // return data as IContact[];
      }
    } catch (error) {
      throw error;
    }
  };

  // Listar Contato

  const getContact = async () => {
    try {
      const response = await fetch(`${api}/contato/cliente,`, {
        method: 'GET',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{
        createUser,
        createAddress,
        createContact,
        getContact,
        getAccount,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
