import React from "react";
import styles from "./Register.module.scss";
import registerImg from "../../assets/register-image.svg";
import Inputs from "../../components/InputComponents/Inputs";
import PlanSelected from "../../components/PlanSelected/PlanSelected";
import seasLogo from "../../assets/seas-logo.svg";
import { ButtonSubmit } from "../../components/ButtonComponents/Buttons";
import { useState } from "react";
import { CepInputs } from "../../components/InputComponents/Inputs";

const Register: React.FC = () => {
    const initialUserInfo = [
        {
            Nome: "Rafael Ramos",
            Email: "rafaelramos@email.com",
            CPF: "03517883018",
            CEP: "94045160",
            Logradouro: "Av. Presidente Kenedy",
            Bairro: "Marrocos",
            Localidade: "Gravataí",
            UF: "RS",
            Número: "646",
            Senha: "1R2a3f4a@",
        },
    ];

    const [userInfo, setUserInfo] = useState(initialUserInfo);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userCpf, setUserCpf] = useState("");
    const [userCep, setUserCep] = useState("");
    const [userLogradouro, setUserLogradouro] = useState("");
    const [userBairro, setUserBairro] = useState("");
    const [userLocalidade, setUserLocalidade] = useState("");
    const [userNumberResidence, setUserNumberResidence] = useState("");
    const [userUF, setUserUF] = useState("");
    const [userNumero, setUserNumero] = useState("");
    const [userSenha, setUserSenha] = useState("");

    const cpfRegex = `[0-9]{11}`;
    const cepRegex = `[0-9]{8}`;
    const numRegex = `[0-9]{1-5}`;
    const passwordRegex = `^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$`;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // setUserInfo(
        //         userName,
        //         userEmail,
        //         userCpf,
        //         userCep,
        //         userLogradouro,
        //         userBairro,
        //         userLocalidade,
        //          userUF,
        //         userNumero,
        //         userSenha);

        console.log(userInfo);
        // localStorage.setItem("user", userInfo);
    };

    const buscarCep = (cep: string) => {
        fetch(`https:viacep.com.br/ws/${cep}/json/`)
            .then((response) => response.json())
            .then((data) => {
                if (data.erro) {
                    alert("Desculpe, não conseguimos encontrar o endereço");
                } else {
                    console.log(data);

                    setUserLogradouro(data.logradouro);
                    setUserBairro(data.bairro);
                    setUserLocalidade(data.localidade);
                    setUserUF(data.uf);
                }
            })
            .catch((error) => {
                console.error(error);
                alert("Tente novamente!");
                return;
            });
    };

    return (
        <div className={styles.registerContainerPage}>
            <div className={styles.registerContainer}>
                <div className={styles.registerHeader}>
                    <div className={styles.cardSelectedContainer}>
                        <PlanSelected
                            plan="platinum"
                            title="Você selecionou:"
                        />
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
                        handleChange={(currentValue) =>
                            setUserName(currentValue)
                        }
                    />
                    <Inputs
                        inputName="email"
                        inputType="email"
                        placeholderText="Digite seu email"
                        valueInput={userEmail}
                        isRequired
                        handleChange={(currentValue) =>
                            setUserEmail(currentValue)
                        }
                    />
                    <Inputs
                        inputName="cpf"
                        inputType="text"
                        inputMaxLength={11}
                        placeholderText="Digite seu CPF"
                        valueInput={userCpf}
                        isRequired
                        handleChange={(currentValue) =>
                            setUserCpf(currentValue)
                        }
                        inputPattern={cpfRegex}
                    />
                    <div className={styles.cepContainer}>
                        <CepInputs
                            inputName="cep"
                            inputType="text"
                            placeholderText="CEP"
                            valueInput={userCep}
                            isRequired
                            handleChange={(currentValue) =>
                                setUserCep(currentValue)
                            }
                            handleBlur={(cep) => buscarCep(cep)}
                            inputMaxLength={8}
                            inputPattern={cepRegex}
                        />
                        <Inputs
                            inputName="logradouro"
                            inputType="text"
                            placeholderText="Logradouro"
                            valueInput={userLogradouro}
                            isRequired
                            handleChange={(currentValue) =>
                                setUserLogradouro(currentValue)
                            }
                        />
                    </div>
                    <div className={styles.cepContainer}>
                        <Inputs
                            inputName="bairro"
                            inputType="text"
                            placeholderText="Bairro"
                            valueInput={userBairro}
                            isRequired
                            handleChange={(currentValue) =>
                                setUserBairro(currentValue)
                            }
                        />
                        <Inputs
                            inputName="localidade"
                            inputType="text"
                            placeholderText="Localidade"
                            valueInput={userLocalidade}
                            isRequired
                            handleChange={(currentValue) =>
                                setUserLocalidade(currentValue)
                            }
                        />
                    </div>
                    <div className={styles.cepContainer}>
                        <Inputs
                            inputName="UF"
                            inputType="text"
                            placeholderText="UF"
                            valueInput={userUF}
                            isRequired
                            handleChange={(currentValue) =>
                                setUserUF(currentValue)
                            }
                        />
                        <Inputs
                            inputName="numero-residencia"
                            inputType="text"
                            placeholderText="Número de residência"
                            valueInput={userNumberResidence}
                            isRequired
                            inputMaxLength={5}
                            inputPattern={numRegex}
                            handleChange={(currentValue) =>
                                setUserNumberResidence(currentValue)
                            }
                        />
                    </div>
                    <Inputs
                        inputName="numero"
                        inputType="text"
                        placeholderText="Número de celular"
                        valueInput={userNumero}
                        isRequired
                        inputMaxLength={14}
                        handleChange={(currentValue) =>
                            setUserNumero(currentValue)
                        }
                    />
                    <Inputs
                        inputName="senha"
                        inputType="text"
                        placeholderText="Senha"
                        valueInput={userSenha}
                        isRequired
                        handleChange={(currentValue) =>
                            setUserSenha(currentValue)
                        }
                        inputMaxLength={10}
                        inputPattern={passwordRegex}
                    />

                    <span className={styles.passwordOrientationText}>
                        Pelo menos 8 caracteres contendo: Uma letra maiúscula,
                        uma minúscula, um número e um caractere especial
                    </span>
                    <ButtonSubmit
                        text="Entrar"
                        name="primary"
                        btnType="submit"
                    />
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
