import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './UserInfo.module.scss';

const UserInfo = () => {
	const [cardType, setCardType] = useState<string>('DEBITO');
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data: any) => console.log(data);

	return (
		<>
			<div className={styles.container}>
				<h3>Preencha os campos para gerar um novo cartão</h3>
				<form onSubmit={handleSubmit(onSubmit)}>
					{/* register your input into the hook by invoking the "register" function */}
					<input
						type={'text'}
						defaultValue=""
						{...register('accountNumber', { required: true })}
						placeholder="Número da conta"
					/>

					{/* include validation with required or other standard HTML validation rules */}
					<input
						type={'password'}
						{...register('password', { required: true })}
						placeholder="Senha"
					/>
					{/* errors will return when field validation fails  */}
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
			</div>
		</>
	);
};

export default UserInfo;
