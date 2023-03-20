import { useState } from "react";
import "./global.scss";
import Router from "./route";

function App() {
  const [userName, setUserName] = useState("");
  const [userPassword, setuserPassword] = useState("");

  return (
    <>
      <Router />
    </>
  );
}

export default App;
