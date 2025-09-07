import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navigation() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="flex items-center">
          <Link to="/dashboard" className="navbar-brand">
            Mess Menu Dashboard
          </Link>
        </div>
        
        <div className="navbar-nav">
          {currentUser && (
            <>
              <Link
                to="/dashboard"
                className="navbar-link"
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                className="navbar-link"
              >
                Profile
              </Link>
              <div className="navbar-user">
                <span className="navbar-user-text">
                  Welcome, {currentUser.displayName || currentUser.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="btn btn-danger btn-sm"
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
