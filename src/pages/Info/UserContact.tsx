import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import styles from './UserInfo.module.scss';
import { UserContext } from '../../context/UserContext';
import { IContact } from '../../utils/interfaces';

export const UserContact = () => {
	const { createContact } = useContext(UserContext);
	const [userEmail, setUserEmail] = useState('');
	const [userNumero, setUserNumero] = useState('');

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IContact>();

	const onSubmit = async (data: IContact) => {
		try {
			const response = await fetch(
				'http://vemser-dbc.dbccompany.com.br:39000/canovao/vemser-trabalho-final/contato',
				{
					method: 'POST',
					headers: {
						'Content-type': 'application/json',
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
						'Access-Control-Allow-Headers':
							'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
						'Access-Control-Allow-Credentials': 'true',
						'Access-Control-Max-Age': '86400',
						numeroConta: '100029',
						senha: '@Testeadmin1234',
					},
					body: JSON.stringify(data),
				}
			);
			if (response.ok) {
				const responseData = await response.json();
				console.log(responseData);
				// createContact(responseData);
			} else {
				console.log(
					'algo deu errado no cadastro de contato. Por favor, tente novamente'
				);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<div className={styles.container}>
				<h3>Adicione os dados do seu endereço</h3>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.cepContainer}>
						<input
							type="text"
							placeholder="Digite o seu email"
							id="email"
							{...register('email', { required: true })}
						/>

						<input
							type="string"
							placeholder="Digite o seu telefone"
							id="telefone"
							{...register('telefone', { required: true })}
						/>
					</div>
					<input type="submit" value="Cadastrar" />
				</form>
			</div>
		</>
	);
};
