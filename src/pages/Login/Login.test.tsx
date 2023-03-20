import { render, screen } from "@testing-library/react";

import user from "@testing-library/user-event";
import Login from "./Login";
import fetchMock from "jest-fetch-mock";

describe("conjunto de teste do login", () =>
  test("verificar se a pagina de login renderiza", () => {
    render(<Login />);
  }));
