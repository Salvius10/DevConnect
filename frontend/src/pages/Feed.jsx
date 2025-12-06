import React from 'react'
import { useState,useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { getFeed } from '../api/postApi'

const Feed = () => {
  const {token}=useAuth()
  const [posts,setPosts]=useState([])
  const [loading,setLoading]=useState(true)
  useEffect(()=>{
    const fetchFeed=async ()=>{
      try {
        const data=await getFeed(token)
        setPosts(data)
      } catch (error) {
        console.log("Feed Error",error)
      }finally{
        setLoading(false)
      }
    }
    fetchFeed()
  },[token])
  if (loading) return <p>Loading Feed...</p>
  return (
    <div>
      <h2>Your Feed</h2>
      {posts.length === 0 ? (
          <p>No posts found</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
              <p><b>{post.author.name}</b></p>
              <p>{post.content}</p>

              {post.image && (
                <img
                  src={`http://localhost:5000/${post.image}`}
                  alt="post"
                  width="200"
                />
              )}

              <p>Likes: {post.likes.length}</p>
              <p>Comments: {post.comments.length}</p>
            </div>
          ))
        )}
    </div>
  )
}

export default Feed
