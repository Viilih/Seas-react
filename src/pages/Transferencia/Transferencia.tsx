import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import styles from './Transferencia.module.scss';
import { ITransferencia } from '../../utils/interfaces';
import { EconomicContext } from '../../context/EconomicContext';
import { useForm } from 'react-hook-form';

Modal.setAppElement('#root'); // define o elemento principal da aplicação para acessibilidade

interface TransferFormProps {
	isOpen: boolean;
	onRequestClose: () => void;
}

const TransferForm = ({ isOpen, onRequestClose }: TransferFormProps) => {
	const { register, handleSubmit } = useForm<ITransferencia>();
	const { createTransactions } = useContext(EconomicContext);
	const [enviou, setEnviou] = useState<number | any>();
	const [recebeu, setRecebeu] = useState<number | any>();
	const [valor, setValor] = useState<number | any>();

	const onSubmit = async () => {
		try {
			await createTransactions(enviou, recebeu, valor);
			console.log();
			onRequestClose();
		} catch (error) {
			console.error(error);
			alert(
				'Ocorreu um erro ao realizar a transferência. Por favor, tente novamente.'
			);
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			contentLabel="Realizar transferência"
			className={styles['transfer-form']}
			overlayClassName={styles['transfer_overlay']}
		>
			<h2>Criar transferência</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label>
					Informe o número da sua conta:
					<input
						type="number"
						id="numeroContaRecebeu"
						onChange={e => setRecebeu(parseInt(e.target.value))}
					/>
				</label>
				<label>
					Informe o número da conta do destinatário:
					<input
						type="number"
						id="numeroContaRecebeu"
						onChange={e => setEnviou(parseInt(e.target.value))}
					/>
				</label>
				<label>
					Valor:
					<input
						type="number"
						id="valor"
						onChange={e => setValor(parseFloat(e.target.value))}
					/>
				</label>
				<button type="submit">Realizar transferência</button>
			</form>
		</Modal>
	);
};

export default TransferForm;
