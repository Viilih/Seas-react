import Card from '../../components/Card/Card';
import CurrencyExchange from '../../components/CurrencyExchange/CurrencyExchange';
import PlanSelected from '../../components/PlanSelected/PlanSelected';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './Dashboard.module.scss';
import Transaction from '../../components/Transaction/Transaction';
import Inputs from '../../components/InputComponents/Inputs';
import { BsSearch } from 'react-icons/bs';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { CardContext } from '../../context/CardContext';
import { ICartao, IConta } from '../../utils/interfaces';
import { info } from 'console';
import { ButtonSubmit } from '../../components/ButtonComponents/Buttons';
import { EconomicContext } from '../../context/EconomicContext';
import TransferForm from '../Transferencia/Transferencia';
import TransferList from '../Transferencia/ListTransaction';

const Dashboard: React.FC = () => {
	const initialTransactionData = [
		{
			transactionTitle: 'cinema jung',
			date: '2023-02-23',
			time: '21:15',
			category: 'entertainment',
			type: 'spent',
			value: '44.99',
		},
		{
			transactionTitle: 'supermercado mayra',
			date: '2023-02-28',
			time: '12:00',
			category: 'store',
			type: 'spent',
			value: '90',
		},
		{
			transactionTitle: 'supermercado Pablo',
			date: '2023-02-28;',
			time: '09:00',
			category: 'store',
			type: 'spent',
			value: '200',
		},
		{
			transactionTitle: 'pix lucas amaral',
			date: '2023-02-28',
			time: '10:00',
			category: 'transference',
			type: 'income',
			value: '25',
		},
		{
			transactionTitle: 'dog do maicon',
			date: '2023-02-28',
			time: '21:15',
			category: 'entertainment',
			type: 'spent',
			value: '60',
		},
		{
			transactionTitle: 'salario dbc',
			date: '2023-03-01',
			time: '08:00',
			category: 'entertainment',
			type: 'income',
			value: '800',
		},
		{
			transactionTitle: 'informatica da cris',
			date: '2023-03-01',
			time: '17:00',
			category: 'store',
			type: 'income',
			value: '90',
		},
		{
			transactionTitle: 'restaurante do rafa',
			date: '2023-03-01',
			time: '12:00',
			category: 'store',
			type: 'spent',
			value: '70',
		},
		{
			transactionTitle: 'lojas renner',
			date: '2023-03-01',
			time: '20:00',
			category: 'food',
			type: 'spent',
			value: '70',
		},
		{
			transactionTitle: 'pix do alisson',
			date: '2023-03-02',
			time: '10:00',
			category: 'transference',
			type: 'income',
			value: '15',
		},
	];

	const [transactionData, setTransactionData] = useState(
		initialTransactionData
	);

	const [searchBarText, setSearchBarText] = useState('');
	const [btnEntryState, setBtnEntryState] = useState(false);
	const [btnSpentState, setBtnSpentState] = useState(false);
	const [btnTransferenceState, setBtnTransferenceState] = useState(false);
	const [btnAllState, setBtnAllState] = useState(false);

	const { getUserInfo, withdraw, deposit } = useContext(AuthContext);
	const [infoUser, setInfoUser] = useState<IConta | undefined>();
	const [isLoading, setIsLoading] = useState(true);

	const { cardsList } = useContext(CardContext);
	const [cards, setCards] = useState<ICartao[]>([]);

	const [depositValue, setDepositValue] = useState(0);
	const [showDeposit, setShowDeposit] = useState(false);

	const [withdrawValue, setWithdrawValue] = useState(0);
	const [showWithdraw, setShowWithdraw] = useState(false);

	const { getTransactions } = useContext(EconomicContext);
	const [transactions, setTransactions] = useState<[]>([]);

	const [isTransferFormOpen, setIsTransferFormOpen] = useState(false);
	const [isTransferListOpen, setIsTransferListOpen] = useState(false);

	const handleOpenTransferForm = () => {
		setIsTransferFormOpen(true);
	};

	const handleCloseTransferForm = () => {
		setIsTransferFormOpen(false);
	};
	const handleOpenTransferList = () => {
		setIsTransferListOpen(true);
	};

	const handleCloseTransferList = () => {
		setIsTransferListOpen(false);
	};

	const handleTransaction = async () => {
		const data = await getTransactions();
		setTransactions(data);
	};

	const handleDeposit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setShowDeposit(!showDeposit);
	};
	const handleWithDraw = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setShowWithdraw(!showWithdraw);
	};

	const toggleDeposit = () => {
		setShowDeposit(!showDeposit);
	};

	const toggleWithdraw = () => {
		setShowWithdraw(!showWithdraw);
	};

	// Listar informação do cartão
	useEffect(() => {
		const fetchCards = async () => {
			const cards: any = await cardsList();
			setCards(cards);
		};

		fetchCards();
	}, []);

	//Listar as informações;

	useEffect(() => {
		const fetchUsers = async () => {
			const data = await getUserInfo();
			setInfoUser(data);
		};
		fetchUsers();
	}, [getUserInfo]);
	const personalData = infoUser?.cliente;
	return (
		<>
			<Sidebar />
			<header className={styles.header}>
				<CurrencyExchange />
			</header>
			<div className={styles.dashboardContainer}>
				<div className={styles.userCardAndBalance}>
					<div className={styles.userBalance}>
						<h1>Olá, {personalData?.nome}</h1>
						<div className={styles.cardBalanceInfo}>
							<h3>Saldo em conta</h3>
							<div className={styles.line}></div>

							<strong>
								{infoUser?.saldo
									? `${infoUser.saldo.toLocaleString('pt-BR', {
											style: 'currency',
											currency: 'BRL',
									  })}`
									: '0,00'}
							</strong>
						</div>
						<div className={styles.btnContainer}>
							<button className={styles.btn} onClick={toggleDeposit}>
								<span>Realizar depósito</span>
								{/* <a href="/dashboard/card">Gerenciar Informações</a> */}
							</button>
							<button className={styles.btn} onClick={toggleWithdraw}>
								<span>Realizar saque</span>
								{/* <a href="/dashboard/card">Gerenciar Informações</a> */}
							</button>
						</div>
						{showDeposit ? (
							<div className={styles.deposit}>
								<form onSubmit={e => handleDeposit(e)}>
									<h4>Informe um valor para ser depositado em conta:</h4>
									<Inputs
										inputName="inputDepositValue"
										inputType="number"
										isRequired
										placeholderText="valor"
										valueInput={depositValue}
										handleChange={currentValue => {
											if (Number(currentValue) >= 0) {
												setDepositValue(Number(currentValue));
											}
										}}
									/>
									<ButtonSubmit
										name="secondary"
										text="Depositar valor"
										btnType={'submit'}
										onClick={() => {
											deposit(depositValue);
											console.log('Botão clicado');
										}}
									/>
								</form>
							</div>
						) : null}
						{showWithdraw ? (
							<div className={styles.deposit}>
								<form action="" onSubmit={e => handleWithDraw(e)}>
									<h4>Informe um valor para ser sacado da conta:</h4>
									<Inputs
										inputName="inputWithdrawValue"
										inputType="number"
										isRequired
										placeholderText="Informe o valor que deseja sacar"
										valueInput={withdrawValue}
										handleChange={currentValue => {
											if (Number(currentValue) >= 0) {
												setWithdrawValue(Number(currentValue));
											}
										}}
									/>
									<ButtonSubmit
										name="secondary"
										text="Sacar valor"
										btnType={'submit'}
										onClick={() => {
											withdraw(withdrawValue);
											console.log('Botão clicado');
										}}
									/>
								</form>
							</div>
						) : null}
					</div>

					<div className={styles.transferencesContainer}>
						<h1>Acompanhe suas transferências!</h1>
						<button onClick={handleOpenTransferList}>
							Listar transferências!
						</button>
						<TransferList
							isOpen={isTransferListOpen}
							onRequestClose={handleCloseTransferList}
						/>
						<button onClick={handleOpenTransferForm}>
							Criar transferência
						</button>
						<TransferForm
							isOpen={isTransferFormOpen}
							onRequestClose={handleCloseTransferForm}
						/>
						<ul></ul>
					</div>
					<div className={styles.userCardDashboard}>
						<PlanSelected plan="platinum" title="Meu Seas" />
						{cards && cards.length > 0 ? (
							<Card
								cardNumber={cards[0].numeroCartao}
								holderName={personalData?.nome}
								expiration={cards[0].vencimento}
								dataType="platinum"
							/>
						) : null}
					</div>
				</div>

				<div className={styles.searchBarContainer}>
					<h2>Faça a sua busca!</h2>

					<form className={styles.searchBar}>
						<div className={styles.inputContainer}>
							<Inputs
								inputName="inputSearchBar"
								inputType="text"
								dataTestid="searchbar"
								isRequired
								placeholderText="Busque por uma transação"
								valueInput={searchBarText}
								handleChange={currentValue => {
									setSearchBarText(currentValue);

									if (searchBarText != '') {
										setTransactionData(
											initialTransactionData.filter(transaction => {
												if (transaction.transactionTitle.match(searchBarText))
													return transaction;
											})
										);
									} else {
										setTransactionData(initialTransactionData);
									}
								}}
							/>
						</div>
						<button
							className={styles.searchIconContainer}
							onClick={e => {
								e.preventDefault();
								if (searchBarText != '') {
									setTransactionData(
										initialTransactionData.filter(transaction => {
											if (transaction.transactionTitle.match(searchBarText))
												return transaction;
										})
									);
								} else {
									setTransactionData(initialTransactionData);
								}
							}}
						>
							<BsSearch size={30} color="fff" />
						</button>
					</form>
				</div>

				<div className={styles.transactionsContainer}>
					<div className={styles.transactionHeader}>
						<h2>Suas Transações</h2>
						<div>
							<button>Listar transferências</button>
							<button
								data-testid="all-btn"
								onClick={() => {
									setBtnEntryState(false);
									setBtnAllState(!btnAllState);
									setBtnSpentState(false);

									setTransactionData(initialTransactionData);

									if (!btnAllState) {
										setTransactionData(initialTransactionData);
									}
								}}
								data-active={btnAllState}
							>
								All
							</button>
							<button
								data-testid="entry-btn"
								onClick={() => {
									setBtnEntryState(!btnEntryState);
									setBtnAllState(false);
									setBtnSpentState(false);

									if (!btnEntryState) {
										setTransactionData(
											initialTransactionData.filter(transaction => {
												if (transaction.type === 'income') return transaction;
											})
										);
									} else {
										setTransactionData(initialTransactionData);
									}
								}}
								data-active={btnEntryState}
							>
								Entradas
							</button>

							<button
								data-testid="spent-btn"
								onClick={() => {
									setBtnEntryState(false);
									setBtnAllState(false);
									setBtnSpentState(!btnSpentState);

									setTransactionData(initialTransactionData);

									if (!btnSpentState) {
										setTransactionData(
											initialTransactionData.filter(transaction => {
												if (transaction.type === 'spent') return transaction;
											})
										);
									} else {
										setTransactionData(initialTransactionData);
									}
								}}
								data-active={btnSpentState}
							>
								Saídas
							</button>
						</div>
					</div>
					<div
						className={styles.transactions}
						data-testid="transaction-container"
					>
						{transactionData.map(transaction => {
							return (
								<Transaction
									key={transaction.transactionTitle}
									data={transaction.date}
									nome={transaction.transactionTitle}
									dataColor={transaction.type}
									valor={parseInt(transaction.value, 10)}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
