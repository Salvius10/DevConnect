import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
const Developers = () => {
    const {user,token}=useAuth()
    const [developer,setDeveloper]=useState([])
    const [search,setSearch]=useState("")
    const [skillFilter,setSkillFilter]=useState("")
    const [locationFilter,setLocationFilter]=useState("")
    const [showFilter,setShowFilter]=useState(false)
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
    
    const handleSearch=async ()=>{
      try {
        const res=await axios.get(`http://localhost:5000/api/user/search?name=${search}&skill=${skillFilter}&location=${locationFilter}`,{
          headers:{Authorization:token}
        })
        const others=res.data.filter((dev)=>dev._id!==user.id)
        setDeveloper(others)
      } catch (error) {
       console.log("Search Error",error) 
      }
    }
    useEffect(()=>{
      fetchDeveloper()
    },[token,user.id]) 
    if (!developer.length) return <p>No Developers found</p>
  return (
    <div>
      <h2>Developers</h2>
      <div style={{ marginBottom: "10px" }}>
        <input 
        type="text"
        placeholder='Search'
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        style={{ width: "250px" }}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={()=>setShowFilter(!showFilter)}>Filters ▼</button>
        {showFilter && (
          <div>
            <input type="text"
            placeholder='Filter by skill'
            value={skillFilter}
            onChange={(e)=>setSkillFilter(e.target.value)} />
            <input type="text" 
            placeholder='Filter by location'
            value={locationFilter}
            onChange={(e)=>setLocationFilter(e.target.value)}/>
            <button onClick={handleSearch}>Apply Filters</button>
            <button onClick={()=>{
              setSkillFilter("");
              setLocationFilter("");
              setSearch("");
              fetchDeveloper()
            }}>Reset</button>
          </div>
        )}
      </div>
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
