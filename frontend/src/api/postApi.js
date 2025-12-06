import axios from "axios"

const API_URL="http://localhost:5000/api/posts"

export const createPost=async (token,formdata)=>{
    const res=await axios.post(API_URL,formdata,{
        headers:{
            Authorization:token,
            "Content-Type":"multipart/form-data",
        }
    })
    return res.data
}

export const getFeed=async (token)=>{
    const res=await axios.get(`${API_URL}/feed`,{headers:
        {Authorization:token}
    })
    return res.data
}

export const getAllPosts=async (token)=>{
    const res=await axios.get(`${API_URL}/all`,{headers:{
        Authorization:token
    }})
    return res.data
}

export const likePost=async (token,postId)=>{
    const res=await axios.put(`${API_URL}/like/${postId}`,{},{
        headers:{Authorization:token}
    })
    return res.data
}

export const addComment=async (token,postId,content)=>{
    const res=await axios.post(`${API_URL}/comment/${postId}`,{content},{
        headers:{Authorization:token}
    })
    return res.data
}