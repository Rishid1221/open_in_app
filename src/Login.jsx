import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import baseImage from './assets/woman-5584377_640-removebg-preview.png'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter, faGoogle, faFacebook, faApple } from '@fortawesome/free-brands-svg-icons'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const validateInputs = () => {
    if (!email || !password) {
      alert('Please enter both email and password.');
      return false;
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return false;
    }

    return true;
  };

  const handleLogin = (event) => {
    event.preventDefault();

    if (!validateInputs()) {
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className='login-left1'>
        <div className="login-brand">
          <button onClick={handleLogin} className="base-button">
          Base
            
          </button>
        </div>
        <h2>Generate detailed reports with just one click</h2>
        <img
          src={baseImage}
          alt="Person with camera"
          className="login-image"
        /> </div>
      </div>
      <div className="login-right">
        <div className="sign-in-wrapper">
          <h2>Sign In</h2>
          <p>Sign in to your account</p>
          <div className="social-login">
            <button className="social-button google-login">
              <FontAwesomeIcon icon={faGoogle} /> Sign in with Google
            </button>
            <button className="social-button apple-login">
              <FontAwesomeIcon icon={faApple} /> Sign in with Apple
            </button>
          </div>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email address</label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input 
                type="password" 
                placeholder="********" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <a href="/" className="forgot-password">Forgot password?</a>
            <button 
              type="submit" 
              className={`sign-in-button ${isSubmitting ? 'loading' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          <p className="register-text">
            Don’t have an account? <a href="/">Register here</a>
          </p>
          <div className="social-icons">
            <a href="/" aria-label="GitHub"><FontAwesomeIcon icon={faGithub} /></a>
            <a href="/" aria-label="Twitter"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="/" aria-label="Google"><FontAwesomeIcon icon={faGoogle} /></a>
            <a href="/" aria-label="Facebook"><FontAwesomeIcon icon={faFacebook} /></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
