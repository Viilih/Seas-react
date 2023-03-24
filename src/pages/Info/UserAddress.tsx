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
	const [userNumberResidence, setUserNumberResidence] = useState('');
	const [userUF, setUserUF] = useState('');
	const [userNumero, setUserNumero] = useState('');
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const cepRegex = `[0-9]{8}`;
	const numRegex = `[0-9]{1-5}`;

	const onSubmit = (data: any) => {
		// createAddress(data);
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
						<CepInputs
							inputName="cep"
							inputType="text"
							placeholderText="CEP"
							valueInput={userCep}
							isRequired
							handleChange={currentValue => setUserCep(currentValue)}
							handleBlur={cep => buscarCep(cep)}
							inputMaxLength={8}
							inputPattern={cepRegex}
							dataTestid="cep-input"
						/>
						<Inputs
							inputName="logradouro"
							inputType="text"
							placeholderText="Logradouro"
							valueInput={userLogradouro}
							isRequired
							handleChange={currentValue => setUserLogradouro(currentValue)}
							dataTestid="log-input"
						/>
					</div>
					<div className={styles.cepContainer}>
						<Inputs
							inputName="bairro"
							inputType="text"
							placeholderText="Bairro"
							valueInput={userBairro}
							isRequired
							handleChange={currentValue => setUserBairro(currentValue)}
							dataTestid="bairro-input"
						/>
						<Inputs
							inputName="localidade"
							inputType="text"
							placeholderText="Localidade"
							valueInput={userLocalidade}
							isRequired
							handleChange={currentValue => setUserLocalidade(currentValue)}
							dataTestid="loc-input"
						/>
					</div>
					<div className={styles.cepContainer}>
						<Inputs
							inputName="UF"
							inputType="text"
							placeholderText="UF"
							valueInput={userUF}
							isRequired
							handleChange={currentValue => setUserUF(currentValue)}
							dataTestid="uf-input"
						/>
						<Inputs
							inputName="numero-residencia"
							inputType="text"
							placeholderText="Número de residência"
							valueInput={userNumberResidence}
							isRequired
							inputMaxLength={5}
							inputPattern={numRegex}
							handleChange={currentValue =>
								setUserNumberResidence(currentValue)
							}
							dataTestid="number-residence-input"
						/>
					</div>
					<Inputs
						inputName="numero"
						inputType="text"
						placeholderText="Número de celular"
						valueInput={userNumero}
						isRequired
						inputMaxLength={14}
						handleChange={currentValue => setUserNumero(currentValue)}
						dataTestid="cell-number-input"
					/>
					<input type="submit" value="Cadastrar" />
				</form>
			</div>
		</>
	);
};
