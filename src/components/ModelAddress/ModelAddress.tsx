import React, { useState } from 'react';
import Modal from 'react-modal';
import { IAddress } from '../../utils/interfaces';

const ModelAddress = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const newAddress = {
      cep: event.target.cep.value,
      logradouro: event.target.logradouro.value,
      numero: event.target.numero.value,
      cidade: event.target.cidade.value,
      estado: event.target.estado.value,
    };

    await createAddress(newAddress);

    setIsModalOpen(false);
  };

  return (
    <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
      <h2>Adicionar Endereço</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="cep">CEP:</label>
        <input type="text" id="cep" name="cep" required />

        <label htmlFor="logradouro">Logradouro:</label>
        <input type="text" id="logradouro" name="logradouro" required />

        <label htmlFor="numero">Número:</label>
        <input type="text" id="numero" name="numero" required />

        <label htmlFor="cidade">Cidade:</label>
        <input type="text" id="cidade" name="cidade" required />

        <label htmlFor="estado">Estado:</label>
        <input type="text" id="estado" name="estado" required />

        <button type="submit">Adicionar</button>
      </form>
    </Modal>
  );
};

export default ModelAddress;

function createAddress(newAddress: {
  cep: any;
  logradouro: any;
  numero: any;
  cidade: any;
  estado: any;
}) {
  throw new Error('Function not implemented.');
}
