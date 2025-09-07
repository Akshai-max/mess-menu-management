import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Signup() {
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(formData.email, formData.password, formData.displayName);
      navigate('/dashboard');
    } catch (error) {
      setError('Failed to create an account: ' + error.message);
    }

    setLoading(false);
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">
            Create your account
          </h2>
          <p className="auth-subtitle">
            Or{' '}
            <Link
              to="/login"
              className="auth-link"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}
          <div className="auth-form-group">
            <label htmlFor="displayName" className="form-label">
              Full Name
            </label>
            <input
              id="displayName"
              name="displayName"
              type="text"
              required
              className="form-input"
              placeholder="Enter your full name"
              value={formData.displayName}
              onChange={handleChange}
            />
          </div>
          <div className="auth-form-group">
            <label htmlFor="email-address" className="form-label">
              Email Address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="form-input"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="auth-form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="form-input"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="auth-form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              className="form-input"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <div className="auth-form-group">
            <button
              type="submit"
              disabled={loading}
              className="auth-button"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
