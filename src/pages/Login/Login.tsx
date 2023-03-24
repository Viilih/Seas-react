import Inputs from '../../components/InputComponents/Inputs';
import styles from './Login.module.scss';
import { FormEvent, useContext, useState } from 'react';

import seasLogo from '../../assets/seas-logo.svg';
import loginImg from '../../assets/login-img.png';
import {
	ButtonLink,
	ButtonSubmit,
} from '../../components/ButtonComponents/Buttons';
import { UserContext } from '../../context/UserContext';

const Login: React.FC = () => {
	const { authenticateUser } = useContext(UserContext);
	const [userIdAccount, setUserIdAccount] = useState('');
	const cpfRegex = `[0-9]{11}`;

	const [userPassword, setUserPassword] = useState('');
	const [toDashboard, setToDashboard] = useState(false);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		authenticateUser(Number(userIdAccount), userPassword);
	};

	return (
		<div className={styles.loginContainerPage}>
			{toDashboard ? (
				(window.location.href = '/dashboard')
			) : (
				<>
					<div className={styles.loginContainer}>
						<div className={styles.loginHeader}>
							<img src={seasLogo} alt="Logo do SeasBank" />
							<h1>Seja bem-vindo!</h1>
						</div>

						<form className={styles.formContainer} onSubmit={handleSubmit}>
							<Inputs
								inputName="idAccount"
								inputType="number"
								dataTestid="cpf"
								isRequired
								placeholderText="Número da conta"
								valueInput={userIdAccount}
								handleChange={currentValue => setUserIdAccount(currentValue)}
							/>
							<Inputs
								inputName="inputPassword"
								inputType="password"
								dataTestid="password"
								isRequired
								placeholderText="Senha"
								valueInput={userPassword}
								handleChange={currentValue => setUserPassword(currentValue)}
								inputMinLength={6}
							/>
							{/* 
                            <span>Esqueci minha senha</span> */}

							<div className={styles.loginBtnContainer}>
								<ButtonSubmit
									text="Entrar"
									dataTestid="enter"
									name="primary"
									btnType="submit"
								/>
								<ButtonLink text="Abrir conta" name="secondary">
									<a href="/register">Abrir conta</a>
								</ButtonLink>
							</div>
						</form>
					</div>
					<div className={styles.loginImageContainer}>
						<img
							src={loginImg}
							alt="imagem de um personagem cartunizado mexendo em um computadorimagem de um personagem cartunizado mexendo em um computador"
						/>
					</div>
				</>
			)}
		</div>
	);
};

export default Login;
