import React, { useState, useContext, useEffect } from 'react';

import { useForm } from 'react-hook-form';
import styles from './UserInfo.module.scss';
import { UserContext } from '../../context/UserContext';
import { IContact } from '../../utils/interfaces';
import Inputs from '../../components/InputComponents/Inputs';

export const UserContact = () => {
  const { createContact } = useContext(UserContext);
  const [userEmail, setUserEmail] = useState('');
  const [userNumero, setUserNumero] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IContact>();

  const cepRegex = `[0-9]{8}`;
  const numRegex = `[0-9]{1-5}`;

  const onSubmit = (data: any) => {
    createContact(data);
    console.log(data);
  };

  return (
    <>
      <div className={styles.container}>
        <h3>Adicione os dados do seu endereço</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}

          <div className={styles.cepContainer}>
            <input
              type="text"
              placeholder="Digite o seu email"
              id="email"
              {...register('email')}
            />

            <input
              type="string"
              placeholder="Digite o seu telefone"
              id="telefone"
              {...register('telefone')}
            />
          </div>
          <input type="submit" value="Cadastrar" />
        </form>
      </div>
    </>
  );
};
