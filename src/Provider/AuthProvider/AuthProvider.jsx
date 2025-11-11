import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../../Firebase/Firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app) 
const googleProvider = new GoogleAuthProvider() ;


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading,setLoading] = useState(true) ;
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    //---------------------Apply theme on html root------------------------------
    useEffect(() => {
        const html = document.querySelector("html");
        html.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    //--------------------Register/Login With Google------------------
    const GoogleLogin =()=>{
        return signInWithPopup(auth,googleProvider) ;
    }

    //------------------------Email Password Register-----------------
    const emailPasswordReg = (email,password) => {
        return createUserWithEmailAndPassword(auth,email,password) ;
    }

    //---------------------------Update User Profie -----------------
    const updateUserProfile = (updatedUser) => {
        return updateProfile(auth.currentUser , updateProfile) ;
    }

    //-------------------------LogOut--------------------------------
    const logout = () =>{
        return signOut(auth) ;
    }
    //-----------------------Observer-------------------------------
    useEffect(()=>{
        const tracking = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser) ;
            loading(false)
        })
        return ()=>{
            tracking() ;
        }
    },[])

    //----------------------Shared Data-----------------------------
    const AuthData = {
        user,
        setUser,
        theme,
        setTheme,
        GoogleLogin,
        logout,
        loading,
        setLoading,
        emailPasswordReg,
        updateUserProfile
    }
    return (
        <div>
            <AuthContext value={AuthData} >{children}</AuthContext>
        </div>
    );
};

export default AuthProvider;