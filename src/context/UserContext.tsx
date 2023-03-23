import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { toast } from 'react-toastify';
import { toastConfig } from '../utils/ToastConfig';

interface IUserContext {
	createUser: (userData: any) => Promise<void>;
	authenticateUser: (numeroConta: string, senha: string) => Promise<void>;
}

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: any) => {
	const navigate = useNavigate();
	const createUser = async (userData: any) => {
		try {
			const response = await fetch(`${api}/conta`, {
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: JSON.stringify(userData),
			});

			if (response.ok) {
				console.log(await response.json());
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

	const authenticateUser = async (numeroConta: string, senha: string) => {
		// try {
		// 	const response = await fetch(`${api}/conta/cliente`);
		// 	console.log(response);
		// 	if (response.ok) {
		// 		console.log(response);
		// 		// if()

		// 	}
		// } catch (error) {
		// 	alert('algo deu errado no login. Por favor, tente novamente');
		// }
		navigate('/dashboard');
	};

	return (
		<UserContext.Provider value={{ createUser, authenticateUser }}>
			{children}
		</UserContext.Provider>
	);
};
