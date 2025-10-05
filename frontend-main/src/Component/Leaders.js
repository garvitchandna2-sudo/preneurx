
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/Context';
import Studentnav from '../Component/Studentnav';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function Leaders() {
  const { user } = useAuth();
  const [leaders, setLeaders] = useState([]);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const introTimer = setTimeout(() => setShowIntro(false), 2500);
    return () => clearTimeout(introTimer);
  }, []);

  useEffect(() => {
    if (!user || !user.school || !user.classLevel) return;

    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get(
          `https://backend-gpe5.onrender.com/api/student/class-clash/${user.school}/${user.classLevel}`
        );

        const sorted = res.data
          .map((post) => ({
            id: post._id,
            name: post.studentId.name,
            profilePic: post.studentId.profilePic,
            votes: post.voteCount || 0,
            superVotes: post.superVoteCount || 0,
            finalScore: (post.voteCount || 0) + (post.superVoteCount || 0) * 5,
          }))
          .sort((a, b) => b.finalScore - a.finalScore);

        setLeaders(sorted);
      } catch (err) {
        console.error('Error loading leaderboard:', err);
      }
    };

    fetchLeaderboard();
  }, [user]);

  if (showIntro) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-white">
        <DotLottieReact
          src="https://lottie.host/e382ba8e-e4cf-4b69-95a5-19cc072edd4c/lkNxjwfPRz.lottie"
          autoplay
          loop
          style={{
            width: '100%',
            height: '100%',
            maxWidth: '500px',
            maxHeight: '500px',
          }}
        />
      </div>
    );
  }

  return (
    <>
      <Studentnav />
      <div className="max-w-4xl mx-auto px-4 py-6 animate-fade-in">
        <table className="w-full border rounded-lg overflow-hidden shadow">
          <thead className="bg-[#083ca0] text-white">
            <tr>
              <th className="p-2">Rank</th>
              <th className="p-2">Name</th>
              <th className="p-2">Final Points</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {leaders.map((student, index) => (
              <tr key={student.id} className="text-center border-t">
                <td className="font-semibold">
                  {index === 0 ? (
                    <div className="w-[60px] h-[60px] mx-auto">
                      <DotLottieReact
                        src="https://lottie.host/cf9b31db-07ba-47c3-8bb7-13401b6544da/LUXIsc5vYU.lottie"
                        autoplay
                        loop
                        style={{ width: '100%', height: '100%' }}
                      />
                    </div>
                  ) : index === 1 ? (
                    <span className="text-2xl">🥈</span>
                  ) : index === 2 ? (
                    <span className="text-2xl">🥉</span>
                  ) : (
                    index + 1
                  )}
                </td>
                <td className="p-2 flex items-center justify-center gap-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={student.profilePic}
                      alt={student.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span>{student.name}</span>
                  </div>
                </td>
                <td className="p-2 font-bold text-[#083ca0]">
                  {student.finalScore}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ✅ PERFORMANCE REPORT SECTION WITH LOTTIE */}
        {user && leaders.length > 0 && (() => {
          const currentUser = leaders.find(l => l.name === user.name);
          const currentIndex = leaders.findIndex(l => l.name === user.name);
          const nextRank = currentIndex > 0 ? leaders[currentIndex - 1] : null;
          const pointsBehind = nextRank ? nextRank.finalScore - currentUser.finalScore : 0;

          return (
            <div className="mt-8 p-4 border rounded shadow bg-[#f7f9fc] flex justify-between items-start gap-4">
              {/* Text Part */}
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-[#083ca0] mb-3 w-[250px]">Your Performance Summary</h2>
                <p><strong>Your Final Rank:</strong> {currentIndex + 1}</p>
                <p><strong>Total Points Scored:</strong> {currentUser.finalScore}</p>
                <p><strong>Total Votes Received:</strong> {currentUser.votes}</p>
                <p><strong>Total Super Votes:</strong> {currentUser.superVotes}</p>

                {nextRank && (
  <p className="mt-2 text-sm text-gray-700">
    You were just <strong>{pointsBehind }</strong> point{pointsBehind + 1 > 1 ? 's' : ''} behind <strong>{nextRank.name}</strong>.
  </p>
)}


                {currentIndex > 2 && (
                  <p className="text-sm text-yellow-600 mt-1">
                    You were just {currentIndex - 2} rank{currentIndex - 2 > 1 ? 's' : ''} away from the Top 3.
                  </p>
                )}

                {currentIndex === 0 && (
                  <p className="text-green-600 font-semibold mt-1">🔥 You were the Top Performer!</p>
                )}

                {currentIndex <= 2 && (
                  <p className="mt-2 text-[#083ca0] font-semibold">
                    🏆 Congratulations! You will receive a <strong>Certificate of Participation.</strong>.
                  </p>
                )}
              </div>

              
            </div>
          );
        })()}
      </div>
    </>
  );
}

export default Leaders;
