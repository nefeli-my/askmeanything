import './css/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1><b>ask</b>me<b>anything</b></h1>
      <div className="links">
        <a href="/home">Home</a>
        <a href="/myprofile">My Profile</a>
        <a href="/browse">Browse Questions & Answers</a>
        <a href="/newquestion" style={{
          color: 'black',
          backgroundColor: '#87bdd8',
          borderRadius: '8px'
        }}>New Question</a>
        <a href="/logout">Log out</a>
      </div>
    </nav>
  );
}

export default Navbar;
