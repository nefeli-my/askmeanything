import './css/NotFound.css';
import { Link } from "react-router-dom"
import error404 from './assets/error2.png'

const NotFound = () => {
  const isLoggedIn = localStorage.getItem('REACT_TOKEN_AUTH');
  var path = "/home"
  if (!isLoggedIn) {
    path = "/"
  }
return (
  <div className="not-found">
    <h2>Oops!</h2>
    <h3>Sorry, there's nothing here.</h3>
    <div className="homepage-link">
      <Link to = {path}> Back to your homepage </Link>
    </div>
    <img src={error404} />
  </div>
);
}

export default NotFound;
