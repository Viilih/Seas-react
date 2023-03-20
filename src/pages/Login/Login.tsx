import Inputs from "../../components/InputComponents/Inputs";
import styles from "./Login.module.scss";
import { FormEvent, useState } from "react";

import seasLogo from "../../assets/seas-logo.svg";
import loginImg from "../../assets/login-img.png";
import {
  ButtonLink,
  ButtonSubmit,
} from "../../components/ButtonComponents/Buttons";

const Login: React.FC = () => {
  const [userCpf, setUserCpf] = useState("");
  const cpfRegex = `[0-9]{11}`;

  const [userPassword, setUserPassword] = useState("");
  const [toDashboard, setToDashboard] = useState(false);

  const loginValidation = (cpf: string, password: string) => {
    const localStorageUser = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(localStorageUser || "[]");

    const userCredentials = userInfo.map(
      (user: { CPF: string; Senha: string; Nome: string }) => ({
        cpf: user.CPF,
        senha: user.Senha,
        name: user.Nome,
      })
    );

    const currentUser = userCredentials.find(
      (user: { cpf: string; senha: string }) =>
        user.cpf === cpf && user.senha === password
    );

    if (currentUser) {
      setToDashboard(true);
    } else {
      alert(
        "Usuário não encontrado. Verifique os dados inseridos e tente novamente."
      );
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Enviado", `CPF: ${userCpf}`, `Senha: ${userPassword}`);
    loginValidation(userCpf, userPassword);
  };

  return (
    <div className={styles.loginContainerPage}>
      {toDashboard ? (
        (window.location.href = "/")
      ) : (
        <>
          <div className={styles.loginContainer}>
            <div className={styles.loginHeader}>
              <img src={seasLogo} alt="Logo do SeasBank" />
              <h1>Seja bem-vindo!</h1>
            </div>

            <form className={styles.formContainer} onSubmit={handleSubmit}>
              <Inputs
                inputName="cpf"
                inputType="text"
                dataTestid="cpf"
                isRequired
                placeholderText="CPF (somente números)"
                valueInput={userCpf}
                handleChange={(currentValue) => setUserCpf(currentValue)}
                inputPattern={cpfRegex}
                inputMinLength={11}
                inputMaxLength={11}
              />
              <Inputs
                inputName="inputPassword"
                inputType="password"
                dataTestid="password"
                isRequired
                placeholderText="Senha"
                valueInput={userPassword}
                handleChange={(currentValue) => setUserPassword(currentValue)}
                inputMinLength={6}
              />

              <span>Esqueci minha senha</span>

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
