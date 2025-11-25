import React from 'react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import { useState } from 'react'
const UploadPhoto = ({onUpload}) => {
    const {token}=useAuth()
    const [file,setFile]=useState()
    const handleChange=async ()=>{
        if (!file) return alert("Please select a Photo")
        const formData=new FormData();
        formData.append("photo",file)
        try {
            const res=await axios.post("http://localhost:5000/api/user/upload-photo",formData,{
                headers:{
                    "Content-Type":"multipart/form-data",
                    Authorization:token
                }
            })
            alert("Photo Uploaded successfully")
            onUpload(res.data.profilephoto)

        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
      <input type="file" accept='image/*' onChange={(e)=>setFile(e.target.files[0])} />
      <button onClick={handleChange}>Upload Photo</button>
    </div>
  )
}

export default UploadPhoto
