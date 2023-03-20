import Dashboard from "./Dashboard";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Testes da página de dashboard", () => {
    test("Verifica se o a search bar está no documento", () => {
        render(<Dashboard />);

        const searchBar = screen.getByTestId("searchbar");
        expect(searchBar).toBeInTheDocument();
    });
});
