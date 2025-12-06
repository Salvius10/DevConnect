const Post=require("../models/Post.js")

exports.createPost=async (req,res)=>{
    try {
        if (!req.body) {
        return res.status(400).json({ msg: "Form data not received" });
        }
        const {content}=req.body
        const image=req.file?req.file.path:""
        const post=new Post({
            author:req.user,
            content,
            image,
        })
        await post.save()
        res.json(post)
    } catch (err) {
        res.status(500).json({error:err.message})
    }
}

exports.getAllPosts=async (req,res)=>{
    try {
        const post=await Post.find().populate("author","name email profilephoto").sort({createdAt:-1})
        res.json(post)
    } catch (err) {
        res.status(500).json({error:err.message})
    }
}

exports.getFeed=async (req,res)=>{
    try {
        const following=req.userFollowing || []
        const userId=req.user
        const post=await Post.find({
            author:{$in:[...following,userId]}
        }).populate("author","name email profilephoto").sort({createdAt:-1})
        res.json(post)
    } catch (err) {
        res.status(500).json({error:err.message})
    }
}

exports.toggleLike=async (req,res)=>{
    try {
        const post=await Post.findById(req.params.id)
        if (!post.likes.includes(req.user)){
            post.likes.push(req.user)
        }else{
            post.likes=post.likes.filter(id=>id.toString()!==req.user)
        }
        await post.save()
        res.json(post)
    } catch (err) {
        res.status(500).json({error:err.message})
    }
}

exports.addComment=async (req,res)=>{
    try {
        const post=await Post.findById(req.params.id)
        post.comments.push({
            user:req.user,
            text:req.body.content
        })
        await post.save()
        res.json(post)
    } catch (err) {
        res.status(500).json({error:err.message})
    }
}

exports.deletePost=async (req,res)=>{
    try {
        const post=await Post.findById(req.params.id)
         if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }
        if (post.author.toString()!==req.user){
            return res.status(403).json({msg:"User not authorized"})
        }
        await post.deleteOne()
        res.json(post)
    } catch (err) {
        res.status(500).json({error:err.message})
    }
}

