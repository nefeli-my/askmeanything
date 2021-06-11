import '../css/Error.css';
import { Link } from "react-router-dom"
import error404 from '../assets/error404.png'

const NotFound = () => {
  // the user is redirected here in case an unknown url (a url that
  //  hasn't been mapped to any component through the router) is inserted
  return (
    <div className="not-found">
      <h2>Oops!</h2>
      <h3>Sorry, there's nothing here.</h3>
      <div>
        <p> Back to your <Link to = "/"> homepage </Link> </p>
      </div>
      <img src={error404} alt="not found"/>
    </div>
  );
}

export default NotFound;
