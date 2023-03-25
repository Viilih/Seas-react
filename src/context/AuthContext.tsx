import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../utils/api';
import { IChildren, IConta } from '../utils/interfaces';

interface IAuthContext {
  createNewUser: (userData: any) => Promise<void>;
  authenticateUser: (login: string, senha: string) => Promise<void>;
  getUserInfo: () => Promise<IConta[] | any>;
  token: string;
}
export const AuthContext = createContext({} as IAuthContext);

export const AuthProvider = ({ children }: IChildren) => {
  const [token, setToken] = useState<string>(
    localStorage.getItem('token') || ''
  );

  const navigate = useNavigate();

  const authenticateUser = async (login: string, senha: string) => {
    try {
      const response = await fetch(`${api}/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, senha }),
      });
      console.log(response);
      if (response.ok) {
        const token = await response.text();
        localStorage.setItem('token', token);
        setToken(token);

        navigate('/dashboard');
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createNewUser = async (userData: any) => {
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
  const getUserInfo = async () => {
    try {
      const response = await fetch(`${api}/conta`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data as IConta[];
      } else {
        console.log('erro');
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  return (
    <AuthContext.Provider
      value={{ authenticateUser, createNewUser, getUserInfo, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};
