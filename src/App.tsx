import { useState } from "react";
import "./global.scss";
import Router from "./route";
import Transaction from "./components/Transaction/Transaction";
import Card from "./components/Card/Card";
import Inputs from "./components/InputComponents/Inputs";

function App() {
    return (
        <>
            <Router />
            {/* <Transaction
                nome="leonardo vasconcelo amaral"
                valor={-20}
                data="21/07"
                dataColor="spent"
            /> */}
        </>
    );
}

export default App;
