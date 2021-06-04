import '../css/NotFound.css';
import { Link } from "react-router-dom"
import error404 from '../assets/error.png'

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>Oops!</h2>
      <h3>Sorry, there's nothing here.</h3>
      <div className="homepage-link">
        <Link to = "/"> Back to your homepage </Link>
      </div>
      <img src={error404} alt="not found"/>
    </div>
  );
}

export default NotFound;
