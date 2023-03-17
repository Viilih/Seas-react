import React from "react";
import styles from "./Transaction.module.scss";

interface ITransaction {
  nome: string;
  valor: number;
  data: string;
  dataColor: string;
}

const Transaction: React.FC<ITransaction> = (ITransaction) => {
  return (
    <>
      <div className={styles.transaction}>
        <div className={styles.nameData}>
          <div className={styles.span}></div>
          <div className={styles.name}>
            {ITransaction.nome}
            <div className={styles.data}>{ITransaction.data}</div>
          </div>
        </div>
        <div className={styles.valor} data-color={ITransaction.dataColor}>
          R$ {ITransaction.valor}
        </div>
      </div>
    </>
  );
};
export default Transaction;
