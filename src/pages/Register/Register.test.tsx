import { render, screen, fireEvent } from "@testing-library/react";

import user from "@testing-library/user-event";
import Register from "./Register";
import fetchMock from "jest-fetch-mock";

import { fakeUser } from "../../utils/mockData";
import { ButtonSubmit } from "../../components/ButtonComponents/Buttons";

describe("Register", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });
  test("Renderizar componentes na tela", () => {
    render(<Register />);
    const nameInput = screen.getByPlaceholderText("Digite seu nome completo");
    const emailInput = screen.getByPlaceholderText("Digite seu email");
    const cpfInput = screen.getByPlaceholderText("Digite seu CPF");
    const cepInput = screen.getByPlaceholderText("CEP");
    const logradouroInput = screen.getByPlaceholderText("Logradouro");
    const bairroInput = screen.getByPlaceholderText("Bairro");
    const localidadeInput = screen.getByPlaceholderText("Localidade");
    const ufInput = screen.getByPlaceholderText("UF");
    const numeroResidenciaInput = screen.getByPlaceholderText(
      "Número de residência"
    );
    const celularInput = screen.getByPlaceholderText("Número de celular");
    const senhaInput = screen.getByPlaceholderText("Senha");

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(cpfInput).toBeInTheDocument();
    expect(cepInput).toBeInTheDocument();
    expect(logradouroInput).toBeInTheDocument();
    expect(bairroInput).toBeInTheDocument();
    expect(localidadeInput).toBeInTheDocument();
    expect(ufInput).toBeInTheDocument();
    expect(numeroResidenciaInput).toBeInTheDocument();
    expect(celularInput).toBeInTheDocument();
    expect(senhaInput).toBeInTheDocument();
  });

  // MOCKADOS :
  test("Teste para testar o handleSubmit", () => {
    fetchMock.mockResponse(JSON.stringify(fakeUser));
    render(<Register />);

    const mock = jest.fn();
    const nameInput = screen.getByPlaceholderText("Digite seu nome completo");
    const emailInput = screen.getByPlaceholderText("Digite seu email");
    const cpfInput = screen.getByPlaceholderText("Digite seu CPF");
    const cepInput = screen.getByPlaceholderText("CEP");
    const logradouroInput = screen.getByPlaceholderText("Logradouro");
    const bairroInput = screen.getByPlaceholderText("Bairro");
    const localidadeInput = screen.getByPlaceholderText("Localidade");
    const ufInput = screen.getByPlaceholderText("UF");
    const numeroResidenciaInput = screen.getByPlaceholderText(
      "Número de residência"
    );
    const celularInput = screen.getByPlaceholderText("Número de celular");
    const senhaInput = screen.getByPlaceholderText("Senha");
    const button = screen.getByTestId("btn-submit");
    user.click(nameInput);
    user.keyboard("leonardo");

    user.click(emailInput);
    user.keyboard("leonardo@astolfo.com");

    user.click(cpfInput);
    user.keyboard("02513703552");
    user.click(cepInput);
    user.keyboard("97573625");
    user.click(logradouroInput);
    user.keyboard("Rua Silveira Martins");
    user.click(bairroInput);
    user.keyboard("Centro");
    user.click(localidadeInput);
    user.keyboard("Santana do Livramento");
    user.click(ufInput);
    user.keyboard("RS");
    user.click(numeroResidenciaInput);
    user.keyboard("1440");
    user.click(celularInput);
    user.keyboard("55984121485");
    user.click(senhaInput);
    user.keyboard("Coxinha123@");

    user.click(button);
    expect(mock).toBeCalled();
    expect(mock).toBeCalledWith({
      nome: "vem ser",
    });
    //expect(newUser.nome).toBe("leonardo");
  });
});
