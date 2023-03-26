import React from 'react';
import styles from './Address.module.scss';

const Address = () => {
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
				</div>
			</div>
			<div className={styles.locationInfo}>
				<div className={styles.locationInfoItem}>
					<span>1</span>
					<span>2</span>
					<span>3</span>
				</div>
				<div className={styles.locationInfoItem}>
					<span>1</span>
					<span>2</span>
					<span>3</span>
				</div>
				<div className={styles.editItem}>
					<span>oi</span>
					<span>Edit</span>
				</div>
			</div>
		</>
	);
};

export default Address;
