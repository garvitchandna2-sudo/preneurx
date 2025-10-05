import React, { useState, useEffect } from 'react';
import Studentnav from '../Component/Studentnav';
import Footer from '../Component/Footer'

function StudentDashboard() {
  // const [dropdownVisible, setDropdownVisible] = useState(false);
  const [post, setPost] = useState('');
  const [posted, setPosted] = useState('');
  const [profilePic, setProfilePic] = useState('');

  const [student, setStudent] = useState(null);
  // const fileInputRef = useRef(null);

    const [openGroup, setOpenGroup] = useState(null);

  const juniorTopics = [
    "If I Had a Superpower to Help People,what would your power be and how would you use it?",
    "A Startup Idea That Can Help India Grow,what’s the idea, and how can it make an impact?",
    "Please tell us about the most impressive thing you have built or achieved.",
    "How Technology is Changing the Way We Learn, Think about online classes, learning apps, and AI tools.",
    "If I Built a City Only for Kids, what would it be like? What rules would you make?"
  ];

  const seniorTopics = [
    "Your team is losing because one person forgot their part.Do you blame, support, or take charge?",
    "My Favourite Scientist and What I Learned from Them, who is your inspiration and what did they discover?",
    "Artificial Intelligence – A Friend or a Threat?What is AI? Where is it used? What are its pros and cons?",
    "A Startup Idea That Can Help India Grow, What’s the idea, and how can it make an impact?",
    "Please tell us about the most impressive thing you have built or achieved."
  ];

  const toggleGroup = (group) => {
    setOpenGroup(openGroup === group ? null : group);
  };


  const getWordCount = (text) => {
  return text.trim().split(/\s+/).filter(Boolean).length;
};


const student1 = JSON.parse(localStorage.getItem("studentUser"));
const studentId = student1?._id;console.log(studentId);
  const styles = {
    body: {
      margin: 0,
      padding: 0,
      background: '#f5f8fa',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      overflowX: 'hidden',
      boxSizing: 'border-box',
    },
    container: {
      maxWidth: '600px',
      width: '90%',
      margin: '50px auto',
      background: 'white',
      borderRadius: '10px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      padding: '20px',
    },
    profileHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '20px',
    },
    profileImage: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      objectFit: 'cover',
    },
    profileText: {
      h3: {
        margin: 0,
        fontSize: '18px',
        background: 'linear-gradient(to right, #083ca0, black)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      },
      p: {
        marginTop: -5,
        fontSize: '16px',
        fontWeight: 'bolder',
        color: '#515151',
      },
    },
    uploadBox: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      alignItems: 'flex-start',
      width: '100%',
    },
    textarea: {
      width: '100%',
      minHeight: '100px',
      padding: '10px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      resize: 'none',
    },
    button: {
      background: 'linear-gradient(to right, #083ca0, black)',
      color: 'white',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '4px',
      fontSize: '14px',
      cursor: 'pointer',
      fontWeight: 'bold',
    },
    postDisplay: {
      marginTop: '20px',
      padding: '10px',
      background: '#f9f9f9',
      borderRadius: '6px',
      width: '100%',
    },
    postActions: {
      marginTop: '10px',
      display: 'flex',
      gap: '10px',
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await fetch(`https://backend-gpe5.onrender.com/api/student/me/${studentId}`);
        const studentData = await profileRes.json();
        console.log(studentData);
        setStudent(studentData);
        setProfilePic(studentData.profilePic || "https://img.freepik.com/premium-vector/profile-picture-placeholder-avatar-silhouette-gray-tones-icon-colored-shapes-gradient_1076610-40164.jpg?semt=ais_hybrid&w=740");

        const postRes = await fetch(`https://backend-gpe5.onrender.com/api/student/post/${studentId}`);
        const postData = await postRes.json();
        if (postData?.content) {
          setPosted(postData.content);
        }
      } catch (err) {
        console.error("Error loading student or post", err);
      }
    };

    if (studentId) fetchData();
  }, [studentId]);

  const handlePostSubmit = async () => {
  const wordCount = getWordCount(post);
  if (!post.trim()) return;

  if (wordCount > 500) {
    alert("Post must be under 500 words.");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/student/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId, content: post.trim() }),
    });

    if (res.ok) {
      setPosted(post.trim());
      setPost('');
    } else {
      alert("Failed to save post");
    }
  } catch (err) {
    console.error("Error saving post", err);
    alert("Server error");
  }
};


  return (
    <>
    <div style={styles.body}>
      <Studentnav />


      


      <div style={styles.container}>
        <div style={styles.profileHeader}>
          <img src={profilePic || "https://img.freepik.com/premium-vector/profile-picture-placeholder-avatar-silhouette-gray-tones-icon-colored-shapes-gradient_1076610-40164.jpg?semt=ais_hybrid&w=740"} alt="Profile" style={styles.profileImage} />
          <div>
            <h3 style={styles.profileText.h3}>{student?.name || "..."}</h3>
            <p style={styles.profileText.p}>{student?.school || "..."}</p>
          </div>
        </div>

        {!posted && (
          <div style={styles.uploadBox}>
            <textarea
  placeholder="Your story, your glory – let’s hear it!"
  style={{
    ...styles.textarea,
    fontFamily: "'Letter Mono Variable', monospace"
  }}
  value={post}
  onChange={(e) => setPost(e.target.value)}
/>


<p style={{ fontSize: '14px', color: getWordCount(post) > 500 ? 'red' : '#555' }}>
  Word Count: {getWordCount(post)} / 500
</p>



            <button style={styles.button} onClick={handlePostSubmit}>
              Post
            </button>
          </div>
        )}

         {posted && (
          <div style={styles.postDisplay}>
            <p>{posted}</p>
            <div style={styles.postActions}>
              <button
                style={styles.button}
                onClick={() => {
                  setPost(posted);
                  setPosted('');
                }}
              >
                Edit
              </button>
              <button
                style={styles.button}
                onClick={() => {
                  setPosted('');
                  setPost('');
                }}
              >
                Delete
              </button>
            </div>
          </div>
        )} 
      </div>
    </div>
          
           <div style={{ display: 'flex', flexDirection: 'column', minHeight: '58vh' }}>
  <main style={{ flex: 1 }}>
    {/* Your page content here */}


    <div style={{ maxWidth: '600px', margin: '20px auto' }}>
  <button
    onClick={() => toggleGroup("junior")}
   style={{
  width: '100%',
  background: 'linear-gradient(to right, black, #083ca0)',
  color: 'white',
  padding: '10px 16px',
  border: 'none',
  borderRadius: '40px',
  fontWeight: 'bold',
  fontSize: '16px',
  cursor: 'pointer'
}}

  >
    Topics for Class 6, 7 and 8
  </button>

  <div style={{
    maxHeight: openGroup === "junior" ? '1000px' : '0',
    overflow: 'hidden',
    transition: 'max-height 0.4s ease',
    background: 'white',
    fontFamily:'Plus Jakarta Sans',
    lineHeight:'1.5',
    borderRadius: '6px',
    padding: openGroup === "junior" ? '10px' : '0'
  }}>
    <ul style={{ margin: 0, padding: 0, listStyle: 'disc', paddingLeft: '20px' }}>
      {juniorTopics.map((topic, idx) => (
        <li key={idx} style={{ marginBottom: '8px' }}>{topic}</li>
      ))}
    </ul>
  </div>

  <button
    onClick={() => toggleGroup("senior")}
    style={{
  width: '100%',
  background: 'linear-gradient(to right, #083ca0,black)',
  color: 'white',
  padding: '10px 16px',
  border: 'none',
  borderRadius: '40px',
  marginTop:'5px',
  fontWeight: 'bold',
  fontSize: '16px',
  cursor: 'pointer'
}}

  >
    Topics for Class 9, 10, 11 and 12
  </button>

  <div style={{
    maxHeight: openGroup === "senior" ? '1000px' : '0',
    overflow: 'hidden',
    fontFamily:'Plus Jakarta Sans',
    lineHeight:'1.5',
    transition: 'max-height 0.4s ease',
    background: 'white',
    borderRadius: '6px',
    padding: openGroup === "senior" ? '10px' : '0'
  }}>
    <ul style={{ margin: 0, padding: 0, listStyle: 'disc', paddingLeft: '20px' }}>
      {seniorTopics.map((topic, idx) => (
        <li key={idx} style={{ marginBottom: '8px' }}>{topic}</li>
      ))}
    </ul>
  </div>
</div>
  </main>

  <footer style={{
    width: 'auto',
    backgroundColor: '#121212',
    color: '#fff',
    textAlign: 'center',
    padding: ' 0'
  }}>
    <Footer />
  </footer>
</div>
          </>
  );
}

export default StudentDashboard;
