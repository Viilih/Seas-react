import { FocusEventHandler } from 'react';
import styles from './Inputs.module.scss';

interface IinputsProps {
	inputName: string;
	inputType: string;
	placeholderText: string;
	isRequired: boolean;
	valueInput: string | number;
	handleChange: (currentValue: string) => void;
	inputPattern?: string;
	inputMaxLength?: number | undefined;
	inputMinLength?: number | undefined;
	dataTestid?: string;
	className?: string;
}

interface IinputsIdProps {
	inputName: string;
	inputType: string;
	placeholderText: string;
	isRequired: boolean;
	valueInput: number;
	handleChange: (currentValue: number) => void;
	inputPattern?: string;
	inputMaxLength?: number | undefined;
	inputMinLength?: number | undefined;
	dataTestid?: string;
}

interface IcepInputsProps {
	inputName: string;
	inputType: string;
	placeholderText: string;
	isRequired: boolean;
	valueInput: string;
	inputPattern?: string;
	inputMaxLength?: number | undefined;
	inputMinLength?: number | undefined;
	dataTestid?: string;
	handleChange: (currentValue: string) => void;
	handleBlur: (cep: string) => void;
}

interface IActionInputProps {
	inputName: string;
	inputType: string;
	placeholderText: string;
	isRequired: boolean;
	valueInput: string;
	inputPattern?: string;
	inputMaxLength?: number | undefined;
	inputMinLength?: number | undefined;
	dataTestid?: string;
	handleChange: (currentValue: string) => void;
}

export const ActionInput = ({
	inputName,
	inputType = 'text',
	placeholderText,
	isRequired = true,
	valueInput,
	handleChange,
	inputPattern,
	inputMaxLength,
	inputMinLength,
	dataTestid,
}: IActionInputProps) => {
	return (
		<input
			className={styles.inputsDefaultStyle}
			name={inputName}
			type={inputType}
			placeholder={placeholderText}
			required={isRequired}
			value={valueInput}
			onChange={e => handleChange(e.target.value)}
			pattern={inputPattern}
			maxLength={inputMaxLength}
			minLength={inputMinLength}
			data-testid={dataTestid}
		/>
	);
};

export const CepInputs = ({
	inputName,
	inputType = 'text',
	placeholderText,
	isRequired = true,
	valueInput,
	handleChange,
	inputPattern,
	inputMaxLength,
	inputMinLength,

	handleBlur,
	dataTestid,
}: IcepInputsProps) => {
	return (
		<input
			className={styles.inputsDefaultStyle}
			name={inputName}
			type={inputType}
			placeholder={placeholderText}
			required={isRequired}
			value={valueInput}
			onChange={e => handleChange(e.target.value)}
			pattern={inputPattern}
			maxLength={inputMaxLength}
			minLength={inputMinLength}
			onBlur={() => handleBlur(valueInput)}
			data-testid={dataTestid}
		/>
	);
};

const Inputs = ({
	inputName,
	inputType = 'text',
	placeholderText,
	isRequired = true,
	valueInput,
	handleChange,
	inputPattern,
	inputMaxLength,
	inputMinLength,
	dataTestid,
}: IinputsProps) => {
	return (
		<input
			className={styles.inputsDefaultStyle}
			name={inputName}
			type={inputType}
			placeholder={placeholderText}
			required={isRequired}
			value={valueInput}
			onChange={e => handleChange(e.target.value)}
			pattern={inputPattern}
			maxLength={inputMaxLength}
			minLength={inputMinLength}
			data-testid={dataTestid}
		/>
	);
};

export default Inputs;
