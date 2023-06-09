import React, { useContext, useEffect } from 'react';
import styles from './Register.module.scss';
import registerImg from '../../assets/register-image.svg';
import Inputs from '../../components/InputComponents/Inputs';
import PlanSelected from '../../components/PlanSelected/PlanSelected';
import seasLogo from '../../assets/seas-logo.svg';
import { ButtonSubmit } from '../../components/ButtonComponents/Buttons';
import { useState } from 'react';
import { CepInputs } from '../../components/InputComponents/Inputs';
import { UserContext } from '../../context/UserContext';
import { IRegisterData } from '../../utils/interfaces';

const Register: React.FC = () => {
	const [toDashboard, setToDashboard] = useState(false);
	const { createUser } = useContext(UserContext);
	const initialUserInfo = [
		{
			usuarioCreateDTO: {
				login: '',
				senha: '',
			},
			clienteCreateDTO: {
				nome: '',
				cpf: '',
			},
			contatoCreateDTO: {
				email: '',
				telefone: '',
			},
			enderecoCreateDTO: {
				logradouro: '',
				cidade: '',
				pais: 'Brasil',
				estado: '',
				cep: '',
				numero: 0,
			},
		},
	];
	const [userInfo, setUserInfo] = useState(initialUserInfo);

	// Busca o array userInfo do Local Storage e atualiza o estado com ele durante a montagem do componente
	useEffect(() => {
		const userInfoFromStorage = JSON.parse(
			localStorage.getItem('userInfo') || '[]'
		);
		setUserInfo(userInfoFromStorage);
	}, []);

	const [userName, setUserName] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const [userCpf, setUserCpf] = useState('');
	const [userCep, setUserCep] = useState('');
	const [userLogradouro, setUserLogradouro] = useState('');
	const [userBairro, setUserBairro] = useState('');
	const [userLocalidade, setUserLocalidade] = useState('');
	const [userNumberResidence, setUserNumberResidence] = useState('');
	const [userUF, setUserUF] = useState('');
	const [userNumero, setUserNumero] = useState('');
	const [userSenha, setUserSenha] = useState('');

	const cpfRegex = `[0-9]{11}`;
	const cepRegex = `[0-9]{8}`;
	const numRegex = `[0-9]{1-5}`;
	const passwordRegex = `^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$`;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const newUser: IRegisterData = {
			usuarioCreateDTO: {
				login: userName,
				senha: userSenha,
			},
			clienteCreateDTO: {
				nome: userName,
				cpf: userCpf,
			},
			contatoCreateDTO: {
				telefone: userNumero,
				email: userEmail,
			},
			enderecoCreateDTO: {
				logradouro: userLogradouro,
				cidade: userLocalidade,
				pais: 'Brasil',
				estado: userUF,
				cep: userCep,
				complemento: 'complemento',
				numero: Number(userNumberResidence),
			},
		};
		// Bairro: userBairro,

		// Adiciona o novo objeto ao array userInfo existente e atualiza o estado
		const updatedUserInfo = userInfo.concat(newUser);
		setUserInfo(updatedUserInfo);

		createUser(newUser);

		setToDashboard(false);
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

	return (
		<div className={styles.registerContainerPage}>
			{toDashboard ? (
				(window.location.href = '/dashboard')
			) : (
				<>
					<div className={styles.registerContainer}>
						<div className={styles.registerHeader}>
							<div className={styles.cardSelectedContainer}>
								<PlanSelected plan="platinum" title="Você selecionou:" />
							</div>
							<img src={seasLogo} alt="logo do SeasBank" />
							<h1>SeasBank</h1>
						</div>

						<form className={styles.formContainer} onSubmit={handleSubmit}>
							<Inputs
								inputName="nome"
								inputType="text"
								placeholderText="Digite seu nome completo"
								valueInput={userName}
								isRequired
								handleChange={currentValue => setUserName(currentValue)}
								dataTestid="name-input"
							/>
							<Inputs
								inputName="email"
								inputType="email"
								placeholderText="Digite seu email"
								valueInput={userEmail}
								isRequired
								handleChange={currentValue => setUserEmail(currentValue)}
								dataTestid="email-input"
							/>
							<Inputs
								inputName="cpf"
								inputType="text"
								inputMaxLength={11}
								placeholderText="Digite seu CPF"
								valueInput={userCpf}
								isRequired
								handleChange={currentValue => setUserCpf(currentValue)}
								inputPattern={cpfRegex}
								dataTestid="cpf-input"
							/>
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
							<Inputs
								inputName="senha"
								inputType="password"
								placeholderText="Senha"
								valueInput={userSenha}
								isRequired
								handleChange={currentValue => setUserSenha(currentValue)}
								inputPattern={passwordRegex}
								dataTestid="password-input"
							/>

							<span className={styles.passwordOrientationText}>
								Pelo menos 8 caracteres contendo: Uma letra maiúscula, uma
								minúscula, um número e um caractere especial
							</span>
							<ButtonSubmit
								text="Entrar"
								name="primary"
								btnType="submit"
								dataTestid="submit-btn"
							/>
						</form>
					</div>
					<div className={styles.imgContainer}>
						<img
							src={registerImg}
							alt="imagem de um personagem cartunizado mexendo em um computadorimagem de um personagem cartunizado mexendo em um computador"
						/>
					</div>
				</>
			)}
		</div>
	);
};

export default Register;
