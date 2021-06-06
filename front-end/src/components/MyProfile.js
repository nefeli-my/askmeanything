import '../css/MyProfile.css';
import Navbar from './Navbar';

const MyProfile = () => {
  return (
    <div>
      <Navbar/>
      <div className="update-info">
        <nav>
          <a href="/profile">Account information</a>
          <a href="/my-statistics">My askmeanything statistics</a>
        </nav>
      </div>
    </div>
  );
}

export default MyProfile;
