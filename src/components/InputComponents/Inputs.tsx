import styles from "./Inputs.module.scss";

interface IinputsProps {
    inputName: string;
    inputType: string;
    placeholderText: string;
    isRequired: boolean;
    valueInput: string;
    handleChange: (currentValue: string) => void;
    inputPattern?: string;
    inputMaxLength?: number | undefined;
    inputMinLength?: number | undefined;
}

const Inputs = ({
    inputName,
    inputType = "text",
    placeholderText,
    isRequired = true,
    valueInput,
    handleChange,
    inputPattern,
    inputMaxLength,
    inputMinLength,
}: IinputsProps) => {
    return (
        <input
            className={styles.inputsDefaultStyle}
            name={inputName}
            type={inputType}
            placeholder={placeholderText}
            required={isRequired}
            value={valueInput}
            onChange={(e) => handleChange(e.target.value)}
            pattern={inputPattern}
            maxLength={inputMaxLength}
            minLength={inputMinLength}
        />
    );
};

export default Inputs;
