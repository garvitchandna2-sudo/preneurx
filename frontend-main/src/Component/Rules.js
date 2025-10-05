import React from "react";

const Rules = () => {
  return (
    <div className="bg-gradient-to-br from-[#083ca0] to-black text-white p-6 sm:p-10 font-['Plus Jakarta Sans']">
      <section className="bg-white py-2 rounded-2xl shadow-lg">
        <header className="text-center">
          <h1 className="text-3xl sm:text-5xl font-bold text-[#083ca0]">
            📜PreneurX Talent Clash <br /> Rules & Format
          </h1>
          <p className="mt-2 text-lg sm:text-xl text-black">
            Unleashing Young Stars of the District
          </p>
        </header>
      </section>

      <br />

      <main className="max-w-5xl mx-auto space-y-8">
        {/* General Rules */}
        <section className="bg-white text-black p-6 sm:p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-[#083ca0] mb-4 border-l-4 border-[#083ca0] pl-3">
            General Rules
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            
            <li>
Calling All Trailblazers from Class 6th to 12th!<br/>
Step up. Show up. Stand out.<br/>
One platform. Separate competitions for each class.<br/>
Your class. Your stage. Your moment to shine.              
            </li>
            <li>
              All participants are required to register through their schools
              before the deadline. Credentials will be provided by the school
              administration.
            </li>
            <li>
All registered participants are eligible to cast one vote and one super vote for their favourite contestants.            </li>
            <li>Participants cannot vote for themselves at any stage.</li>
            <li>
                 A <strong>Super Vote</strong> isn’t just a vote — it’s a game-changer which is equal to <strong>5 regular votes</strong>
                , it can dramatically shift the leaderboard and spotlight true talent.            </li>
            <li>
                  Every participant will be awarded a <strong>Certificate of Participation </strong>
                  and a personalized performance report showcasing their total votes and overall impact in the competition.            </li>
            <li>Inappropriate content leads to disqualification.</li>
          </ul>
        </section>

        {/* Voting Rules */}
        <section className="bg-white text-black p-6 sm:p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-[#083ca0] mb-4 border-l-4 border-[#083ca0] pl-3">
            Voting Rules
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-[#083ca0] mb-2">
                🌀 Class Clash
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Students vote within their own class to their favourite classmates.</li>
                <li>1 vote + 1 super vote per student.( 1 super vote = 5 normal votes.)</li>
                <li>Teachers get 5 votes (1 per student).</li>
                 <li>Winners will be determined based on the number of votes received. 
                    A leaderboard will be displayed after the competition, and each student will receive a detailed analysis of their performance.</li>                   
                    <li>Everyone gets Certificate of Participation.</li>
                    <li>Students will have two days to vote for their favourite contestant.</li>
                    <li>Winners will be featured on our website and official Deoria’s Instagram handle along with school name (1Lakh+Followers)</li>
                 </ul>
            </div>
            </div>
        </section>

        <section className="bg-white text-black p-6 sm:p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-[#083ca0] mb-4 border-l-4 border-[#083ca0] pl-3">
How To Participate?          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <p>🔹 Step 1: Choose Your Topic</p>
            <p>1) We’ll give you 5 exciting topics to choose from — topics that matter to your generation!<br/>
            2) Examples may include:</p>
            <li>"What Shark Tank India Taught Me About Business"</li>
            <li>"My Dream Startup: From Idea to Reality"</li>
            <p>🔹 Step 2: Create Your Entry</p>
            <p>1)You can write upto 500 words.<br/>2) Feel free to be as original and bold as you want — we’re looking for your authentic voice.</p>
            <p>🔹 Step 3: Post via the Website</p>
            <p>🔹 Step 4: Get Noticed & Voted</p>
            <p>1) After submission, your entry will be reviewed and published on the platform.<br/>
                2) Other students and teachers will view, support, and vote for their favourite entries.
                </p>
          </ul>
        </section>

        {/* Disqualification Terms */}
        <section className="bg-white text-black p-6 sm:p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-[#083ca0] mb-4 border-l-4 border-[#083ca0] pl-3">
            Disqualification Terms
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Faking votes or manipulation = Disqualification.</li>
            <li>Offensive content in any form is prohibited.</li>
            <li>Organizers reserve right to disqualify on valid grounds.</li>
          </ul>
        </section>

        
      </main>
    </div>
  );
};

export default Rules;
