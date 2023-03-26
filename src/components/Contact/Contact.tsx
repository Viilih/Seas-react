import React, { useState, useContext, useEffect } from 'react';
import styles from './Contact.module.scss';
import { ContactContext } from '../../context/ContactContext';
import { IContact } from '../../utils/interfaces';
import { toast } from 'react-toastify';

import ReactModal from 'react-modal';

const Contact = () => {
	const { getContact, createContact, deleteContact, updateContact } =
		useContext(ContactContext);
	const [contacts, setContacts] = useState<IContact[]>([]);
	const [newContact, setNewContact] = useState<IContact>({
		idContato: 0,
		idCliente: 0,
		email: '',
		telefone: '',
	});
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [contactInfo, setContactInfo] = useState<IContact>();
	const [showForm, setShowForm] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [updatedContact, setUpdatedContact] = useState<IContact>({
		idContato: 0,
		idCliente: 0,
		email: '',
		telefone: '',
	});

	useEffect(() => {
		const fetchContacts = async () => {
			try {
				const data = await getContact();
				console.log(data);

				if (data) {
					console.log(data);
					setContacts(data);
					setContactInfo(data[0]); // definir o primeiro contato como padrão
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchContacts();
	}, [getContact]);

	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedContact = contacts.find(
			contact => contact.email === e.target.value
		);
		setContactInfo(selectedContact || undefined);
		setIsEditing(false);
	};

	const handleDeleteContact = async () => {
		try {
			if (contactInfo) {
				await deleteContact(contactInfo.idContato);
				console.log(contactInfo.idContato);
				setContactInfo(undefined);
				setIsEditing(false);
				window.location.reload();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setUpdatedContact(prev => ({
			...prev,
			[name]: value,
		}));
	};

	const handleEditContact = () => {
		setIsEditing(true);
		setUpdatedContact(contactInfo as IContact);
	};

	const handleCancelEdit = () => {
		setIsEditing(false);
		setUpdatedContact({
			idContato: 0,
			idCliente: 0,
			email: '',
			telefone: '',
		});
	};

	const handleUpdateContact = async () => {
		try {
			if (updatedContact) {
				const data = await updateContact(
					updatedContact,
					updatedContact.idContato
				);
				console.log(data);
				setContactInfo(updatedContact);
				setIsEditing(false);
				toast.success('Contato atualizado com sucesso!');
			}
		} catch (error) {
			console.log(error);
			toast.error('Erro ao atualizar o contato');
		}
	};
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await createContact(newContact);
			setShowForm(false);
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div className={styles.contactSelect}>
				<select
					name="contact"
					id="contact"
					onChange={handleSelectChange}
					defaultValue={contacts.length > 0 ? contacts[0].email : ''}
				>
					{contacts.map(contact => (
						<option key={contact.idContato} value={contact.email}>
							{contact.email}
						</option>
					))}
				</select>
				<div className={styles.btns}>
					<button onClick={handleEditContact}>Adicionar Contato</button>
				</div>
			</div>
			{showForm && (
				<div className={styles.contactForm}>
					<form onSubmit={handleSubmit}>
						<label>
							Email:
							<input
								type="text"
								value={newContact.email}
								onChange={e =>
									setNewContact({ ...newContact, email: e.target.value })
								}
							/>
						</label>
						<label>
							Telefone:
							<input
								type="text"
								value={newContact.telefone}
								onChange={e =>
									setNewContact({ ...newContact, telefone: e.target.value })
								}
							/>
						</label>
						<button type="submit">Salvar</button>
					</form>
					<button onClick={() => setShowForm(false)}>Cancelar</button>
				</div>
			)}
			{contactInfo && (
				<div className={styles.contactInfo}>
					<div className={styles.contactInfoItem}>
						<span>Telefone: {contactInfo.telefone}</span>
						<button onClick={() => setShowForm(true)}>Edit</button>
					</div>
					<div className={styles.contactInfoItem}>
						<span>Email: {contactInfo.email}</span>
						<button onClick={handleDeleteContact}>Delete</button>
					</div>
				</div>
			)}
		</>
	);
};

export default Contact;
