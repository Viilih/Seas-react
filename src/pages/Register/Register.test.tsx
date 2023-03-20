import { render, screen, fireEvent } from '@testing-library/react';

import user from '@testing-library/user-event';
import Register from './Register';
import fetchMock from 'jest-fetch-mock';

import { fakeUser } from '../../utils/mockData';
import { ButtonSubmit } from '../../components/ButtonComponents/Buttons';

describe('Register', () => {
	beforeEach(() => {
		fetchMock.resetMocks();
	});
	test('Renderizar componentes na tela', () => {
		render(<Register />);
		const nameInput = screen.getByTestId('name-input');
		const emailInput = screen.getByTestId('email-input');
		const cpfInput = screen.getByTestId('cpf-input');
		const cepInput = screen.getByTestId('cep-input');
		const logradouroInput = screen.getByTestId('log-input');
		const bairroInput = screen.getByTestId('bairro-input');
		const localidadeInput = screen.getByTestId('loc-input');
		const ufInput = screen.getByTestId('uf-input');
		const numeroResidenciaInput = screen.getByTestId('number-residence-input');
		const celularInput = screen.getByTestId('cell-number-input');
		const senhaInput = screen.getByTestId('password-input');

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

	test('Testar se a função buscar cep retorna o objeto com as informações necessárias', async () => {
		render(<Register />);
		const cep = '97573625';
		const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
		const data = await response.json();

		expect(data.logradouro).toBe('Rua Silveira Martins');
		expect(data.bairro).toBe('Centro');
		expect(data.localidade).toBe('Santana do Livramento');
		expect(data.uf).toBe('RS');
	});

	test('Testar se ao digitar um cep inválido, os valores serem undefined', async () => {
		render(<Register />);
		const cep = '13534890';
		const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
		const data = await response.json();

		expect(data.erro).toBe(true);
		expect(data.logradouro).toBe(undefined);
		expect(data.bairro).toBe(undefined);
		expect(data.localidade).toBe(undefined);
		expect(data.uf).toBe(undefined);
	});

	test('Teste para verificar se ao preencher todos os campos e clicar no botão de enviar o usuário é cadastrado', async () => {
		render(<Register />);
		const nameInput = screen.getByTestId('name-input');
		const emailInput = screen.getByTestId('email-input');
		const cpfInput = screen.getByTestId('cpf-input');
		const cepInput = screen.getByTestId('cep-input');
		const logradouroInput = screen.getByTestId('log-input');
		const bairroInput = screen.getByTestId('bairro-input');
		const localidadeInput = screen.getByTestId('loc-input');
		const ufInput = screen.getByTestId('uf-input');
		const numeroResidenciaInput = screen.getByTestId('number-residence-input');
		const celularInput = screen.getByTestId('cell-number-input');
		const senhaInput = screen.getByTestId('password-input');

		const submitButton = screen.getByTestId('submit-btn');

		user.click(nameInput);
		user.keyboard('Leonardo Astolfo');

		user.click(emailInput);
		user.keyboard('leonardo@astolfo.com');

		user.click(cpfInput);
		user.keyboard('02513703552');

		user.click(cepInput);
		user.keyboard('97573625');

		user.click(logradouroInput);
		user.keyboard('Rua Silveira Martins');

		user.click(bairroInput);
		user.keyboard('Centro');

		user.click(localidadeInput);
		user.keyboard('Santana do Livramento');

		user.click(ufInput);
		user.keyboard('RS');

		user.click(numeroResidenciaInput);
		user.keyboard('1440');

		user.click(celularInput);
		user.keyboard('55984121485');

		user.click(senhaInput);
		user.keyboard('Coxinha23@');

		fireEvent.click(submitButton);

		const userInfo = JSON.parse(localStorage.getItem('userInfo') || '[]');

		expect(userInfo).toEqual([
			{
				Nome: 'Leonardo Astolfo',
				Email: 'leonardo@astolfo.com',
				CPF: '02513703552',
				CEP: '97573625',
				Logradouro: 'Rua Silveira Martins',
				Bairro: 'Centro',
				Localidade: 'Santana do Livramento',
				UF: 'RS',
				NumeroResidencia: '1440',
				Numero: '55984121485',
				Senha: 'Coxinha23@',
			},
		]);
	});
});
