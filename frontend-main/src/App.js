
import Home from './Pages/Home';
import Terms from './Pages/Terms';
import Login from "./Pages/Login";
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TeacherDashboard from './Pages/TeacherDashboard';
import TeacherVotePage from './Component/TeacherVotePage';

import './App.css';
import { AuthProvider } from './Context/Context';
import AboutUs from './Pages/Aboutus';
import StudentDashboard from './Pages/StudentDashboard';
import Voting from './Component/Voting';
import ClassClash from './Pages/ClassClash';
import Privacy from './Pages/Privacy';
import Finale from './Pages/Finale';
import AdminSignup from './Pages/AdminSignup';
import AdminLogin from './Pages/AdminLogin';
import AdminDashboard from './Pages/AdminDashboard';
import PrivateRoute from './Component/PrivateROute';
import PrivateStudentRoute from './Component/PrivateStudentRoute';
import SchoolShowdown from './Pages/SchoolShowdown';
import Rule from './Pages/Rule';
import ContactUs from './Pages/Contact';
import CrownKeepers from './Pages/CrownKeepers';
import TeamPage from './Pages/TeamPage';
import Leaders from './Component/Leaders';









//admin


function App() {
  return (
    <>
    <ToastContainer 
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="colored" // or "dark"
      />
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/dashboard" element={
          <PrivateStudentRoute>
            <StudentDashboard />
          </PrivateStudentRoute>

        } />
        <Route path="/voting" element={<Voting />} />
        <Route path="/classclash" element={
          <PrivateStudentRoute>
            <ClassClash />
          </PrivateStudentRoute>
        } />
        <Route path="/policy" element={<Privacy />} />
        <Route path="/rules" element={<Rule />} />
        <Route path="/round2" element={
          <PrivateStudentRoute>
            <SchoolShowdown/>
          </PrivateStudentRoute>
        } />
        <Route path="/finale" element={
          <PrivateStudentRoute>
            <Finale />
          </PrivateStudentRoute>
        } />
          <Route path="/leaderboard" element={
          <PrivateStudentRoute>
            <Leaders />
          </PrivateStudentRoute>
        } />
        <Route path="/rule" element={<Rule />} />
        <Route path="/contact" element={<ContactUs />} />
                <Route path="/crownkeeper" element={<CrownKeepers />} />




        {/* <Route path="/prize-pool" element={<PrizePool />} />
         */}

        <Route path="/login" element={<Login />} />

<Route path="/tdash" element={<TeacherDashboard />} />


<Route path="/teacher-vote" element={<TeacherVotePage />} />

        {/* admin routes */}

        <Route path="/admin-signup" element={<AdminSignup />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        } />



<Route path="/team" element={<TeamPage />} />




      </Routes>
    </AuthProvider>
          </>

  );
}
export default App;
