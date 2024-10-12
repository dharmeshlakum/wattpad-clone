import React, { ReactNode, useState } from "react";
import { AuthFormContext } from "./AuthFormContext";

const AuthFormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [formType, setFormType] = useState<string>("login");

    return (
        <AuthFormContext.Provider value={{ isOpen, setIsOpen, formType, setFormType }}>
            {children}
        </AuthFormContext.Provider>
    )
}

export default AuthFormProvider;