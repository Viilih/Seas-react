import Inputs from "../../components/InputComponents/Inputs";
import styles from "./Login.module.scss";
import { FormEvent, useState } from "react";

import seasLogo from "../../assets/seas-logo.svg";
import loginImg from "../../assets/login-img.png";
import {
    ButtonLink,
    ButtonSubmit,
} from "../../components/ButtonComponents/Buttons";
import { Link } from "react-router-dom";

const Login = () => {
    const [userCpf, setUserCpf] = useState("");
    const cpfRegex = `[0-9]{11}`;

    const [userPassword, setUserPassword] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log("Enviado", `CPF: ${userCpf}`, `Senha: ${userPassword}`);
        setUserCpf("");
        setUserPassword("");
    };

    return (
        <div className={styles.loginContainerPage}>
            <div className={styles.loginContainer}>
                <div className={styles.loginHeader}>
                    <img src={seasLogo} alt="Logo do SeasBank" />
                    <h1>Seja bem-vindo!</h1>
                </div>

                <form className={styles.formContainer} onSubmit={handleSubmit}>
                    <Inputs
                        inputName="cpf"
                        inputType="text"
                        isRequired
                        placeholderText="CPF (somente números)"
                        valueInput={userCpf}
                        handleChange={(currentValue) =>
                            setUserCpf(currentValue)
                        }
                        inputPattern={cpfRegex}
                        inputMinLength={11}
                        inputMaxLength={11}
                    />
                    <Inputs
                        inputName="inputPassword"
                        inputType="password"
                        isRequired
                        placeholderText="Senha"
                        valueInput={userPassword}
                        handleChange={(currentValue) =>
                            setUserPassword(currentValue)
                        }
                        inputMinLength={6}
                    />

                    <span>Esqueci minha senha</span>

                    <div className={styles.loginBtnContainer}>
                        <ButtonSubmit
                            text="Entrar"
                            name="primary"
                            btnType="submit"
                        />
                        <ButtonLink text="Abrir conta" name="secondary">
                            <Link to="/register">Abrir conta</Link>
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
        </div>
    );
};

export default Login;
