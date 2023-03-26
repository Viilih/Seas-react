import { useContext, useEffect, useState } from 'react';
import { AddressContext } from '../../context/AddressContext';
import { IAddress } from '../../utils/interfaces';
import styles from './Address.module.scss';
import ReactModal from 'react-modal';
ReactModal.setAppElement('#root');
const AddressList = () => {
  const { createAddress, getAddress, deleteAddress } =
    useContext(AddressContext);
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address, setAddress] = useState<IAddress>({
    logradouro: '',
    idEndereco: 0,
    cidade: '',
    estado: '',
    pais: '',
    cep: '',
    numero: 0,
  });

  useEffect(() => {
    const fetchAddresses = async () => {
      const data = await getAddress();
      setAddresses(data);
      console.log(data);
    };

    fetchAddresses();
  }, []);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAddress((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDelete = async (idEndereco: number) => {
    await deleteAddress(idEndereco);
    const data = await getAddress();
    setAddresses(data);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
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
        complemento: '',
      });

      setIsModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert(
        'Ocorreu um erro ao adicionar o endereço. Por favor, tente novamente.'
      );
    }
  };

  return (
    <div className={styles.container}>
      <h2>Endereço(s):</h2>
      <button onClick={handleOpenModal}>Adicionar Endereço</button>

      {addresses?.map((address) => (
        <div className={styles.endereco} key={address.idEndereco}>
          <p>
            {address.cep}, {address.logradouro}, {address.numero},{' '}
            {address.cidade} - {address.estado}
          </p>
          <button onClick={() => handleDelete(address.idEndereco)}>
            Delete
          </button>
        </div>
      ))}
      <ReactModal
        isOpen={isModalOpen}
        className={styles.model}
        onRequestClose={handleCloseModal}
      >
        <h2>Adicionar Endereço</h2>
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
      </ReactModal>
    </div>
  );
};

export default AddressList;
