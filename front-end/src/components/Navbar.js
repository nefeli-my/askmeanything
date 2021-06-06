import '../css/Navbar.css';

const Navbar = () => {
  const isLoggedIn = localStorage.getItem('REACT_TOKEN_AUTH');
  return (
    <nav className="navbar">
      <h1><b>ask</b>me<b>anything</b></h1>
      { isLoggedIn &&
      <div className="logged-links">
        <a href="/">Home</a>
        <a href="/profile">My Profile</a>
        <a href="/browse">Browse Questions & Answers</a>
        <a href="/new-question" id="newquestion-link">New Question</a>
        <a href="/" onClick={() => localStorage.clear()}>Logout </a>
      </div>
      }
      { !isLoggedIn &&
      <div className="notlogged-links">
        <a href="/">Home</a>
        <a href="/browse-unassigned">Browse Questions & Answers</a>
        <a href="/general-statistics">General Statistics</a>
        <a href="/login">Login</a>
        <a href="/register">Create an Account</a>
      </div>
      }
    </nav>
  );
}

export default Navbar;
