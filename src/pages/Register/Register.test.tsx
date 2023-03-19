import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Register from './Register';
import fetchMock from 'jest-fetch-mock';

import { fakeUser } from '../../utils/mockData';

describe('Register', () => {
	beforeEach(() => {
		fetchMock.resetMocks();
	});
	test('Renderizar componentes na tela', () => {
		render(<Register />);
		const nameInput = screen.getByPlaceholderText('Digite seu nome completo');
		const emailInput = screen.getByPlaceholderText('Digite seu email');
		const cpfInput = screen.getByPlaceholderText('Digite seu CPF');
		const cepInput = screen.getByPlaceholderText('CEP');
		const logradouroInput = screen.getByPlaceholderText('Logradouro');
		const bairroInput = screen.getByPlaceholderText('Bairro');
		const localidadeInput = screen.getByPlaceholderText('Localidade');
		const ufInput = screen.getByPlaceholderText('UF');
		const numeroResidenciaInput = screen.getByPlaceholderText(
			'Número de residência'
		);
		const celularInput = screen.getByPlaceholderText('Número de celular');
		const senhaInput = screen.getByPlaceholderText('Senha');

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
	test('Teste para testar o handleSubmit', () => {
		fetchMock.mockResponse(JSON.stringify(fakeUser));
		render(<Register />);
	});
});
