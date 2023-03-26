import { createContext, useContext } from 'react';
import { api } from '../utils/api';
import { AuthContext } from './AuthContext';
import { IAddress } from '../utils/interfaces';
import { toast } from 'react-toastify';

interface IAddressContext {
  createAddress: (newAddress: IAddress) => Promise<IAddress[] | any>;
  getAddress: () => Promise<any>;
  deleteAddress: (id: number) => Promise<any>;
  updateAddress: (id: number, updatedAddress: IAddress) => Promise<any>;
}

export const AddressContext = createContext({} as IAddressContext);

export const AddressProvider = ({ children }: any) => {
  const { token } = useContext(AuthContext);

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
      console.log(token);

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        toast.success('Endereço cadastrado com sucesso!');
      }
    } catch (error) {
      throw error;
    }
  };

  // Listar Endereço
  const getAddress = async () => {
    try {
      const response = await fetch(`${api}/endereco/cliente`, {
        method: 'GET',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data as IAddress[];
      } else {
        console.log(response);
        throw new Error(`Failed to fetch contacts: ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // Apagar Endereço
  const deleteAddress = async (idEndereco: number) => {
    try {
      const response = await fetch(`${api}/endereco/${idEndereco}`, {
        method: 'DELETE',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        toast.success('Endereço apagado com sucesso!');
      }
    } catch (error) {
      throw error;
    }
  };

  // Atualizar Endereço
  const updateAddress = async (id: number, updatedAddress: IAddress) => {
    try {
      const response = await fetch(`${api}/endereco/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(updatedAddress),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('Endereço atualizado com sucesso!');
        return data;
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <AddressContext.Provider
      value={{ createAddress, getAddress, deleteAddress, updateAddress }}
    >
      {children}
    </AddressContext.Provider>
  );
};
