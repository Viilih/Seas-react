import React, { useState, useEffect } from 'react';
import styles from './ProductCard.module.scss';
import ReactModal from 'react-modal';
import { AiOutlineShoppingCart } from 'react-icons/ai';

import { useContext } from 'react';
import { EconomicContext } from '../../context/EconomicContext';

interface IProductCardProps {
	imgUrl: string;
	price: number;
	name: string;
	description: string;
	// createBuy?: (
	// 	numeroCartao: number,
	// 	docVendedor: string,
	// 	itens: [{ nome: string; valor: number; quantidade: number }],
	// 	codigoSeguranca: number
	// ) => Promise<void>;
}

const ProductCard: React.FC<IProductCardProps> = ({
	imgUrl,
	price,
	name,
	description,
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedProductPrice, setSelectedProductPrice] = useState(0);
	const [cardNumber, setCardNumber] = useState('');
	const [cardSecurityCode, setCardSecurityCode] = useState('');
	const [nameProduct, setNameProduct] = useState('');
	const [sellerDocument, setSellerDocument] = useState('');
	const [quantity, setQuantity] = useState(1);
	const { createBuy } = useContext(EconomicContext);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};
	const handleCloseModal = () => {
		setIsModalOpen(false);
	};
	const handleBuyProduct = () => {
		setSelectedProductPrice(price);
		setIsModalOpen(true);
	};

	const finalBuy = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const numeroCartao = Number(cardNumber);
		const docVendedor = 'string qualquer';
		const itens: any = [
			{ nome: name, valor: selectedProductPrice, quantidade: 1 },
		];

		const codigoSeguranca = Number(cardSecurityCode);
		await createBuy(numeroCartao, docVendedor, itens, codigoSeguranca);
	};

	return (
		<div>
			<div className={styles.card}>
				<div className={styles.cardImg}>
					{imgUrl && <img src={imgUrl} alt={name} />}
				</div>
				<div className={styles.cardInfo}>
					<div className={styles.price}>
						<h5>R$ {price}</h5>
					</div>
					<h4>{name}</h4>
					<div className={styles.description}>{description}</div>
				</div>
				<div className={styles.cardBtns}>
					<button
						onClick={() => {
							setNameProduct(name);
							handleBuyProduct();
						}}
					>
						<AiOutlineShoppingCart />
						<p>Comprar</p>
					</button>
				</div>
			</div>
			<ReactModal
				isOpen={isModalOpen}
				onRequestClose={handleCloseModal}
				contentLabel="Adicionar Endereço"
				className={styles.buyModal}
				overlayClassName={styles.overlay}
			>
				{isModalOpen ? (
					<div className={styles.modal}>
						<div className={styles.modalContent}>
							<h2>Modal de compra</h2>
							<form onSubmit={e => finalBuy(e)}>
								<input
									type="text"
									placeholder="Insira o número do cartão"
									onChange={e => setCardNumber(e.target.value)}
								/>
								<input
									type="text"
									placeholder="Insira o código de segurança do cartão"
									onChange={e => setCardSecurityCode(e.target.value)}
								/>
								<input
									type="text"
									value={String(selectedProductPrice)}
									readOnly
								/>
								<button
									onClick={() => {
										// handleCloseModal();
									}}
								>
									Realizar compra
								</button>
							</form>
						</div>
					</div>
				) : null}
			</ReactModal>
		</div>
	);
};

export default ProductCard;
