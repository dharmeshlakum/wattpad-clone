import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { useAuthFormContext } from "../context/formContext/AuthFormContext";
import { useAuthContext } from "../context/authContext/AuthContext";
import Homepage from "../pages/Homepage";
import RootPage from "../pages/Rootpage";
import Authentication from "../components/authentication/Authentication";
import MissingPage from "../components/missingPage/MissingPage";
import StoryList from "../components/storyList/StoryList";

const Navigator: React.FC = () => {

    const { formType } = useAuthFormContext();
    const { token, setUser, setToken } = useAuthContext();

    useEffect(() => {
        const rawToken = localStorage.getItem("auth-token");
        console.log(rawToken)
        if (rawToken) {
            const rawUserdata = localStorage.getItem("user");
            if (rawUserdata) {
                try {
                    const userData = JSON.parse(rawUserdata);
                    setToken(rawToken);
                    setUser(userData);

                } catch (error: any) {
                    console.error("Error parsing user data:", error);
                    localStorage.removeItem("user");
                }
            }
        }
        // eslint-disable-next-line
    }, [setToken, setUser]);

    return (
        <>
            <Navbar />
            <Authentication type={formType} />
            <Routes>
                <Route path="/" element={token ? <Navigate to="/home" /> : <RootPage />} />
                <Route path="/home" element={token ? <Homepage /> : <Navigate to="/" />} />
                <Route path="/stories/:storyName" element={<StoryList />} />
                <Route path="*" element={<MissingPage />} />
            </Routes>
            <Footer />
        </>
    )
}

export default Navigator;