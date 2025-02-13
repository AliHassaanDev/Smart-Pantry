import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container1">
      <header className="hero1">
        <div className="hero-content1">
          <h1>Welcome to Smart Pantry</h1>
          <p>Track your pantry, reduce waste, and enjoy smart meal planning!</p>
          <div className="actions"><button style={{marginLeft:"20vw",marginTop:"4vh",width:"9vw",height:"7vh"}} className="cta-button1">Get Started</button></div>
          
        </div>
      </header>
      <section className="features1">
        <h2>Features</h2>
        <ul>
          <li>Manage your pantry items easily</li>
          <li>Get meal suggestions based on what you have</li>
          <li>Track expiration dates to reduce waste</li>
          <li>Easy-to-use interface for meal planning</li>
        </ul>
      </section>
      <section className="cta-section1">
        <h2>Join Us Today!</h2>
        <p style={{marginTop:"3vh"}}>Create an account to start managing your kitchen smartly.</p>
        <div className="actions"><button style={{marginLeft:"38vw",marginTop:"4vh",width:"9vw",height:"7vh"}} className="cta-button1">Sign Up</button></div>
        
      </section>
    </div>
  );
};

export default HomePage;
