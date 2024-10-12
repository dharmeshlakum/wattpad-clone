import React, { ReactNode, useState } from "react";
import { AuthContext, IUserTypes } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { useAuthFormContext } from "../formContext/AuthFormContext";
const AuthProviders: React.FC<{ children: ReactNode }> = ({ children }) => {

    // states
    const url = "http://192.168.43.39:5001";
    // const url = "http://192.168.1.26:5001";
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<IUserTypes | null>(null);
    const [authError, setAuthError] = useState<string | null>(null);
    const { setIsOpen } = useAuthFormContext();

    // function to handle signup
    const handleSignupFN = async (fullName: string, username: string, password: string, emailAddress: string): Promise<void> => {
        try {
            const rawData = await fetch(`${url}/auth/signup`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    fullName,
                    emailAddress,
                    password,
                    username
                })
            });
            const jsonData = await rawData.json();
            if (jsonData.success) {
                const token = jsonData.token;
                const user = jsonData.user;

                localStorage.setItem("auth-token", token);
                localStorage.setItem("user", JSON.stringify(user));

                setToken(token);
                setUser(user);
                setIsOpen(false);
                navigate("/home");

            } else {
                console.log("signup fetch error :", jsonData.message);
                handleAuthError(jsonData.message);
            }

        } catch (error: any) {
            console.log("handle signup function error :", error);
            return;
        }
    }

    // function to handle login
    const handleLoginFN = async (emailAddress: string, password: string): Promise<void> => {
        try {
            const rawData = await fetch(`${url}/auth/login`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    emailAddress,
                    password
                })
            });
            const jsonData = await rawData.json();
            if (jsonData.success) {
                const token = jsonData.token;
                const user = jsonData.user;

                localStorage.setItem("auth-token", token);
                localStorage.setItem("user", JSON.stringify(user));

                setToken(token);
                setUser(user);
                setIsOpen(false);
                navigate("/home");

            } else {
                console.log("login fetch error :", jsonData.message);
                handleAuthError(jsonData.message);
            }

        } catch (error: any) {
            console.log("handle login function error :", error);
            return;
        }
    }

    // function to handle the auth error
    const handleAuthError = (message: string): void => {
        setAuthError(message);

        setTimeout(() => {
            setAuthError(null)
        }, 2000);
    }

    return (
        <AuthContext.Provider value={{ token, user, setUser, url, handleSignupFN, handleLoginFN, authError, handleAuthError, setToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProviders;