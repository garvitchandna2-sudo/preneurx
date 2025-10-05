import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/Context";
import Loading from'./Loading';
import axios from "axios";

function ClassClash() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [myPostId, setMyPostId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (!user || !user.school || !user.classLevel) return;

        const res = await axios.get(
          `https://backend-gpe5.onrender.com/api/student/class-clash/${user.school}/${user.classLevel}`
        );

        setPosts(res.data);
        const myPost = res.data.find(p => p.studentId._id === user._id);
        if (myPost) setMyPostId(myPost._id);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching class clash posts", err);
      }
    };

    fetchPosts();
  }, [user]);

  const vote = async (postId, type) => {
    console.log(type);
    try {
      await axios.post(`https://backend-gpe5.onrender.com/api/student/${type}`, {
        postId,
      });

      // Update vote count locally
      setPosts(prev =>
        prev.map(p =>
          p._id === postId
            ? {
                ...p,
                voteCount: type === "vote" ? p.voteCount + 1 : p.voteCount,
                superVoteCount: type === "super-vote" ? p.superVoteCount + 1 : p.superVoteCount,
              }
            : p
        )
      );
    } catch (err) {
      alert("Error casting vote");
    }
  };

  if (loading) return <p><Loading/></p>;

  return (
    <div>
      <h2>Class Clash - Round 1</h2>
      <div style={{ padding: 20 }}>
        {posts.map(post => (
          <div
            key={post._id}
            style={{
              border: "1px solid #ccc",
              marginBottom: 20,
              padding: 15,
              borderRadius: 10,
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={post.studentId.profilePic}
                alt="profile"
                style={{ width: 50, height: 50, borderRadius: "50%", marginRight: 15 }}
              />
              <div>
                <h3 style={{ margin: 0 }}>{post.studentId.name}</h3>
                <p style={{ margin: 0 }}>{post.studentId.school}</p>
              </div>
            </div>
            <p style={{ marginTop: 10 }}>{post.content}</p>
            <p>Votes: {post.voteCount} | Super Votes: {post.superVoteCount}</p>

            {post._id !== myPostId && (
              <>
                <button onClick={() => vote(post._id, "vote")}>Vote</button>
                <button onClick={() => vote(post._id, "super-vote")}>Super Vote</button>
              </>
            )}

            {post._id === myPostId && <p>(Your Post)</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClassClash;
