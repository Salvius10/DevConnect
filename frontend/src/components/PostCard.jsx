import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { likePost, addComment } from "../api/postApi";

const PostCard = ({ post }) => {
  const { token, user } = useAuth();

  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    try {
      const updatedPost = await likePost(token, post._id);
      setLikes(updatedPost.likes);
    } catch (err) {
      console.log("LIKE ERROR:", err);
    }
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;

    try {
      setLoading(true);
      const updatedPost = await addComment(token, post._id, commentText);
      setComments(updatedPost.comments);
      setCommentText("");
    } catch (err) {
      console.log("COMMENT ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  const isLiked = likes.includes(user.id);

  return (
    <div style={{ border: "1px solid #ccc", padding: 12, marginBottom: 15 }}>
      <p><b>{post.author.name}</b></p>
      <p>{post.content}</p>

      {post.image && (
        <img
          src={`http://localhost:5000/${post.image}`}
          alt="post"
          width="220"
        />
      )}

      {/* Like */}
      <div style={{ marginTop: 8 }}>
        <button onClick={handleLike}>
          {isLiked ? "Unlike" : "Like"}
        </button>
        <span style={{ marginLeft: 10 }}>
          {likes.length} Likes
        </span>
      </div>

      {/* Comments */}
      <div style={{ marginTop: 10 }}>
        <input
          type="text"
          placeholder="Write a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button onClick={handleComment} disabled={loading}>
          {loading ? "Posting..." : "Comment"}
        </button>
      </div>

      {/* Comment List */}
      <div style={{ marginTop: 10 }}>
        {comments.map((c, index) => (
          <p key={index}>
            <b>{c.user?.name}</b>: {c.text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default PostCard;
