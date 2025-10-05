import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/Context";
import Studentnav from "../Component/Studentnav";
import Footer from "../Component/Footer";
import Loading from "../Component/Loading";


const TeacherVotePage = () => {
  const { user } = useAuth(); // teacher info
  const [posts, setPosts] = useState([]);
  const [votedPostIds, setVotedPostIds] = useState([]);
  const [loading, setLoading] = useState(true);

  const maxVotes = 5;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `https://backend-gpe5.onrender.com/api/teacher/posts/${user?.school}/${user?.class}`
        );
        const data = await res.json();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching posts", err);
      }
    };

    const fetchVoted = async () => {
      try {
        const res = await fetch(
          `https://backend-gpe5.onrender.com/api/teacher/voted/${user?._id}`
        );
        const data = await res.json();
        setVotedPostIds(data || []);
      } catch (err) {
        console.error("Error fetching teacher votes", err);
      }
    };

    if (user?.school && user?.class) {
      fetchPosts();
      fetchVoted();
    }
  }, [user]);

  const handleVote = async (postId) => {
    if (votedPostIds.length >= maxVotes) {
      alert("You have used all 5 votes.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/teacher/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teacherId: user._id,
          postId,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setVotedPostIds([...votedPostIds, postId]);
        setPosts((prev) =>
          prev.map((p) =>
            p._id === postId ? { ...p, teacherVotes: (p.teacherVotes || 0) + 1 } : p
          )
        );
      } else {
        alert(data.message || "Vote failed");
      }
    } catch (err) {
      console.error("Error voting", err);
      alert("Server error");
    }
  };

  return (
    <>
      <Studentnav />

      <div style={{ maxWidth: "1000px", margin: "20px auto", padding: "0 20px" }}>
        <h2 style={{ color: "#083ca0" }}>Teacher Voting</h2>
        <p>
          You can vote for <strong>5 students</strong> from your school and class. Remaining Votes:{" "}
          <strong>{maxVotes - votedPostIds.length}</strong>
        </p>

        {loading ? (
          <p><Loading/></p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            {posts.map((post) => (
              <div
                key={post._id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  padding: "15px",
                  background: "#fff",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <img
                    src={post.studentId.profilePic}
                    alt={post.studentId.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <h4 style={{ margin: 0 }}>{post.studentId.name}</h4>
                    <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
                      {post.studentId.classLevel}
                    </p>
                  </div>
                </div>

                <p style={{ marginTop: "10px", fontSize: "15px" }}>{post.content}</p>

                <p style={{ fontSize: "14px", margin: "10px 0", color: "#083ca0" }}>
                  Teacher Votes: {post.teacherVotes || 0}
                </p>

                <button
                  onClick={() => handleVote(post._id)}
                  disabled={votedPostIds.includes(post._id)}
                  style={{
                    padding: "8px 12px",
                    background: votedPostIds.includes(post._id) ? "#ccc" : "#083ca0",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: votedPostIds.includes(post._id) ? "not-allowed" : "pointer",
                  }}
                >
                  {votedPostIds.includes(post._id) ? "Voted" : "Vote"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default TeacherVotePage;
