import React from 'react';
import styles from './Button.module.scss';

interface IButtonProps {
	children?: React.ReactNode;
	name: string;
	text?: string;
}

interface IButtonSubmitProps {
	name: string;
	text?: string;
	btnType: 'submit' | 'button' | 'reset' | undefined;
	children?: React.ReactNode;
	dataTestid?: string;
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

export const ButtonSubmit: React.FC<IButtonSubmitProps> = ({
	name,
	text,
	btnType = 'submit',
	dataTestid,
}) => {
	return (
		<button
			className={name == 'primary' ? styles.primaryBtn : styles.secondaryBtn}
			type={btnType}
			data-testid={dataTestid}
		>
			{text}
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
