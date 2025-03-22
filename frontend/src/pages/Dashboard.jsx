import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('Just exploring the world of React ✨');

  useEffect(() => {
    // Retrieve the user object from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    console.log('Stored user:', storedUser);

    if (!storedUser || !storedUser.username) {
      navigate('/login'); // Redirect if no user is found
    } else {
      setUsername(storedUser.username);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Get the first letter of the username for the avatar
  const firstLetter = username ? username.charAt(0).toUpperCase() : '';

  return (
    <div className="dashboard-container">
      <div className="card">
        {/* User Info */}
        <div className="user-info">
          <div className="avatar">{firstLetter}</div>
          <div className="username">{username}</div>
          <div className="bio">{bio}</div>
        </div>

        {/* Stats Section Like IG */}
        <div className="stats">
          <div className="stat-item">
            <span>12</span>
            <label>Posts</label>
          </div>
          <div className="stat-item">
            <span>120</span>
            <label>Followers</label>
          </div>
          <div className="stat-item">
            <span>150</span>
            <label>Following</label>
          </div>
        </div>

        {/* Button like Edit Profile */}
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
