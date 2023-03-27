import { useContext, useEffect, useState } from 'react';
import { AddressContext } from '../../context/AddressContext';
import { IAddress } from '../../utils/interfaces';
import styles from './Address.module.scss';
import ReactModal from 'react-modal';
import { toast } from 'react-toastify';

ReactModal.setAppElement('#root');

const AddressList = () => {
  const { createAddress, getAddress, deleteAddress, updateAddress } =
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
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      const data = await getAddress();
      setAddresses(data);
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
    setAddress({
      logradouro: '',
      idEndereco: 0,
      cidade: '',
      estado: '',
      pais: '',
      cep: '',
      numero: 0,
    });
    setUpdatingId(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (updatingId !== null) {
        // If updating an existing address
        await updateAddress(updatingId, address);
        toast.success('Endereço atualizado com sucesso!');
      } else {
        // If creating a new address
        await createAddress(address);
        toast.success('Endereço adicionado com sucesso!');
      }

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

  const handleUpdate = (address: IAddress) => {
    setAddress(address);
    setUpdatingId(address.idEndereco);
    setIsModalOpen(true);
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
            Apagar
          </button>
          <button onClick={() => handleUpdate(address)}>Editar</button>
        </div>
      ))}

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Adicionar Endereço"
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <h2>Adicionar Endereço</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="cep">CEP:</label>
            <input
              type="text"
              name="cep"
              id="cep"
              value={address.cep}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="logradouro">Logradouro:</label>
            <input
              type="text"
              name="logradouro"
              id="logradouro"
              value={address.logradouro}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="numero">Número:</label>
            <input
              type="number"
              name="numero"
              id="numero"
              value={address.numero}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="cidade">Cidade:</label>
            <input
              type="text"
              name="cidade"
              id="cidade"
              value={address.cidade}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="estado">Estado:</label>
            <input
              type="text"
              name="estado"
              id="estado"
              value={address.estado}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="pais">País:</label>
            <input
              type="text"
              name="pais"
              id="pais"
              value={address.pais}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="complemento">Complemento:</label>
            <input
              type="text"
              name="complemento"
              id="complemento"
              value={address.complemento}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit">
            {updatingId !== null ? 'Atualizar' : 'Adicionar'}
          </button>
          <button type="button" onClick={handleCloseModal}>
            Cancelar
          </button>
        </form>
      </ReactModal>
    </div>
  );
};
export default AddressList;
