import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getAllPosts } from "../api/postApi";

const AllPosts = () => {
  const { token } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts(token);
        setPosts(data);
      } catch (err) {
        console.log("ALL POSTS ERROR:", err);
      }
    };

    fetchPosts();
  }, [token]);

  return (
    <div>
      <h2>All Posts</h2>

      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
            }}
          >
            <p>
              <b>{post.author?.name}</b>
            </p>

            <p>{post.content}</p>

            {post.image && (
              <img
                src={`http://localhost:5000/${post.image}`}
                alt="post"
                width="250"
              />
            )}

          </div>
        ))
      )}
    </div>
  );
};

export default AllPosts;
