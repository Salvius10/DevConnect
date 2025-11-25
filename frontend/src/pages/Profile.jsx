import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {useAuth} from "../context/AuthContext"
import axios from 'axios'
import { Link } from "react-router-dom";
import UploadPhoto from './UploadPhoto'
const Profile = () => {
    const {user,token}=useAuth()
    const [profile,setProfile]=useState(null)
    useEffect(()=>{
        const fetchProfile=async ()=>{
            try {
                const res=await axios.get(`http://localhost:5000/api/user/${user.id}`,
                    {headers:{
                        Authorization:token
                    }}
                )
                setProfile(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchProfile()
    },[user,token])
    if (!profile) return <p>Loading ...</p>;
  return (
    <div>
        <h2>My Profile</h2>
        {profile.profilephoto? (
            <img 
            src={`http://localhost:5000/${profile.profilephoto}`}
            alt='Profile'
            width="120"
            />
        ): (
        <p>No profile photo uploaded.</p>
        )}
        <UploadPhoto
        onUpload={(newPath) => {
          setProfile({ ...profile, profilephoto: newPath });
        }}
      />
        <p><b>Name:</b> {profile.name}</p>
        <p><b>Email:</b> {profile.email}</p>
        <p><b>Bio:</b> {profile.bio}</p>
        <p><b>Skills:</b>{profile.skills.join(',')}</p>
        <p><b>Location:</b> {profile.location}</p>
        <p><b>Github:</b> {profile.github}</p>
        <br />
        <Link to="/edit-profile">
            <button>Edit Profile</button>
        </Link>

    </div>
  )
}

export default Profile
