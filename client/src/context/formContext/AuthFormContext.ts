import { createContext, Dispatch, SetStateAction, useContext } from "react";

// interface to define the types of the auth form context
interface AuthFormContextType {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>
    formType: string;
    setFormType: Dispatch<SetStateAction<string>>
}

const AuthFormContext = createContext<AuthFormContextType | undefined>(undefined);
const useAuthFormContext = () =>{

    const context = useContext(AuthFormContext);
    if(context === undefined){
        throw new Error("Can't use context outside of the provider function : auth form")
    }
    return context
}

export { AuthFormContext, useAuthFormContext }