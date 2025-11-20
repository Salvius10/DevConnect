import React from 'react'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const {login}=useContext(AuthContext)
    const navigate=useNavigate()
    const [form,setForm]=useState({
        email:"",
        password:""
    })
    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }
    const handleSubmit=async (e)=>{
        e.preventDefault()
        const res=await axios.post("http://localhost:5000/api/auth/login",form)
        login(res.data.user,res.data.token)
        navigate("/")
    }
  return (
    <div>
      <h2>Login</h2>
      <form action="" onSubmit={handleSubmit}>
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder='Enter your email' />
        <input type="password" name="password" value={form.password} onChange={handleChange} placeholder='Enter your password' />
        <button>Login</button>
      </form>
    </div>
  )
}

export default Login
