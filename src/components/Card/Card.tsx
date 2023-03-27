import React from 'react';
import styles from './Card.module.scss';
import { CardContext } from '../../context/CardContext';
import { AiOutlineWifi } from 'react-icons/ai';
import { FcSimCardChip } from 'react-icons/fc';

import seasLogo from '../../assets/seas-logo.svg';

interface ICardProps {
	cardNumber: number;
	holderName: string | undefined;
	expiration: string | undefined;
	dataType: 'platinum' | 'gold' | 'silver';
}

const Card: React.FC<ICardProps> = ({
	cardNumber,
	holderName,
	expiration,
	dataType,
}) => {
	const dataExpiration = expiration ? new Date(expiration) : undefined;

	const mes = dataExpiration
		? (dataExpiration.getMonth() + 1).toString().padStart(2, '0')
		: '';
	const ano = dataExpiration
		? dataExpiration.getFullYear().toString().substr(-2)
		: '';

	return (
		<div className={styles.cardContainer} data-type={dataType}>
			<div className={styles.cardHeader}>
				<AiOutlineWifi className={styles.nfcIcon} size={28} />
				<div>
					<img src={seasLogo} alt="seas logo" />
				</div>
			</div>

			<div className={styles.cardNumberContainer}>
				<span>{cardNumber}</span>
			</div>

			<div className={styles.cardHolderName}>
				<span>Nome do titular</span>
				<span>{holderName}</span>
			</div>

			<div className={styles.cardExpiration}>
				<div>
					<span>Expiração</span>
					<span>{mes && ano ? `${mes}/${ano}` : ''}</span>
				</div>
				<FcSimCardChip size={30} />
			</div>
		</div>
	);
};

export default Card;
