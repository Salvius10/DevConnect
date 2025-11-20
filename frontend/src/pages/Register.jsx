import React from 'react'
import axios from "axios"
import { useContext,useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Register = () => {
    const [form,setForm]=useState({
        name:"",
        email:"",
        password:""
    })
    const navigate=useNavigate()
    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }
    const handleSubmit= async (e)=>{
        e.preventDefault()
        const res=await axios.post("http://localhost:5000/api/auth/register",form)
        navigate("/login")
        alert("Registered Successfully!")
    }
  return (
    <div>
      <h2>Register</h2>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" value={form.name} name="name" onChange={handleChange} placeholder='Enter your name'/>
        <input type="email" value={form.email} name="email" onChange={handleChange} placeholder='Enter your email' />
        <input type="password" value={form.password} name="password" onChange={handleChange} placeholder='Enter your password'/>
        <button>Register</button>
      </form>
    </div>
  )
}

export default Register
