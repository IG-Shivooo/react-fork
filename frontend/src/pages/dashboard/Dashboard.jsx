import { useState } from 'react';
import './Dashboard.css';

const experienceData = [
  {
    company: 'IBM',
    role: 'Lead – Front end developer',
    date: 'Jan 2020 – Present | Pune, India',
  },
  {
    company: 'Lumen',
    role: 'Front end developer',
    date: 'July 2018 – Dec 2020 | Delhi, India',
  },
  {
    company: 'Infosys',
    role: 'Executive – Front end developer',
    date: 'May 2016 – July 2018 | Pune, India',
  },
];

const similarProfiles = [
  { name: 'HiTe-1130', role: 'Front end developer | Pune, India', exp: '2 Years Experience' },
  { name: 'HiTe-0220', role: 'Team Lead | Pune, India', exp: '6 Years Experience' },
  { name: 'HiTe-0783', role: 'Lead – Front end developer | Pune, India', exp: '5 Years Experience' },
];

function Dashboard() {
  const [tab, setTab] = useState('Experience');

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="dashboard">
      {/* LEFT COLUMN */}
      <div className="profile-card">
        <img src="https://randomuser.me/api/portraits/women/75.jpg" alt="profile" className="profile-img" />
        <h2 className="username">HiTe–0125</h2>
        <p className="role">Lead – Front end developer</p>
        <p className="rate">$44/hr</p>
        <p className="desc">
          Develop responsive HTML pages using bootstrap as per approved mock-ups, matching the exact look and feel and UI
          experience of the mock-ups.
        </p>
        <div className="skills">
          {['HTML5', 'CSS3', 'jQuery', 'Bootstrap', 'JavaScript', 'AngularJS', 'GitHub'].map((skill, i) => (
            <span key={i}>{skill}</span>
          ))}
        </div>
        <button className="logout" onClick={handleLogout}>Logout</button>
      </div>

      {/* CENTER COLUMN */}
      <div className="details-card">
        <h3>Basic Information:</h3>
        <div className="info-grid">
          <p><strong>Age:</strong> 28 Years</p>
          <p><strong>Years of Experience:</strong> 4 Years</p>
          <p><strong>CTC:</strong> 12.5 Lac</p>
          <p><strong>Location:</strong> Pune, Maharashtra</p>
          <p><strong>Availability:</strong> Full Time (40hr/wk)</p>
          <p><strong>Positive Feedback:</strong> 100% ⭐⭐⭐⭐⭐</p>
        </div>
        <div className="btn-group">
          <button className="btn primary">Work Request</button>
          <button className="btn outline">Schedule a call</button>
        </div>

        {/* Tabs */}
        <div className="tabs">
          {['Experience', 'Education', 'Certification'].map((label) => (
            <span key={label} className={tab === label ? 'active' : ''} onClick={() => setTab(label)}>
              {label}
            </span>
          ))}
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {tab === 'Experience' &&
            experienceData.map((item, idx) => (
              <div key={idx} className="experience-item">
                <img src={`https://logo.clearbit.com/${item.company.toLowerCase()}.com`} alt={item.company} />
                <div>
                  <h4>{item.company}</h4>
                  <p>{item.role}</p>
                  <small>{item.date}</small>
                </div>
                <a href="#">View Project</a>
              </div>
            ))
          }
          {tab !== 'Experience' && <p>Coming Soon...</p>}
        </div>

        
      </div>

      {/* RIGHT COLUMN */}
      <div className="media-card">
        <div className="video-preview">
          <img src="https://images.unsplash.com/photo-1518770660439-4636190af475" alt="coding" />
          <span className="play-button">▶</span>
        </div>
        <h4>Similar Profiles:</h4>
        <div className="similar-list">
          {similarProfiles.map((user, idx) => (
            <div key={idx} className="similar-profile">
              <img src={`https://randomuser.me/api/portraits/men/${idx + 10}.jpg`} alt={user.name} />
              <div>
                <p className="name">{user.name}</p>
                <p className="role">{user.role}</p>
                <small>{user.exp}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
