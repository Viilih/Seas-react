import React from "react";
import "./global.scss";
import Router from "./route";
import Transaction from "./components/Transaction/Transaction";
import Card from "./components/Card/Card";

function App() {
    return (
        <>
            <Router />
            <Transaction
                nome="leonardo vasconcelo amaral"
                valor={-20}
                data="21/07"
                dataColor="spent"
            />

            <Card
                dataType="platinum"
                cardNumber={222222222222222}
                holderName="Claudio Da silva"
                expiration="02/02"
            />
        </>
    );
}

export default App;
