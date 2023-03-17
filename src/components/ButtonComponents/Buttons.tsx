import React from 'react';
import styles from './Button.module.scss';

interface IButtonProps {
	children?: React.ReactNode;
	name: string;
	text?: string;
}

export const ButtonLink: React.FC<IButtonProps> = ({ children, name }) => {
	return (
		<button
			className={name == 'primary' ? styles.primaryBtn : styles.secondaryBtn}
		>
			{children}
		</button>
	);
};

const Buttons: React.FC<IButtonProps> = ({ name, text }) => {
	return (
		<button
			className={name == 'primary' ? styles.primaryBtn : styles.secondaryBtn}
		>
			{text}
		</button>
	);
};

export default Buttons;
