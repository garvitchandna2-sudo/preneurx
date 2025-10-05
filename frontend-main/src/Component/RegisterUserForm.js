import React, { useState } from "react";

const RegisterUserForm = () => {
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState("");
  const [school, setSchool] = useState("Saraswati Vidya Mandir");
  const [classLevel, setClassLevel] = useState("Sixth");
  const [section, setSection] = useState("A");

  const sectionOptions = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
  const schoolOptions = ["Saraswati Vidya Mandir", "b", "c", "x", "y", "z", "x"];
  const classOptions = ["Sixth", "Seventh", "Eighth", "Ninth", "Tenth", "Eleventh", "Twelth"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      role,
      name,
      mobile,
      dob,
      school,
      classLevel: role === "student" ? classLevel : null,
      section: role === "student" ? section : null, // ADD THIS
    };


    try {
      const res = await fetch("http://localhost:5000/api/admin/register-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        
        body: JSON.stringify(payload),
      });
      console.log("Body is here ",payload);

      const data = await res.json();
      if (res.ok) {
        alert("User registered successfully");
        setName("");
        setMobile("");
        setDob("");
        setSchool("Saraswati Vidya Mandir");
        setClassLevel("Seventh");
        setSection("A")
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Server error");
    }
  };

  return (
    <div style={{ marginTop: "30px", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h3>Register Student/Teacher</h3>
      <form onSubmit={handleSubmit}>
        <label>Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        <br /><label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <br /><label>Mobile</label>
        <input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} required />

        <br /><label>DOB</label>
        <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />

        <br /><label>School</label>
        <select value={school} onChange={(e) => setSchool(e.target.value)} required>
          {schoolOptions.map((s) => (
            <option key={s} value={s}>{s.toUpperCase()}</option>
          ))}
        </select>

        {role === "student" && (
          <>
            <br /><label>Class</label>
            <select value={classLevel} onChange={(e) => setClassLevel(e.target.value)} required>
              {classOptions.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <br /><label>Section</label>
            <select value={section} onChange={(e) => setSection(e.target.value)} required>
              {sectionOptions.map((sec) => (
                <option key={sec} value={sec}>{sec}</option>
              ))}
            </select>
          </>
        )}

        <br /><br />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300">Register</button>
      </form>
    </div>
  );
};

export default RegisterUserForm;
