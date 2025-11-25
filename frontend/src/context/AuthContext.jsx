import React from 'react'
import { useContext } from 'react'
import { useState,createContext } from 'react'

export const AuthContext=createContext()

export const AuthProvider=({children})=>{
    const storedUser = localStorage.getItem("devconnect-user");
    const storedToken = localStorage.getItem("devconnect-token");

    const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
    const [token, setToken] = useState(storedToken || null);

    const login=(userData,jwtToken)=>{
        setUser(userData)
        setToken(jwtToken)
        localStorage.setItem("devconnect-user",JSON.stringify(userData))
        localStorage.setItem("devconnect-token",jwtToken)
    }

    const logout=()=>{
        setUser(null)
        setToken(null)
        localStorage.removeItem("devconnect-user")
        localStorage.removeItem("devconnect-token")
    }
    return(
        <AuthContext.Provider value={{user,token,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth=()=>useContext(AuthContext)
