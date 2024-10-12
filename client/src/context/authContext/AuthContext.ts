import { createContext, Dispatch, SetStateAction, useContext } from "react";

// interface to define user types
export interface IUserTypes {
    id: string;
    username: string;
    fullName: string;
    avatar: string
}

// interface to define types of the Auth Context
interface AuthContextTypes {
    token: string | null;
    url: string;
    setToken: Dispatch<SetStateAction<string | null>>
    user: IUserTypes | null;
    setUser: Dispatch<SetStateAction<IUserTypes | null>>;
    handleSignupFN: (fullName: string, username: string, password: string, emailAddress: string) => void;
    handleLoginFN: (emailAddress: string, password: string) => void;
    authError: string | null;
    handleAuthError: (message:string)=> void;
}

const AuthContext = createContext<AuthContextTypes | undefined>(undefined);
const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context || context === undefined) {
        throw new Error("Can't use context outside of the provider function : auth");
    }
    return context;
}

export { AuthContext, useAuthContext }