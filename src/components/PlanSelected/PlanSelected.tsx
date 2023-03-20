import React from "react";
import styles from "./PlanSelected.module.scss";

interface IPlanSelectedProps {
    plan: string | undefined;
    title: string;
}

const PlanSelected: React.FC<IPlanSelectedProps> = ({ plan, title }) => {
    return (
        <div className={styles.planInfoContainer}>
            <span>{title}</span>
            <div data-color={plan}>{plan}</div>
        </div>
    );
};

export default PlanSelected;
