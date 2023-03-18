import React from 'react';
import styles from './Register.module.scss';
import registerImg from '../../assets/register-image.svg';
import Inputs from '../../components/InputComponents/Inputs';
import Buttons from '../../components/ButtonComponents/Buttons';
import seasLogo from '../../assets/seas-logo.svg';
import { useState } from 'react';

const Register: React.FC = () => {
	const [userName, setUserName] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const [userCpf, setUserCpf] = useState('');
	const [userCep, setUserCep] = useState('');
	const [userLogradouro, setUserLogradouro] = useState('');
	const [userBairro, setUserBairro] = useState('');
	const [userLocalidade, setUserLocalidade] = useState('');
	const [userUF, setUserUF] = useState('');
	const [userNumero, setUserNumero] = useState('');
	const [userSenha, setUserSenha] = useState('');

	// 	<input
	// 	className={styles.inputsDefaultStyle}
	// 	name={inputName}
	// 	type={inputType}
	// 	placeholder={placeholderText}
	// 	required={isRequired}
	// 	value={valueInput}
	// 	onChange={(e) => handleChange(e.target.value)}
	// />
	// <Inputs
	// 					inputName="cpf"
	// 					inputType="number"
	// 					isRequired
	// 					placeholderText="CPF"
	// 					valueInput={userCpf}
	// 					handleChange={currentValue => setUserCpf(currentValue)}
	// 				/>

	return (
		<div className={styles.registerContainerPage}>
			<div className={styles.registerContainer}>
				<div className={styles.registerHeader}>
					<img src={seasLogo} alt="logo do SeasBank" />
					<h1>SeasBank</h1>
				</div>

				<form className={styles.formContainer}>
					<Inputs
						inputName="nome"
						inputType="text"
						placeholderText="Digite seu nome completo"
						valueInput={userName}
						isRequired
						handleChange={e => setUserName(e)}
					/>
					<Inputs
						inputName="email"
						inputType="email"
						placeholderText="Digite seu email"
						valueInput={userEmail}
						isRequired
						handleChange={e => setUserEmail(e)}
					/>
					<Inputs
						inputName="cpf"
						inputType="number"
						placeholderText="Digite seu CPF"
						valueInput={userCpf}
						isRequired
						handleChange={e => setUserCpf(e)}
					/>
					<div className={styles.cepContainer}>
						<Inputs
							inputName="cep"
							inputType="number"
							placeholderText="CEP"
							valueInput={userCep}
							isRequired
							handleChange={e => setUserCep(e)}
						/>
						<Inputs
							inputName="logradouro"
							inputType="text"
							placeholderText="Logradouro"
							valueInput={userLogradouro}
							isRequired
							handleChange={e => setUserLogradouro(e)}
						/>
					</div>
					<div className={styles.cepContainer}>
						<Inputs
							inputName="bairro"
							inputType="text"
							placeholderText="Bairro"
							valueInput={userBairro}
							isRequired
							handleChange={e => setUserBairro(e)}
						/>
						<Inputs
							inputName="localidade"
							inputType="text"
							placeholderText="Localidade"
							valueInput={userLocalidade}
							isRequired
							handleChange={e => setUserLocalidade(e)}
						/>
					</div>
					<div className={styles.cepContainer}>
						<Inputs
							inputName="UF"
							inputType="text"
							placeholderText="UF"
							valueInput={userUF}
							isRequired
							handleChange={e => setUserUF(e)}
						/>
						<Inputs
							inputName="localidade"
							inputType="text"
							placeholderText="Localidade"
							valueInput={userLocalidade}
							isRequired
							handleChange={e => setUserLocalidade(e)}
						/>
					</div>
					<Inputs
						inputName="numero"
						inputType="number"
						placeholderText="Número de celular"
						valueInput={userNumero}
						isRequired
						handleChange={e => setUserNumero(e)}
					/>
					<Inputs
						inputName="senha"
						inputType="password"
						placeholderText="Senhha"
						valueInput={userSenha}
						isRequired
						handleChange={e => setUserSenha(e)}
					/>
					<Buttons text="Entrar" name="primary" />
				</form>
			</div>
			<div className={styles.imgContainer}>
				<img
					src={registerImg}
					alt="imagem de um personagem cartunizado mexendo em um computadorimagem de um personagem cartunizado mexendo em um computador"
				/>
			</div>
		</div>
	);
};

export default Register;
