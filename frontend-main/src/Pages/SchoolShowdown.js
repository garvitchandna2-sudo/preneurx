import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import search from '../assets/search.png';
import { useAuth } from '../Context/Context';
import axios from 'axios';
import Studentnav from '../Component/Studentnav';
import Loading from '../Component/Loading';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import Footer from '../Component/Footer';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';




function SchoolShowdown() {
  const { user } = useAuth();
  const [width, setWidth] = useState(window.innerWidth);
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState([]);
  const [expandedEntries, setExpandedEntries] = useState({});
  const [myPostId, setMyPostId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [votingOpen, setVotingOpen] = useState(false);
  const [userVotes, setUserVotes] = useState({ votePostId: null, superVotePostId: null });
  const [showLottie, setShowLottie] = useState(false);


  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const getCategory = (classLevel) => {
  return classLevel === "seventh" || classLevel === "eighth" ? "junior" : "senior";
};


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user || !user.school) return;

        const [postsRes, roundRes, voteRes] = await Promise.all([
  axios.get(`https://backend-gpe5.onrender.com/api/student/round2-posts/${user.school}/${getCategory(user.classLevel)}`),
  axios.get(`https://backend-gpe5.onrender.com/api/rounds/school/${user.school}`),
  axios.get(`https://backend-gpe5.onrender.com/api/student/vote-status/${user._id}/2`),
]);
console.log(postsRes);
        console.log(roundRes);
        console.log(user);
        console.log(user.classLevel);
        

        setPosts(postsRes.data);
        const myPost = postsRes.data.find(p => p.studentId._id === user._id);
        if (myPost) setMyPostId(myPost._id);

        setVotingOpen(roundRes.data.round2.votingOpen);
        setUserVotes(voteRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching round 2 data:", err);
      }
    };
    fetchData();
  }, [user]);

  const vote = async (postId, type) => {
  if (userVotes.votePostId === postId && type === 'super-vote') {
    return alert("You can't super vote the same post you voted for.");
  }
  if (userVotes.superVotePostId === postId && type === 'vote') {
    return alert("You can't vote the same post you super voted for.");
  }

  try {
    // 👇 Show animation instantly
    setShowLottie(true);

    await axios.post(`https://backend-gpe5.onrender.com/api/student/${type}`, {
      postId,
      studentId: user._id,
      round: 2
    });

    // 👇 Hide animation after 1.7s
    setTimeout(() => setShowLottie(false), 1000);

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

    setUserVotes(prev => ({
      ...prev,
      votePostId: type === "vote" ? postId : prev.votePostId,
      superVotePostId: type === "super-vote" ? postId : prev.superVotePostId,
    }));
  } catch (err) {
    setShowLottie(false); // hide animation on error too
    alert("Error casting vote");
  }
};


  const toggleEntry = (id) => {
    setExpandedEntries(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const maxLength = 150;
  const filteredStudents = posts.filter(student =>
    student.studentId.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p><Loading/></p>;

 if (!votingOpen) return (
  <>
    <Studentnav />
    <div style={{
      height: '85vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      background: '#ffffff',
      paddingTop: '80px',
      textAlign: 'center',
    }}>
      <DotLottieReact
        src="https://lottie.host/086e1eb5-8e39-43c8-9fa9-1c86c384ce5a/ZmwC0mRyj6.lottie"
        loop
        autoplay
        style={{ width: 300, height: 300 }}
      />
      <h2 style={{
        fontSize: '1.5rem',
        fontFamily:'Plus Jakarta Sans',
        marginTop: '20px',
fontWeight:'600',

        background: 'linear-gradient(to right, #083ca0, black)',
        WebkitBackgroundClip: 'text',
        color: 'transparent'

      }}>
        Voting Round Not Active
      </h2>
      <p style={{ fontSize: '1rem', color: '#666', marginTop: '0px',fontFamily:'Nunito' }}>
        Please come back later. Voting will open soon.
      </p>
    </div>
  </>
);

  return (
    <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', background: '#f5f8fa', color: '#333', margin: 0 }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px', background: 'white', position: 'sticky', top: 0, zIndex: 1000 }}>
<Link to="/">
        <img src={logo} alt="Company Logo" className="logo" />
        </Link>        <div style={{ position: 'relative', flex: 1, maxWidth: `${50 * width / 100}px`, fontVariantCaps: 'pettie-caps' }}>
          <img
            src={search}
            alt="logo"
            style={{
              position: 'absolute',
              top: '50%',
              left: '10px',
              transform: 'translateY(-50%)',
              height: '20px',
              width: '20px',
            }}
          />
          <input
            type="text"
            placeholder="Search Preneurs"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '6px 1px 5px 35px',
              border: '2px solid',
              borderImage: 'linear-gradient(to right, #083ca0, black) 1',
              borderRadius: '5px',
              fontSize: '15px',
              backgroundSize: '18px 18px',
              width: '100%',
              fontVariantCaps: 'petite-caps'
            }}
          />
        </div>
      </header>

      <hr />

      <div className="navbar1" style={{ background: '#f5f8fa', margin: '0px', padding: '0px' }}>
        <div className="nav-links1">
          <Link to="/dashboard">Profile</Link>
          <Link to="/classclash">Class Clash</Link>
          <Link to="/round2">School Showdown</Link>
          <Link to="/finale">PreneurX Talent Clash</Link>
          <Link to="/rule">Rules</Link>
        </div>
      </div>

      <hr />

      <main style={{ maxWidth: 1000, margin: '0 auto', padding: 0 }}>
        <h1 style={{ textAlign: 'center', fontSize: '1.8rem', fontWeight: 700, background: 'linear-gradient(to right, #083ca0, black)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
          ROUND-2<br />School Showdown
        </h1>
        <p style={{ textAlign: 'center', fontSize: '1rem', marginBottom: 16 }}>Vote for the best talent from your school! Top 20 make it to the finale.</p>

        <div style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', margin: '10px', gap: '20px' }}>
          {filteredStudents.map(post => {
            const isLong = post.content.length > maxLength;
            const shortText = post.content.slice(0, maxLength) + '...';
            const isExpanded = expandedEntries[post._id];
            const isMyPost = post._id === myPostId;

            return (
              <div key={post._id} style={{ background: 'white', padding: 15, borderRadius: 10, boxShadow: '0 2px 5px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'flex-start', gap: '12px', margin: '20px' }}>
                <img src={post.studentId.profilePic} alt={post.studentId.name} style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: '50%' }} />
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0, fontSize: 18, background: 'linear-gradient(to right, #083ca0, black)', WebkitBackgroundClip: 'text', color: 'transparent', marginBottom: '-6px' }}>{post.studentId.name}</h3>
                  <p style={{ margin: 0, fontSize: 16, fontWeight: 200, color: '#515151' }}>{post.studentId.school}</p>
                  <p style={{ fontSize: '0.85rem', marginTop: 8, color: 'black', lineHeight: 1.4, fontFamily: 'Letter Mono Variable, monospace', fontWeight: 100 }}>
                    {isLong ? (isExpanded ? post.content : shortText) : post.content}
                    {isLong && (
                      <span
                        onClick={() => toggleEntry(post._id)}
                        style={{ color: '#083ca0', fontWeight: 600, cursor: 'pointer', marginLeft: 5 }}
                      >
                        {isExpanded ? 'Show Less' : 'Read More'}
                      </span>
                    )}
                  </p>
                  {!isMyPost && (
                    <>
                      <button
  onClick={(e) => {
    const disabled =
      !votingOpen ||
      userVotes.votePostId !== null ||
      userVotes.superVotePostId === post._id;

    if (disabled) {
      toast.info(
    !votingOpen
      ? 'Voting is currently closed.'
      : userVotes.votePostId !== null
        ? 'Your vote has been recorded and cannot be changed.'
        : 'You cannot vote for a post you super voted for.',
    {
      style: {
        background: 'linear-gradient(to right,black,  #083ca0)',
        color: '#fff',
        fontWeight: 'bold',
        borderRadius: '6px',
        padding: '12px 16px',
      },
      progressStyle: {
        background: 'orange',
      }
    }
  );
      return;
    }

    vote(post._id, 'vote');
  }}
  style={{
    background:
      !votingOpen ||
      userVotes.votePostId !== null ||
      userVotes.superVotePostId === post._id
        ? 'gray'
        : 'linear-gradient(to right, #083ca0, black)',
    color: 'white',
    marginRight: 5,
    padding: '6px 12px',
    border: 'none',
    borderRadius: 5,
    marginTop: 8,
    fontWeight: 600,
    cursor:
      !votingOpen ||
      userVotes.votePostId !== null ||
      userVotes.superVotePostId === post._id
        ? 'not-allowed'
        : 'pointer',
    fontSize: '0.85rem',
    opacity:
      !votingOpen ||
      userVotes.votePostId !== null ||
      userVotes.superVotePostId === post._id
        ? 0.6
        : 1,
  }}
>
  Vote
</button>

                      <button
  onClick={(e) => {
    const disabled =
      !votingOpen ||
      userVotes.superVotePostId !== null ||
      userVotes.votePostId === post._id;

    if (disabled) {
      toast.info(
    !votingOpen
      ? 'Voting is currently closed.'
      : userVotes.superVotePostId !== null
        ? 'You have already used your super vote.'
        : 'You cannot super vote a post you voted for.',
    {
      style: {
        background: 'linear-gradient(to right, black, #083ca0)',
        color: '#fff',
        fontWeight: 'bold',
        borderRadius: '6px',
      },
      progressStyle: {
        background: 'orange',
      }
    }
  );
      return;
    }

    vote(post._id, 'super-vote');
  }}
  style={{
    background:
      !votingOpen ||
      userVotes.superVotePostId !== null ||
      userVotes.votePostId === post._id
        ? 'gray'
        : 'linear-gradient(to right, rgb(219, 107, 28), orange)',
    color: 'white',
    padding: '6px 12px',
    border: 'none',
    borderRadius: 5,
    marginLeft:8,
    fontWeight: 600,
    cursor:
      !votingOpen ||
      userVotes.superVotePostId !== null ||
      userVotes.votePostId === post._id
        ? 'not-allowed'
        : 'pointer',
    fontSize: '0.85rem',
    opacity:
      !votingOpen ||
      userVotes.superVotePostId !== null ||
      userVotes.votePostId === post._id
        ? 0.6
        : 1,
  }}
>
  Super Vote
</button>

                    </>
                  )}
                  {isMyPost && <p style={{ fontWeight: 600, color: '#777' }}>(Your Post)</p>}
                </div>
              </div>
            );
          })}
        </div>
      </main>
{showLottie && (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(255,255,255,0.9)',
    zIndex: 99999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  }}>
    <DotLottieReact
      src="https://lottie.host/80f10271-575c-481f-9cc9-03a57d8ee395/1To76lViNr.lottie"
      autoplay
      loop={false}
      speed={1}  // optional, you can remove or change this
      style={{ width: 220, height: 220 }}
    />
  </div>
)}

      <Footer/>
    </div>
    
  );
}

export default SchoolShowdown;
