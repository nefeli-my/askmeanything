import '../css/UpdateAccountInfo.css';
import Navbar from './Navbar';

const UpdateAccountInfo = () => {
  return (
    <div>
      <Navbar/>
      <div className="update-info">
        <nav>
          <a href="/profile">Account information</a>
          <a href="/my-statistics">My askmeanything statistics</a>
        </nav>
        <div>
        </div>
      </div>
    </div>
  );
}

export default UpdateAccountInfo;
