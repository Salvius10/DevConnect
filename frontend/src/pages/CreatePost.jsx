import React from 'react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { createPost } from '../api/postApi'
import { useNavigate } from 'react-router-dom'
const CreatePost = () => {
    const {token}=useAuth()
    const navigate=useNavigate()
    const [content,setContent]=useState("")
    const [image,setImage]=useState(null)
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState("")
    const handleSubmit=async (e)=>{
        e.preventDefault()
        setError("")
        if (!content && !image){
            setError("Write something or add an image")
            return
        }
        try {
            setLoading(true)
            const formData=new FormData()
            formData.append("content",content)
            if (image){
                formData.append("image",image)
            }
            await createPost(token,formData)
            alert("Post created successfully")
            setContent("")
            setImage(null)
            navigate("/")
        } catch (err) {
            console.error(err)
            setError("Failed to create post")
        }finally{
            setLoading(false)
        }

    }
  return (
    <div>
        <h2>Create Post</h2>
        {error && <p style={{color:"red"}}>{error}</p>}
        <form onSubmit={handleSubmit}>
            <div>
                <textarea 
                placeholder="What's on your mind?"
                value={content}
                onChange={(e)=>setContent(e.target.value)}
                rows={4}
                cols={40}
                />
            </div>
            <div>
                <input 
                type="file"
                accept="image/*"
                onChange={(e)=>setImage(e.target.files[0])}
                />
            </div>
            <button type='submit' disabled={loading}>{loading? "Posting":"Post"}</button>
        </form>
    </div>
  )
}
export default CreatePost
