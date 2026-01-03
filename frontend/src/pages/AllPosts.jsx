import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getAllPosts } from "../api/postApi";
import PostCard from "../components/PostCard";

const AllPosts = () => {
  const { token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts(token);
        setPosts(data);
      } catch (err) {
        console.log("ALL POSTS ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [token]);

  if (loading) return <p>Loading posts...</p>;

  return (
    <div>
      <h2>All Posts</h2>

      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))
      )}
    </div>
  );
};

export default AllPosts;
