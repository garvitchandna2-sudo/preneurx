import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';


const AdminRoundControl = () => {
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedRound, setSelectedRound] = useState("round1");
  const [status, setStatus] = useState({ postingOpen: false, votingOpen: false });

  // Fetch all schools and their round statuses
  useEffect(() => {
    const fetchSchools = async () => {
      const res = await fetch("http://localhost:5000/api/rounds/all");
      const data = await res.json();
      setSchools(data);
      console.log(data);
    };
    fetchSchools();
  }, []);

  // Set status of selected school + round
  useEffect(() => {
    if (selectedSchool && selectedRound) {
      const schoolData = schools.find((s) => s.school === selectedSchool);
      if (schoolData) {
        const roundData = schoolData[selectedRound];
        setStatus(roundData || { postingOpen: false, votingOpen: false });
      }
    }
  }, [selectedSchool, selectedRound, schools]);

  const handleToggle = async (field) => {
    const newValue = !status[field];

    try {
      const res = await fetch("http://localhost:5000/api/rounds/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          school: selectedSchool,
          round: selectedRound,
          [field]: newValue,
        }),
      });

      const updated = await res.json();
      if (res.ok) {
        setStatus((prev) => ({ ...prev, [field]: newValue }));
        toast.success("Updated successfully");
        
      } else {
        toast.info(updated.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Admin: Round Control Panel</h2>

      <div style={{ margin: "20px 0" }}>
        <label>School:</label>
        <select value={selectedSchool} onChange={(e) => setSelectedSchool(e.target.value)}>
          <option value="">-- Select School --</option>
          {schools.map((s) => (
            <option key={s._id} value={s.school}>{s.school}</option>
          ))}
        </select>

        <label style={{ marginLeft: 20 }}>Round:</label>
        <select value={selectedRound} onChange={(e) => setSelectedRound(e.target.value)}>
          <option value="round1">Round 1</option>
          <option value="round2">Round 2</option>
          <option value="finale">Finale</option>
        </select>
      </div>

      <div>
        <p><strong>Posting:</strong> {status.postingOpen ? "OPEN ✅" : "CLOSED ❌"}</p>
        <button onClick={() => handleToggle("postingOpen")}>
          {status.postingOpen ? "Close Posting" : "Open Posting"}
        </button>

        <p><strong>Voting:</strong> {status.votingOpen ? "OPEN ✅" : "CLOSED ❌"}</p>
        <button onClick={() => handleToggle("votingOpen")}>
          {status.votingOpen ? "Close Voting" : "Open Voting"}
        </button>
      </div>
    </div>
  );
};

export default AdminRoundControl;
