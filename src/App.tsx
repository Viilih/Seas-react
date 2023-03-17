import React from "react";
import "./global.scss";
import Router from "./route";
import Transaction from "./components/Transaction/Transaction";

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
    </>
  );
}

export default App;
