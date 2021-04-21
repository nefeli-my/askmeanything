
import { Link } from "react-router-dom"
import './css/NotFound.css';
import error404 from './assets/error2.png'

const NotFound = () => {
return (
  <div className="not-found">
    <h2>Oops!</h2>
    <h3>Sorry, there's nothing here.</h3>
    <div className="homepage-link">
      <Link to ="/home"> Back to your homepage </Link>
    </div>
    <img src={error404} />
  </div>
);
}

export default NotFound;
