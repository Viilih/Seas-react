import styles from "./Inputs.module.scss";

interface IinputsProps {
    inputName: string;
    inputType: string;
    placeholderText: string;
    isRequired: boolean;
    valueInput: string;
    handleChange: (currentValue: string) => void;
}

const Inputs = ({
    inputName,
    inputType = "text",
    placeholderText,
    isRequired = true,
    valueInput,
    handleChange,
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
        />
    );
};

export default Inputs;
