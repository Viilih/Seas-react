import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import styles from './UserInfo.module.scss';
import { UserContext } from '../../context/UserContext';
import { IContact } from '../../utils/interfaces';
import { ContactContext } from '../../context/ContactContext';

export const UserContact = () => {
  const { createContact } = useContext(ContactContext);
  const [userEmail, setUserEmail] = useState('');
  const [userNumero, setUserNumero] = useState('');
  const numRegex = `[0-9]{1-5}`;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IContact>();

  return (
    <>
      <div className={styles.container}>
        <h3>Adicione os dados do seu endereço</h3>
        <form onSubmit={handleSubmit((data) => createContact(data))}>
          <div className={styles.cepContainer}>
            <input
              type="text"
              placeholder="Digite o seu email"
              id="email"
              {...register('email', { required: true })}
            />

            <input
              type="string"
              pattern={numRegex}
              placeholder="Digite o seu telefone"
              id="telefone"
              {...register('telefone', { required: true })}
            />
          </div>
          <input type="submit" value="Cadastrar" />
        </form>
      </div>
    </>
  );
};
