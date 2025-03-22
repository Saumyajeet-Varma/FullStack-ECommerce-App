/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({ user: null, token: "" })

    axios.defaults.headers.common['Authorization'] = auth?.token

    useEffect(() => {
        const data = localStorage.getItem('auth')

        if (data) {
            const parseData = JSON.parse(data)
            setAuth({ user: parseData.user, token: parseData.token })
        }
    }, [])

    return (
        <>
            <AuthContext.Provider value={[auth, setAuth]}>
                {children}
            </AuthContext.Provider>
        </>
    );
}

// Custom hook
const useAuth = () => useContext(AuthContext)

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth }