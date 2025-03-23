import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

// Get API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });
      console.log('Login response:', response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error.response?.data || 'Error occurred');
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-page">
      {/* Features Sidebar */}
      <div className="features-sidebar">
        <div className="feature-item">
          <div className="feature-icon">📋</div>
          <div className="feature-text">
            <h3>Easy Apply</h3>
            <p>Apply with just one click - even for multiple jobs.</p>
          </div>
        </div>
        <div className="feature-item">
          <div className="feature-icon">🔔</div>
          <div className="feature-text">
            <h3>Dream Job Alert</h3>
            <p>Receive tailor-made offers from 3,000 companies conveniently via email.</p>
          </div>
        </div>
        <div className="feature-item">
          <div className="feature-icon">🔍</div>
          <div className="feature-text">
            <h3>Efficient search</h3>
            <p>Instantaneously recognize relevant jobs in your search results.</p>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="auth-form-container">
        <div className="auth-form-wrapper">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>E-Mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="forgot-password">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
            <button type="submit" className="primary-button">Login</button>
          </form>
          
          <p className="auth-toggle">
            Don't have an account yet? <Link to="/register">Sign up here</Link>
          </p>
          
          <div className="divider">
            <span>or</span>
          </div>
          
          <div className="social-login">
            <button className="social-button google">
              <span>Google</span>
            </button>
            <button className="social-button github">
              <span>Github</span>
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
