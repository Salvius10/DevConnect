import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useParams } from 'react-router-dom'

const DeveloperProfile = () => {
    const {id}=useParams()
    const {token}=useAuth()
    const [profile,setProfile]=useState(null)
    useEffect(()=>{
        const fetchProfiles=async ()=>{
            try {
                const res=await axios.get(`http://localhost:5000/api/user/${id}`,{
                    headers:{Authorization:token}
                })
                setProfile(res.data)
            } catch (error) {
                console.log("DEV PROFILE ERROR",error)
            }    
        }
        fetchProfiles()
    },[id,token])
    if (!profile) return <p>Loading ...</p>
  return (
    <div>
      <h2>{profile.name}'s Profile</h2>
      {profile.profilephoto && (
        <img
        src={`http://localhost:5000/${profile.profilephoto}`}
        alt='Profile'
        width="120"
        />
      )}
      <p><b>Email:</b>{profile.email}</p>
      <p><b>Bio:</b>{profile.bio}</p>
      <p><b>Skills:</b>{profile.skills.join(',')}</p>
      <p><b>Location:</b>{profile.location}</p>
      <p><b>Github:</b>{profile.github}</p>
    </div>
  )
}

export default DeveloperProfile
