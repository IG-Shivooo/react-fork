import React from 'react';
import './Home.css'; // Include your CSS file
import manWithLaptop from '../assets/hero image.svg'; 

function Home() {
  return (
    <div className="home-container">
      <div className="content">
        <h1>Find the DevJob, that really fits you</h1>
        <p>Discover more than 100+ current DevJobs.</p>
        <input 
          type="text" 
          placeholder="TechStack, Job, Location..." 
          className="job-search-input" 
        />
        <button className="find-jobs-button">Find Jobs</button>
      </div>
      <div className="image-container">
        <img src={manWithLaptop} alt="Man with Laptop" className="man-image" />
      </div>
    </div>
  );
}

export default Home;
