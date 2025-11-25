import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
const EditPage = () => {
    const {user,token}=useAuth()
    const navigate=useNavigate()
    const [profile,setProfile]=useState({
        bio:"",
        skills:"",
        location:"",
        github:""
    })
    useEffect(()=>{
        const fetchProfile=async ()=>{
                const res=await axios.get(`http://localhost:5000/api/user/${user.id}`,{
                    headers:{
                        Authorization:token
                }})
                setProfile({
                    bio:res.data.bio,
                    skills:res.data.skills.split(',').map((s)=>s.trim()),
                    location:res.data.location,
                    github:res.data.github
                })
        }
        fetchProfile()
    },[])

    const handleChange=(e)=>{
        setProfile({...profile,[e.target.name]:e.target.value})
    }
    const handleSubmit=async (e)=>{
        e.preventDefault()
        const res=await axios.put("http://localhost:5000/api/user/update",{
            bio:profile.bio,
            skills:profile.skills.split(",").map((s)=>s.trim()),
            location:profile.location,
            github:profile.github
        },
    {
        headers:{
            Authorization:token
        }
    })
    alert("Profile Updated")
    navigate("/profile")
    }
  return (
    <div>
      <div>
        <h2>Edit Profile</h2>

        <form onSubmit={handleSubmit}>
            <div>
            <label>Bio: </label>
            <input
                name="bio"
                value={profile.bio}
                onChange={handleChange}
            />
            </div>

            <div>
            <label>Skills (comma separated): </label>
            <input
                name="skills"
                value={profile.skills}
                onChange={handleChange}
            />
            </div>

            <div>
            <label>Location: </label>
            <input
                name="location"
                value={profile.location}
                onChange={handleChange}
            />
            </div>

            <div>
            <label>GitHub Link: </label>
            <input
                name="github"
                value={profile.github}
                onChange={handleChange}
            />
            </div>

            <button type="submit">Save Changes</button>
        </form>
        </div>
    </div>
  )
}

export default EditPage
