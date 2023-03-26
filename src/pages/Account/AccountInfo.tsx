import React, { useState } from 'react';
import styles from './AccountInfo.module.scss';
import Address from '../../components/Address/Address';
import Contact from '../../components/Contact/Contact';
import Card from '../../components/Card/Card';
import { AiOutlineEdit, AiOutlineCheck } from 'react-icons/ai';

import { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import { ContactContext } from '../../context/ContactContext';
import { AddressContext } from '../../context/AddressContext';
import { CardContext } from '../../context/CardContext';
import { IContact, ICostumer, IPagamento } from '../../utils/interfaces';
import { useForm } from 'react-hook-form';
import Sidebar from '../../components/Sidebar/Sidebar';

const AccountInfo = () => {
	const { getCostumer, editCostumer } = useContext(UserContext);
	const { getContact, createContact, deleteContact, updateContact } =
		useContext(ContactContext);
	const { getAddress, createAddress, deleteAddress, updateAddress } =
		useContext(AddressContext);
	const { cardsList, createCard, deleteCard, updateCard, cartoes, addCompra } =
		useContext(CardContext);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [userInfo, setUserInfo] = useState<ICostumer>();
	useEffect(() => {
		const fetchUserInfo = async () => {
			const user: any = await getCostumer();
			setUserInfo(user);
		};

		fetchUserInfo();
	}, []);

	const [cardType, setCardType] = useState<string>('DEBITO');
	const [cards, setCards] = useState([]);
	const [valueAccount, setValueAccount] = useState<number>(0);
	const [showAddCardInput, setShowAddCardInput] = useState<boolean>(false);

	const handleShowAddCardInput = () => {
		setShowAddCardInput(!showAddCardInput);
	};

	const onSubmit = () => createCard(cardType);

	useEffect(() => {
		const fetchCards = async () => {
			const cards: any = await cardsList();
			setCards(cards);
		};

		fetchCards();
	}, []);

	const [isEditingContact, setIsEditingContact] = useState<boolean>(false);
	const [contactInfo, setContactInfo] = useState<IContact>();

	useEffect(() => {
		const fetchContactInfo = async () => {
			const user: any = await getContact();
			console.log(user);
			setContactInfo(user);
		};

		fetchContactInfo();
	}, []);

	// const handleSaveName = async () => {
	// 	try {
	// 		await editCostumer(userInfo.idCliente, userInfo);
	// 		setIsEditingName(false);
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };

	const [isEditingName, setIsEditingName] = useState<boolean>(false);

	return (
		<>
			<Sidebar />
			{userInfo ? (
				<div className={styles.container}>
					<div className={styles.contentContainer}>
						<div className={styles.personalInfo}>
							<div className={styles.topContent}>
								<div className={styles.leftContent}>
									{isEditingName ? (
										<input
											type="text"
											value={userInfo.nome}
											onChange={event =>
												setUserInfo({ ...userInfo, nome: event.target.value })
											}
										/>
									) : (
										<>
											<h2>{userInfo.nome}</h2>
											<span>
												CPF:{' '}
												{userInfo.cpf.replace(
													/(\d{3})(\d{3})(\d{3})(\d{2})/,
													'$1.$2.$3-$4'
												)}
											</span>
										</>
									)}
								</div>
								<div className={styles.rightContent}>
									<button
										onClick={async () => {
											if (isEditingName) {
												try {
													await editCostumer(userInfo.nome, userInfo.cpf);
													setIsEditingName(false);
												} catch (error) {
													console.error(error);
												}
											}
											setIsEditingName(!isEditingName);
										}}
									>
										{isEditingName ? (
											<AiOutlineCheck className={styles.icons} />
										) : (
											<AiOutlineEdit className={styles.icons} />
										)}
									</button>
								</div>
							</div>
							<div className={styles.midContent}>
								<Contact />
							</div>
							<div className={styles.bottomContent}>
								<Address />
							</div>
						</div>
						<div className={styles.personalInfo}>
							<div className={styles.cardContent}>
								<form onSubmit={handleSubmit(onSubmit)}>
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
								<div>
									{cards.map((card: any) => (
										<>
											<Card
												cardNumber={card.numeroCartao}
												holderName={userInfo.nome}
												expiration={card.vencimento}
												dataType="platinum"
											/>

											<span>Código de segurança: {card.codigoSeguranca}</span>
											<br />
											<span>Limite do cartão: {card.limite}</span>
											<input
												type="text"
												placeholder="Digite o valor a ser pago"
												value={valueAccount}
												onChange={e =>
													setValueAccount(parseFloat(e.target.value))
												}
											/>

											<button onClick={() => deleteCard(card.numeroCartao)}>
												Deletar
											</button>
											<button
												onClick={() =>
													addCompra(
														card.numeroCartao,
														card.codigoSeguranca,
														Number(valueAccount)
													)
												}
											>
												Pagar
											</button>
										</>
									))}
								</div>
							</div>

							<div className={styles.cardContent}></div>
						</div>
					</div>
				</div>
			) : (
				<div>Loading...</div>
			)}
		</>
	);
};

export default AccountInfo;