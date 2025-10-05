import React from "react";
import piyush from '../assets/piyush.jpg';
import aditya from '../assets/aditya.jpg';
import mukund from '../assets/mukund.jpg';
import yashveer from '../assets/yashveer.jpg';

import Footer from '../Component/Footer';
import Navbar from '../Component/Navbar';




const teamMembers = [
  
  
  {
    name: "Mukund Madhav Tiwari",
    role: "Founder & CEO",
    image: mukund, // Replace with your image path
    bio: "Visionary behind PreneurX, leading the mission to empower students through innovation and talent-based opportunities."
  },
  
  {
    name: "Aditya Raj",
    role: "Co-Founder & CFO",
    image: aditya,
    bio: "Leads financial strategy and ensures sustainable growth at PreneurX. Balances innovation with responsibility, managing budgets that fuel impactful student experiences."
  },
{
    name: "Yashveer Shukla",
    role: "Co-Founder & CMO",
    image: yashveer,
    bio: "Connects PreneurX with thousands of students across India through brilliant communication skills and school outreach."
  },
{
    name: "Piyush Kumar Mishra",
    role: "Co-Founder & CTO",
    image: piyush,
    bio: "Engineer behind the platform's backbone. Makes sure every student interaction is smooth and scalable."
  }
  
];

const TeamSection = () => {
 return (
  
  <>
        <Navbar/>
        <div
  className="w-full"
  style={{
    background: "linear-gradient(135deg, #083ca0, black)",
    color: "#fff",
    padding: "12px 0px", // adjust as needed
    textAlign: "center",
  }}
>
  <h1
    className="text-3xl md:text-4xl font-bold"
    style={{ fontFamily: "Plus Jakarta Sans", margin: 0,fontSize:"30px" }}
  >
    Meet the Team
  </h1>
</div>
<div className="text-center mb-3 mt-3 font-bold">
        

        <p
          className="text-gray-600"
          style={{ fontFamily: "Plus Jakarta Sans" }}
        >
          The people behind PreneurX’s vision, tech, and creativity.
        </p>
      </div>


    <section id="team" className="bg-white pb-12 px-4 md:px-16">
      
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 object-cover rounded-full mx-auto mt-6"
            />
            <div className="p-5 text-center">
              <h3
                className="text-xl font-semibold text-[#083ca0]"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                {member.name}
              </h3>
              <p
                className="text-sm text-gray-500 mb-2"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                {member.role}
              </p>
              <p
                className="text-sm text-gray-700"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                {member.bio}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* ✅ Footer moved inside fragment */}
    <Footer />
  </>
);

  
};


export default TeamSection;
