import React, { useContext, useState, useEffect } from 'react';
import Modal from 'react-modal';
import styles from './ListTransaction.module.scss';
import { ITransferencia } from '../../utils/interfaces';
import { EconomicContext } from '../../context/EconomicContext';

Modal.setAppElement('#root');

interface TransferListProps {
	isOpen: boolean;
	onRequestClose: () => void;
}

const TransferList = ({ isOpen, onRequestClose }: TransferListProps) => {
	const { getTransactions, getTransactionsArray } = useContext(EconomicContext);
	const [transactions, setTransactions] = useState<ITransferencia[]>([]);

	useEffect(() => {
		const fetchAddresses = async () => {
			const data = await getTransactions();
			setTransactions(data);
		};

		const timer = setTimeout(() => {
			fetchAddresses();
			console.log(getTransactionsArray);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			contentLabel="Lista de transferências"
			className={styles.transfer_list}
			overlayClassName={styles.transfer_list_overlay}
		>
			<div className={styles.header}>
				<h2 className={styles.title}>Lista de transferências</h2>
				<button className={styles.close_button} onClick={onRequestClose}>
					Fechar
				</button>
			</div>
			<table className={styles.table}>
				<thead>
					<tr>
						<th>Número da conta que enviou</th>
						<th>Número da conta que recebeu</th>
						<th>Valor</th>
					</tr>
				</thead>
				<tbody>
					{getTransactionsArray.map(transaction => (
						<tr key={transaction.idTransferencia}>
							<td>{transaction.numeroContaEnviou}</td>
							<td>{transaction.numeroContaRecebeu}</td>
							<td>R${transaction.valor},00</td>
						</tr>
					))}
				</tbody>
			</table>
		</Modal>
	);
};

export default TransferList;
