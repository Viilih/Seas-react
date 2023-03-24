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
  const { createCard, cardsList, cartao } = useContext(CardContext);

  const onSubmit = (data: any) => createCard(data);

  useEffect(() => {
    const fetchCards = async () => {
      const cartao = await cardsList();
      setCards(cartao);
    };
    console.log(cards);
    fetchCards();
  }, []);

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
            onChange={(e) => setCardType(e.target.value)}
          >
            <option value="DEBITO">Cartão de Débito</option>
            <option value="CREDITO">Cartão de Crédito</option>
          </select>

          <input type="submit" />
        </form>

        <h3>Cartões Cadastrados</h3>
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
        <h3>Cadastrar seu endereço</h3>
        <UserAddress />
        <div>
          <h3>Cadastrar seu Contato</h3>
          <UserContact />
        </div>
      </div>
    </>
  );
};

export default UserInfo;
