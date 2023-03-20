import { render, screen } from '@testing-library/react';

import user from '@testing-library/user-event';
import Login from './Login';
import fetchMock from 'jest-fetch-mock';

describe('conjunto de teste do login', () => {
	beforeEach(() => {
		fetchMock.resetMocks();
	});
	test('verificar se a pagina de login renderiza', () => {
		render(<Login />);
		const cpf = screen.getByTestId('cpf');
		const password = screen.getByTestId('password');
		const button = screen.getByTestId('enter');

		expect(cpf).toBeInTheDocument();
		expect(password).toBeInTheDocument();
		expect(button).toBeInTheDocument();
	});

	test('verificar os inputs da pagina', () => {
		const jsdomAlert = window.alert; // remember the jsdom alert
		window.alert = () => {}; // provide an empty implementation for window.alert
		render(<Login />);
		const cpf = screen.getByTestId('cpf');
		const password = screen.getByTestId('password');
		const button = screen.getByTestId('enter');
		user.click(cpf);
		user.keyboard('02513703552');

		user.click(password);
		user.keyboard('Coxinha123@');

		user.click(button);

		expect(window.location.pathname).toBe('/');
		window.alert = jsdomAlert;
	});
});
