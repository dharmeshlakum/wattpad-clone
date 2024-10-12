import "../../css/authentication.css";
import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../context/authContext/AuthContext";
import { useAuthFormContext } from "../../context/formContext/AuthFormContext";

// interface to define types of the login
interface ILoginData {
    loginEmail: string;
    loginPassword: string;
}

// interface to define types of the login
interface ISignupData {
    signupEmail: string;
    signupUsername: string;
    signupPassword: string
    signupCoPassword: string;
    signupFullname: string;
}

// interface to define types of the signup

const Authentication: React.FC<{ type: string }> = ({ type }) => {
    const { isOpen, setIsOpen, setFormType } = useAuthFormContext();
    const [loginData, setLoginData] = useState<ILoginData>({ loginEmail: "", loginPassword: "" });
    const { handleLoginFN, handleSignupFN, authError, handleAuthError } = useAuthContext();
    const [signupData, setSignupData] = useState<ISignupData>({ signupCoPassword: "", signupEmail: "", signupFullname: "", signupPassword: "", signupUsername: "" });
    const [passwordVisibilit, setPasswordVisibility] = useState<boolean>(false);
    const [passwordMatch, setPasswordMatch] = useState<boolean>(true);

    // function to handle the signup
    const handleChange = (type: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (type === "login") {
            setLoginData((prev) => ({
                ...prev, [name]: value
            }))
        } else {
            setSignupData((prev) => ({
                ...prev, [name]: value
            }));
        }
    }

    // function to handle the password visibility
    const handlePasswordVisibility = () => {
        setPasswordVisibility(!passwordVisibilit);
    }

    // function to handle the form submit
    const handleSubmit = (type: string, event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (type === "login") {
            if (loginData.loginPassword === "" || loginData.loginEmail === "") {
                handleAuthError("All fields are required !")
                return;
            }
            handleLoginFN(loginData.loginEmail, loginData.loginPassword);

        } else {
            if (signupData.signupCoPassword === "" || signupData.signupPassword === "" || signupData.signupUsername === "" || signupData.signupEmail === "" || signupData.signupFullname === "") {
                handleAuthError("All fields are required !")
                return;
            }
            if (!passwordMatch) {
                handleAuthError("Password and confirm password doesn't match !");
                return;
            }
            handleSignupFN(signupData.signupFullname, signupData.signupUsername, signupData.signupPassword, signupData.signupEmail);
        }
    }

    useEffect(() => {
        setPasswordMatch(signupData.signupPassword === signupData.signupCoPassword);
    }, [signupData.signupPassword, signupData.signupCoPassword]);

    return (
        <>
            {isOpen &&
                <div className="auth-form-container">
                    <div className="form-inner-container">
                        <button className="close-btns" onClick={() => setIsOpen(false)}>X</button>
                        {authError && <div className="error-container">{authError}</div>}
                        <div className="form-container-element">
                            {type === "login" ?
                                <>
                                    <h2>Login</h2>
                                    <form className="form-element" onSubmit={(event) => handleSubmit("login", event)} autoComplete="off">
                                        <label htmlFor="loginEmail" className="form-label">Email Address or Username :</label>
                                        <input
                                            className="input-field"
                                            type="text"
                                            name="loginEmail"
                                            value={loginData.loginEmail}
                                            onChange={(event) => handleChange("login", event)}
                                            id="loginEmail"
                                            placeholder="Enter your email address" />
                                        <div className="password-field">
                                            <label htmlFor="loginPassword" className="form-label">Password :</label>
                                            <input
                                                className="input-field"
                                                type={`${passwordVisibilit ? "text" : "password"}`}
                                                value={loginData.loginPassword}
                                                onChange={(event) => handleChange("login", event)}
                                                name="loginPassword"
                                                id="loginPassword"
                                                placeholder="Enter password" />
                                            <button
                                                type="button"
                                                onClick={handlePasswordVisibility}
                                                className="eye-icon">
                                                👁️
                                            </button>
                                        </div>
                                        <button type="submit" className="form-btn submit-btn">Login with email</button>
                                        <button type="button" onClick={() => setFormType("signup")} className="form-btn shift-account">Don't have an account? Signup</button>
                                    </form>
                                </>
                                :
                                <>
                                    <h2>signup</h2>
                                    <form className="form-element" onSubmit={(event) => handleSubmit("signup", event)} autoComplete="off">
                                        <label htmlFor="signupUsername" className="form-label">Username :</label>
                                        <input
                                            className="input-field"
                                            type="text"
                                            name="signupUsername"
                                            value={signupData.signupUsername}
                                            onChange={(event) => handleChange("signup", event)}
                                            id="signupUsername"
                                            placeholder="Enter username" />
                                        <label htmlFor="signupFullname" className="form-label">Ful Name :</label>
                                        <input
                                            className="input-field"
                                            type="text"
                                            name="signupFullname"
                                            value={signupData.signupFullname}
                                            onChange={(event) => handleChange("signup", event)}
                                            id="signupFullname"
                                            placeholder="Enter full Name" />
                                        <label htmlFor="signupEmail" className="form-label">E-mail :</label>
                                        <input
                                            className="input-field"
                                            type="text"
                                            name="signupEmail"
                                            value={signupData.signupEmail}
                                            onChange={(event) => handleChange("signup", event)}
                                            id="signupEmail"
                                            placeholder="Enter E-mail" />
                                        <div className="password-field">
                                            <label htmlFor="signupPassword" className="form-label">Password :</label>
                                            <input
                                                className={`input-field ${passwordMatch ? "" : "border-red"}`}
                                                type={`${passwordVisibilit ? "text" : "password"}`}
                                                value={signupData.signupPassword}
                                                onChange={(event) => handleChange("signup", event)}
                                                name="signupPassword"
                                                id="signupPassword"
                                                placeholder="Enter password" />
                                            <label htmlFor="signupCoPassword" className="form-label">Confirm Password :</label>
                                            <input
                                                className={`input-field ${passwordMatch ? "" : "border-red"}`}
                                                type={`${passwordVisibilit ? "text" : "password"}`}
                                                value={signupData.signupCoPassword}
                                                onChange={(event) => handleChange("signup", event)}
                                                name="signupCoPassword"
                                                id="signupCoPassword"
                                                placeholder="Enter Confirm password" />
                                            <button
                                                type="button"
                                                style={{ top: "28%" }}
                                                onClick={handlePasswordVisibility}
                                                className="eye-icon">
                                                👁️
                                            </button>
                                        </div>
                                        <button type="submit" className="form-btn submit-btn">Signup with email</button>
                                        <button type="button" onClick={() => setFormType("login")} className="form-btn shift-account">Already have an account? Login</button>
                                    </form>
                                </>
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Authentication;