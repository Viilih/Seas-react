import { useState, useEffect } from "react";
import styles from "./CurrencyExchange.module.scss";

interface ICambio {
    code: string;
    high: string;
    low: string;
}

const CurrencyExchange: React.FC = () => {
    const [resultado, setResultado] = useState<ICambio[]>([]);

    async function pesquisarCambio() {
        const moedas = ["USD-BRL", "EUR-BRL", "BTC-BRL"];
        const response = await fetch(
            `https://economia.awesomeapi.com.br/last/${moedas}`
        );
        const cambio: ICambio = await response.json();
        const cambioInfo = Object.values(cambio).map((item: any) => ({
            code: item.code,
            high: item.high,
            low: item.low,
        }));
        setResultado(cambioInfo);
    }

    useEffect(() => {
        pesquisarCambio();
    }, []);

    return (
        <div className={styles.currencyInfo} data-testid="currencies-container">
            {resultado.map((cambio: ICambio) => (
                <span
                    data-testid={`currency-${cambio.code}`}
                    key={cambio.code}
                >{`${cambio.code} / BRL Low: R$ ${cambio.low} High R$ ${cambio.high},  `}</span>
            ))}
        </div>
    );
};

export default CurrencyExchange;
