import React from 'react';
import styles from './Button.module.scss';

interface IButtonProps {
	children: React.ReactNode;
}

const ButtonLink: React.FC<IButtonProps> = ({ children }) => {
	return <button>{children}</button>;
};

const Buttons = () => {
	return <button></button>;
};

export default Buttons;
