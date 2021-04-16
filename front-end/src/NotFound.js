
import { Link } from "react-router-dom"

const NotFound = () => {
return (
  <div className="not-found">
    <h2>Oops!</h2>
    <h3>Sorry, there's nothing here.</h3>
    <Link to="/home">Back to the Homepage...</Link>
  </div>
);
}

export default NotFound;
