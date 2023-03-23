import { createContext } from "react";
import { api } from "../utils/api";

interface IUserContext {
    createUser: (userData: any) => Promise<void>;
}

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: any) => {
    const createUser = async (userData: any) => {
        try {
            const response = await fetch(`${api}/conta`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                console.log("usuário cadastrado!");
            } else {
                console.log("erro no cadastrado!");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <UserContext.Provider value={{ createUser }}>
            {children}
        </UserContext.Provider>
    );
};
