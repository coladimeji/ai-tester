// src/contexts/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../services/firebase';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const login = async (email, password) => {
        try {
            const result = await auth.signInWithEmailAndPassword(email, password);
            setUser(result.user);
            return result.user;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    const logout = async () => {
        try {
            await auth.signOut();
            setUser(null);
        } catch (error) {
            throw new Error(error.message);
        }
    };

    const value = {
        user,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};