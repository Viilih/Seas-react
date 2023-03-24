import React, { useState, useContext, useEffect } from 'react';

import { useForm } from 'react-hook-form';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './UserInfo.module.scss';
import PlanSelected from '../../components/PlanSelected/PlanSelected';
import Card from '../../components/Card/Card';
import { CardContext } from '../../context/CardContext';
import Inputs, { CepInputs } from '../../components/InputComponents/Inputs';
import { UserContext } from '../../context/UserContext';

export const UserAddress = () => {
	const { createAddress } = useContext(UserContext);

	const [userCep, setUserCep] = useState('');
	const [userLogradouro, setUserLogradouro] = useState('');
	const [userBairro, setUserBairro] = useState('');
	const [userLocalidade, setUserLocalidade] = useState('');
	const [userNumberResidence, setUserNumberResidence] = useState(0);
	const [userUF, setUserUF] = useState('');
	const [userComplemento, setUserComplemento] = useState('');
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const cepRegex = `[0-9]{8}`;
	const numRegex = `[0-9]{1-5}`;

	const onSubmit = (data: any) => {
		createAddress(data);
		console.log(data);
	};

	const buscarCep = async (cep: string) => {
		try {
			const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
			const data = await response.json();
			if (data.erro === true) {
				alert('Desculpe, não conseguimos encontrar o endereço');
			} else {
				setUserLogradouro(data.logradouro);
				setUserBairro(data.bairro);
				setUserLocalidade(data.localidade);
				setUserUF(data.uf);
			}
		} catch (error) {
			alert('Tente novamente!');
		}
	};
	const cep = watch('cep');

	return (
		<>
			<div className={styles.container}>
				<h3>Adicione os dados do seu endereço</h3>
				<form onSubmit={handleSubmit(onSubmit)}>
					{/* register your input into the hook by invoking the "register" function */}
					<div className={styles.cepContainer}>
						<input
							id="cep"
							type="text"
							placeholder="CEP"
							{...register('cep')}
							maxLength={8}
							pattern={cepRegex}
						/>
						<input
							id="logradouro"
							type="text"
							{...register('logradouro')}
							placeholder="Logradouro"
							onChange={e => setUserLogradouro(e.target.value)}
						/>
					</div>
					<div className={styles.cepContainer}>
						<input
							id="pais"
							type="text"
							placeholder="País"
							onChange={() => {}}
						/>
						<input
							id="cidade"
							{...register('cidade')}
							type="text"
							placeholder="Cidade"
							onChange={e => setUserLocalidade(e.target.value)}
						/>
					</div>
					<div className={styles.cepContainer}>
						<input
							id="estado"
							type="text"
							{...register('estado')}
							placeholder="UF"
							onChange={e => setUserUF(e.target.value)}
						/>
						<input
							id="complemento"
							{...register('complemento')}
							type="text"
							placeholder="Complemento"
							onChange={e => setUserComplemento(e.target.value)}
						/>
					</div>
					<input
						id="numero"
						{...(register('numero'),
						{ required: true, setValueAs: (value: string) => parseInt(value) })}
						type="number"
						placeholder="Número de residência"
						maxLength={5}
						pattern={numRegex}
					/>
					<input type="submit" value="Cadastrar" />
				</form>
			</div>
		</>
	);
};
