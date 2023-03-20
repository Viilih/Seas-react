import Dashboard from './Dashboard';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import user from '@testing-library/user-event';

describe('Testes da página de dashboard', () => {
	test('Verifica se o a search bar, o entryBtn, o spentBtn, allBtn, currencyContainer e transactionContainer estão no documento', () => {
		render(<Dashboard />);

		const searchBar = screen.getByTestId('searchbar');
		const entryBtn = screen.getByTestId('entry-btn');
		const spentBtn = screen.getByTestId('spent-btn');
		const allBtn = screen.getByTestId('all-btn');
		const currencyContainer = screen.getByTestId('currencies-container');
		const transactionContainer = screen.getByTestId('transaction-container');

		expect(searchBar).toBeInTheDocument();
		expect(entryBtn).toBeInTheDocument();
		expect(spentBtn).toBeInTheDocument();
		expect(allBtn).toBeInTheDocument();
		expect(currencyContainer).toBeInTheDocument();
		expect(transactionContainer).toBeInTheDocument();
	});

	test('Verifica se os valores digitados na search bar estão sendo monitorados', () => {
		render(<Dashboard />);

		const searchBar = screen.getByTestId('searchbar');
		user.click(searchBar);
		user.keyboard('Cinema');

		expect(searchBar).toHaveDisplayValue('Cinema');
	});

	test("Verifica se ao clicar no botão 'entradas' o seu estado é alterado para ativo", () => {
		render(<Dashboard />);

		const entryBtn = screen.getByTestId('entry-btn');
		fireEvent.click(entryBtn);

		expect(entryBtn).toHaveAttribute('data-active', 'true');
	});

	test("Verifica se ao clicar no botão 'Saídas' o seu estado é alterado para ativo", () => {
		render(<Dashboard />);

		const spentBtn = screen.getByTestId('spent-btn');
		fireEvent.click(spentBtn);

		expect(spentBtn).toHaveAttribute('data-active', 'true');
	});

	test("Verifica se ao clicar no botão 'All' o seu estado é alterado para ativo", () => {
		render(<Dashboard />);

		const allBtn = screen.getByTestId('all-btn');
		fireEvent.click(allBtn);

		expect(allBtn).toHaveAttribute('data-active', 'true');
	});
});
