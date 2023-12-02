import { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import axios from 'axios';
import app from '../firebase/firebase.config';


export const AuthContext = createContext();
const provider = new GoogleAuthProvider();
const auth = getAuth(app);


const AuthProviders = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const createUser = (email, password) => {
        setIsLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setIsLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }
    const signInWithGoogle = () => {
        setIsLoading(true);
        return signInWithPopup(auth, provider);
    }

    const logOut = () => {
        setIsLoading(true)
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setIsLoading(true);
            // console.log(currentUser);
            const token = localStorage.getItem('toy-cars-token');
            if (currentUser && currentUser.email && token) {
                const fetchData = async () => {
                    try {
                        const res = await axios.get(`http://localhost:5000/user?email=${currentUser?.email}`, {
                            method: "GET",
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json',
                            }
                        });
                        console.log(res.data);
                        setUser(res.data);
                        setIsLoading(false);
                    } catch (error) {
                        console.log("Error:", error.message);
                    }
                }
                fetchData();

                // console.log(currentUser);
            }
        });
        return () => {
            return unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        isLoading,
        createUser,
        signIn,
        logOut,
        signInWithGoogle,
    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;