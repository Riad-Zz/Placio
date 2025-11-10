import React, { createContext, useEffect, useState } from 'react';
import { getAuth } from "firebase/auth";
import app from '../../Firebase/Firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app)


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    //---------------------Apply theme on html root------------------------------
    useEffect(() => {
        const html = document.querySelector("html");
        html.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);


    //----------------------Shared Data-----------------------------
    const AuthData = {
        user,
        setUser,
        theme,
        setTheme,
    }
    return (
        <div>
            <AuthContext value={AuthData} >{children}</AuthContext>
        </div>
    );
};

export default AuthProvider;