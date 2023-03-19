import Card from "../../components/Card/Card";
import CurrencyExchange from "../../components/CurrencyExchange/CurrencyExchange";
import PlanSelected from "../../components/PlanSelected/PlanSelected";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./Dashboard.module.scss";
import Transaction from "../../components/Transaction/Transaction";
import Inputs from "../../components/InputComponents/Inputs";
import { BsSearch } from "react-icons/bs";
import { useState } from "react";

const Dashboard = () => {
    const initialTransactionData = [
        {
            transactionTitle: "cinema jung",
            date: "2023-02-23",
            time: "21:15",
            category: "entertainment",
            type: "spent",
            value: "44.99",
        },
        {
            transactionTitle: "supermercado mayra",
            date: "2023-02-28",
            time: "12:00",
            category: "store",
            type: "spent",
            value: "90",
        },
        {
            transactionTitle: "supermercado Pablo",
            date: "2023-02-28;",
            time: "09:00",
            category: "store",
            type: "spent",
            value: "200",
        },
        {
            transactionTitle: "pix lucas amaral",
            date: "2023-02-28;",
            time: "10:00",
            category: "transference",
            type: "income",
            value: "25",
        },
        {
            transactionTitle: "dog do maicon",
            date: "2023-02-28",
            time: "21:15",
            category: "entertainment",
            type: "spent",
            value: "60",
        },
        {
            transactionTitle: "salario dbc",
            date: "2023-03-01",
            time: "08:00",
            category: "entertainment",
            type: "income",
            value: "800",
        },
        {
            transactionTitle: "informatica da cris",
            date: "2023-03-01",
            time: "17:00",
            category: "store",
            type: "income",
            value: "90",
        },
        {
            transactionTitle: "restaurante do rafa",
            date: "2023-03-01",
            time: "12:00",
            category: "store",
            type: "spent",
            value: "70",
        },
        {
            transactionTitle: "lojas renner",
            date: "2023-03-01",
            time: "20:00",
            category: "food",
            type: "spent",
            value: "70",
        },
        {
            transactionTitle: "pix do alisson",
            date: "2023-03-02",
            time: "10:00",
            category: "transference",
            type: "income",
            value: "15",
        },
    ];

    const [transactionData, setTransactionData] = useState(
        initialTransactionData
    );

    const [searchBarText, setSearchBarText] = useState("");
    const [btnEntryState, setBtnEntryState] = useState(false);
    const [btnSpentState, setBtnSpentState] = useState(false);
    const [btnAllState, setBtnAllState] = useState(false);

    return (
        <>
            <Sidebar />
            <header className={styles.header}>
                <CurrencyExchange />
            </header>
            <div className={styles.dashboardContainer}>
                <div className={styles.userCardAndBalance}>
                    <div className={styles.userBalance}>
                        <h2>Olá, Rafael Ramos</h2>
                        <div className={styles.cardBalanceInfo}>
                            <h3>Saldo em conta</h3>
                            <div className={styles.line}></div>
                            <strong>R$ 1.500,00</strong>
                        </div>
                    </div>
                    <div className={styles.userCardDashboard}>
                        <PlanSelected plan="platinum" title="Meu Seas" />
                        <Card
                            cardNumber={2222222222222}
                            holderName="Rafael Ramos"
                            expiration="02/02"
                            dataType="platinum"
                        />
                    </div>
                </div>

                <div className={styles.searchBarContainer}>
                    <h2>Faça a sua busca!</h2>

                    <form className={styles.searchBar}>
                        <div className={styles.inputContainer}>
                            <Inputs
                                inputName="inputSearchBar"
                                inputType="text"
                                isRequired
                                placeholderText="Busque por uma transação"
                                valueInput={searchBarText}
                                handleChange={(currentValue) => {
                                    setSearchBarText(currentValue);

                                    if (searchBarText != "") {
                                        setTransactionData(
                                            initialTransactionData.filter(
                                                (transaction) => {
                                                    if (
                                                        transaction.transactionTitle.match(
                                                            searchBarText
                                                        )
                                                    )
                                                        return transaction;
                                                }
                                            )
                                        );
                                    } else {
                                        setTransactionData(
                                            initialTransactionData
                                        );
                                    }
                                }}
                            />
                        </div>
                        <button className={styles.searchIconContainer}>
                            <BsSearch size={30} color="fff" />
                        </button>
                    </form>
                </div>

                <div className={styles.transactionsContainer}>
                    <div className={styles.transactionHeader}>
                        <h2>Suas Transações</h2>
                        <div>
                            <button
                                onClick={() => {
                                    setBtnEntryState(!btnEntryState);
                                    setBtnAllState(false);
                                    setBtnSpentState(false);

                                    if (!btnEntryState) {
                                        setTransactionData(
                                            initialTransactionData.filter(
                                                (transaction) => {
                                                    if (
                                                        transaction.type ===
                                                        "income"
                                                    )
                                                        return transaction;
                                                }
                                            )
                                        );
                                    } else {
                                        setTransactionData(
                                            initialTransactionData
                                        );
                                    }
                                }}
                                data-active={btnEntryState}
                            >
                                Entradas
                            </button>
                            <button
                                onClick={() => {
                                    setBtnEntryState(false);
                                    setBtnAllState(false);
                                    setBtnSpentState(!btnSpentState);

                                    setTransactionData(initialTransactionData);

                                    if (!btnSpentState) {
                                        setTransactionData(
                                            initialTransactionData.filter(
                                                (transaction) => {
                                                    if (
                                                        transaction.type ===
                                                        "spent"
                                                    )
                                                        return transaction;
                                                }
                                            )
                                        );
                                    } else {
                                        setTransactionData(
                                            initialTransactionData
                                        );
                                    }
                                }}
                                data-active={btnSpentState}
                            >
                                Saídas
                            </button>
                            <button
                                onClick={() => {
                                    setBtnEntryState(false);
                                    setBtnAllState(!btnAllState);
                                    setBtnSpentState(false);

                                    setTransactionData(initialTransactionData);

                                    if (!btnAllState) {
                                        setTransactionData(
                                            initialTransactionData
                                        );
                                    }
                                }}
                                data-active={btnAllState}
                            >
                                all
                            </button>
                        </div>
                    </div>
                    <div className={styles.transactions}>
                        {transactionData.map((transaction) => {
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
