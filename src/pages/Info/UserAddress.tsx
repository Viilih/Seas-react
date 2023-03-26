import React, { useContext, useState } from 'react';
import { AddressContext } from '../../context/AddressContext';
import { IAddress } from '../../utils/interfaces';

export const UserAddress = () => {
  const { createAddress } = useContext(AddressContext);
  const [address, setAddress] = useState<IAddress>({
    logradouro: '',
    idEndereco: 0,
    cidade: '',
    estado: '',
    pais: '',
    cep: '',
    numero: 0,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAddress((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createAddress(address);
      setAddress({
        logradouro: '',
        idEndereco: 0,
        cidade: '',
        estado: '',
        pais: '',
        cep: '',
        numero: 0,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="logradouro">Logradouro:</label>
        <input
          type="text"
          name="logradouro"
          value={address.logradouro}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="cidade">Cidade:</label>
        <input
          type="text"
          name="cidade"
          value={address.cidade}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="estado">Estado:</label>
        <input
          type="text"
          name="estado"
          value={address.estado}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="pais">País:</label>
        <input
          type="text"
          name="pais"
          value={address.pais}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="cep">CEP:</label>
        <input
          type="text"
          name="cep"
          value={address.cep}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="numero">Número:</label>
        <input
          type="number"
          name="numero"
          value={address.numero}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="complemento">Complemento:</label>
        <input
          type="text"
          name="complemento"
          value={address.complemento || ''}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Cadastrar Endereço</button>
    </form>
  );
};
