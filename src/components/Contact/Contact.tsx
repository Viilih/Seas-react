import React, { useState, useContext, useEffect } from 'react';
import styles from './Contact.module.scss';
import { ContactContext } from '../../context/ContactContext';
import { IContact } from '../../utils/interfaces';

const Contact = () => {
	const [isEditingContact, setIsEditingContact] = useState<boolean>(false);
	const [contactInfo, setContactInfo] = useState<IContact>();
	const { getContact, createContact, deleteContact, updateContact } =
		useContext(ContactContext);

	return (
		<>
			<div className={styles.contactSelect}>
				<select name="contact" id="contact">
					<option value="contact1" selected>
						Contato 1
					</option>
					<option value="contact2">Contato 2</option>
				</select>
				<div className={styles.btns}>
					<span>Add</span>
					<span>Delete</span>
					<button
					// onClick={async () => {
					// 	if (isEditingContact) {
					// 		try {
					// 			// await updateContact(contactInfo);
					// 			setIsEditingContact(false);
					// 		} catch (error) {
					// 			console.error(error);
					// 		}
					// 	}
					// 	setIsEditingContact(!isEditingContact);
					// }}
					>
						Edit
					</button>
				</div>
			</div>
			<div className={styles.contactInfo}>
				<div className={styles.contactInfoItem}>
					<span>Telefone: 21981804006</span>
					<span>Edit</span>
				</div>
				<div className={styles.contactInfoItem}>
					<span>email: qualqueremail@gmail.com</span>
					<span>Edit</span>
				</div>
			</div>
		</>
	);
};

export default Contact;
