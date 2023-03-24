import React, { useState, useContext, useEffect } from 'react';

import { useForm } from 'react-hook-form';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './UserInfo.module.scss';
import PlanSelected from '../../components/PlanSelected/PlanSelected';
import Card from '../../components/Card/Card';
import { CardContext } from '../../context/CardContext';
import { UserAddress } from './UserAddress';
import { UserContact } from './UserContact';

const UserInfo = () => {
	const [cardType, setCardType] = useState<string>('DEBITO');
	const [cards, setCards] = useState([]);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { createCard } = useContext(CardContext);

	// useEffect(() => {
	// 	const fetchCards = async () => {
	// 		const cartao = await cardsList();
	// 		setCards(cartao);
	// 	};
	// 	console.log(cards);
	// 	fetchCards();
	// }, []);

	const onSubmit = () => createCard(cardType);

	return (
		<>
			<div className={styles.container}>
				<h1 className={styles.heading}>
					Preencha os campos para gerar um novo cartão
				</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input
						type={'number'}
						defaultValue={0}
						{...register('accountNumber', {
							required: true,
							setValueAs: (value: string) => parseInt(value),
						})}
						placeholder="Número da conta"
					/>

					<input
						type={'password'}
						{...register('password', { required: true })}
						placeholder="Senha"
					/>
					{errors.password && <span>Este campo é obrigatório</span>}

					<select
						{...register('cardType')}
						value={cardType}
						onChange={e => setCardType(e.target.value)}
					>
						<option value="DEBITO">Cartão de Débito</option>
						<option value="CREDITO">Cartão de Crédito</option>
					</select>

					<input type="submit" />
				</form>

				<h1 className={styles.heading}>Cartões Cadastrados</h1>
				<div className={styles.cards}>
					<div className={styles.userCardDashboard}>
						<PlanSelected plan="EXEMPLO" title="Meu Seas" />
						<Card
							cardNumber={2222222222222}
							holderName="Rafael Ramos"
							expiration="02/02"
							dataType="platinum"
						/>
					</div>
					<div className={styles.userCardDashboard}>
						{cards.map((card: any) => (
							<>
								<PlanSelected plan={card.type} title="Meu Seas" />
								<Card
									key={card.cardId}
									cardNumber={card.cardNumber}
									holderName={card.holderName}
									expiration={card.expiration}
									dataType={card.cardType}
								/>
							</>
						))}
					</div>
				</div>
				<h1 className={styles.heading}>Cadastrar seu endereço</h1>
				<UserAddress />
				<div>
					<h1 className={styles.heading}>Cadastrar seu Contato</h1>
					<UserContact />
				</div>
			</div>
		</>
	);
};

export default UserInfo;
