import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

export const Header = () => {
  // import the logout function fom the useLogout CUSTOM HOOK
  const { logout } = useLogout();

  // import the user from the useAuthContext CUSTOM HOOK state
  // const { state } = useAuthContext();
  // const user = state.user;
  // another way to get user using CLEVER DEEP destructuring :
  const {
    state: { user },
  } = useAuthContext();

  // console.log('Header Component - state.user (from useAuthContext):', user);

  const handleClick = () => {
    // run the imported logout function on click
    // which updates the Global State Auth and removes the localStorage item
    logout();
  };

  return (
    <header>
      <div className="header-title-container">
        {/* the Link Component takes a to= which relates to the Route */}
        <Link to="/" className="header-title-link">
          <img className="header-title-image" src="images/exercise.png" alt="" />
          <h1 className="header-title-heading">FullStack Workout Planner</h1>
        </Link>
      </div>
      <nav className="header-nav-container">
        {user && (
          <div className="header-nav-logout-container">
            <span className="header-nav-logout-email" data-test="header-nav-user-email">
              {user.email}
            </span>
            <button
              className="header-nav-logout-button"
              onClick={handleClick}
              data-test="header-nav-logout"
            >
              <span className="header-nav-logout-icon material-symbols-outlined">logout</span>Log
              Out
            </button>
          </div>
        )}
        {!user && (
          <div className="header-nav-login-signup-container">
            <Link to="/login" className="header-nav-link" data-test="header-nav-login">
              <span className="header-nav-login-icon material-symbols-outlined">login</span>Log In
            </Link>
            <Link to="/signup" className="header-nav-link" data-test="header-nav-signup">
              <span className="header-nav-signup-icon material-symbols-outlined">checklist</span>
              Sign Up
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
