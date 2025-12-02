const Post=require("../models/Post.js")

exports.createPost=async (req,res)=>{
    try {
        const {content}=req.body
        const image=req.file?req.file.path:""
        const post=new Post({
            author:req.user,
            content,
            image,
        })
        await post.save()
        res.jon(post)
    } catch (err) {
        res.status(500).json({error:error.message})
    }
}

exports.getAllPosts=async (req,res)=>{
    try {
        const post=(await Post.find().populate("author","name email profilephoto")).sort({createdAt:-1})
        res.json(post)
    } catch (err) {
        res.status(500).json({error:err.message})
    }
}

exports.getFeed=async (req,res)=>{
    try {
        const following=req.userFollowing
        const userId=req.user
        const post=await Post({
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