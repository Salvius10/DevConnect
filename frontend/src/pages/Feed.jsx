import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getFeed } from "../api/postApi";
import PostCard from "../components/PostCard";

const Feed = () => {
  const { token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const data = await getFeed(token);
        setPosts(data);
      } catch (err) {
        console.log("FEED ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, [token]);

  if (loading) return <p>Loading feed...</p>;

  return (
    <div>
      <h2>Your Feed</h2>

      {posts.length === 0 ? (
        <p>No posts from you or people you follow.</p>
      ) : (
        posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))
      )}
    </div>
  );
};

export default Feed;
