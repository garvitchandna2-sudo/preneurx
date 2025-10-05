import React from 'react'
import Navbar from '../Component/Navbar';
import Curousel from '../Component/Curousel';
import Display from '../Component/Display';
import Marquee from '../Component/Marquee';
import TeenDabba from '../Component/TeenDabba';
import Footer from '../Component/Footer';
import Rules from '../Component/Rules';


function Home() {
  return (
    <div>
        <Navbar />
        <Curousel/>
        <Display/>
       
        <TeenDabba/>
                <br />
        <Rules/>
        <br />

         <Marquee/>
         {/* <Rules/> */}
         
       
         <Footer/>

        
    </div>
  )
}

export default Home
