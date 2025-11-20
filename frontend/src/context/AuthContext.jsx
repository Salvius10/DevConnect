import React from 'react'
import { useContext } from 'react'
import { useState,createContext } from 'react'

export const AuthContext=createContext()

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(JSON.parse(localStorage.getItem("devconnect-user")) || null)
    const [token,setToken]=useState(localStorage.getItem("devconnect-token") || null)

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
