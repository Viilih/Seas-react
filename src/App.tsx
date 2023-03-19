import { useState } from "react";
import "./global.scss";
import Router from "./route";
import Transaction from "./components/Transaction/Transaction";
import Card from "./components/Card/Card";
import Inputs from "./components/InputComponents/Inputs";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
    const [userName, setUserName] = useState("");
    const [userPassword, setuserPassword] = useState("");

    return (
        <>
            <Router />
            <Sidebar />
            {/* <Transaction
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

      <Inputs
        inputType="text"
        placeholderText="Informe seu nome"
        isRequired
        inputName="name"
        valueInput={userName}
        handleChange={(currentValue) => setUserName(currentValue)}
      />
      <Inputs
        inputType="password"
        placeholderText="Informe sua senha"
        isRequired
        inputName="name"
        valueInput={userPassword}
        handleChange={(currentValue) => setuserPassword(currentValue)}
      /> */}
        </>
    );
}

export default App;
