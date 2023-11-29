import { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import axios from 'axios';
import app from '../firebase/firebase.config';


export const AuthContext = createContext();
const auth = getAuth(app);


const AuthProviders = ({ children }) => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const createUser = (email, password) => {
        setIsLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setIsLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        setIsLoading(true)
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
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
                    } catch (error) {
                        console.log("Error:", error.message);
                    }
                }
                fetchData();

                // console.log(currentUser);
                setIsLoading(false);
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
    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;