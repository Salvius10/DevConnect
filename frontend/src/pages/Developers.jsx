import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
const Developers = () => {
    const {user,token}=useAuth()
    const [developer,setDeveloper]=useState([])
    useEffect(()=>{
         const fetchDeveloper=async ()=>{
            try {
            const res=await axios.get("http://localhost:5000/api/user",{
                headers:{Authorization:token}
            })
            const others = res.data.filter((dev) => dev._id !== user.id);
            setDeveloper(others)
        } catch (error) {
            console.log("DEVELOPER ERROR",error)
        }}
        fetchDeveloper()
    },[token,user.id])
    if (!developer.length) return <p>No Developers found</p>
  return (
    <div>
      <h2>Developers</h2>
      <ul>
        {developer.map((dev)=>(
            <li key={dev._id}>
                <p><b>{dev.name}</b> ({dev.email})</p>
                <Link to={`/developer/${dev._id}`}>View Profile</Link>
            </li>
        ))}
      </ul>
    </div>
  )
}

export default Developers
