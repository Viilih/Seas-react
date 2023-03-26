import React from 'react';
import styles from './Transaction.module.scss';

interface ITransaction {
	nome: string;
	valor: number;
	data: string;
	dataColor: string;
	numeroContaEnvio?: number;
	numeroContaRecebimento?: number;
	valorTransferencia?: number;
}

const Transaction: React.FC<ITransaction> = ITransaction => {
	const valorModificado: string = ITransaction.valor.toLocaleString('pt-BR', {
		style: 'currency',
		currency: 'BRL',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});
	return (
		<>
			<div className={styles.transaction}>
				<div className={styles.nameData}>
					<div className={styles.span}></div>
					<div className={styles.name}>
						{ITransaction.nome}
						{ITransaction.numeroContaEnvio}
						<div className={styles.data}>{ITransaction.data}</div>
					</div>
				</div>
				<div className={styles.valor} data-color={ITransaction.dataColor}>
					{ITransaction.numeroContaRecebimento}
					{valorModificado}
					{ITransaction.valorTransferencia}
				</div>
			</div>
		</>
	);
};
export default Transaction;
