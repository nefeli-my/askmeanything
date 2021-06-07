import { Link } from "react-router-dom"
import error500 from '../assets/error500.png'
import '../css/Error.css';

const Error500 = () => {
  // user is redirected here if an 500 internal server error occurs
  return (
    <div className="error500">
      <h2>Shoot! </h2>
      <h2> Well, this is unexpected...</h2>
      <p>
        <b> Error code: 500 </b> <br/>
        An error has occured and we're trying to fix the problem.
        We'll be up and running shortly.
      </p>
      <div>
        {/* redirect to home/landing page */}
        <p> Back to your <Link to = "/"> homepage </Link> </p>
      </div>
      <img src={error500} alt="error 500"/>
    </div>
  );
}

export default Error500;
