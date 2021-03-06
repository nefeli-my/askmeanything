import Home from './Home';
import LandingPage from './LandingPage';

const GeneralHome = () => {
  // the GeneralHome component mounts the 'Home' or the
  // 'LandingPage' component depending on if the user
  // is logged in or not
  const isLoggedIn = localStorage.getItem('askmeanything_token');
  return (
    <div>
    { isLoggedIn &&
      <Home/>
    }
    { !isLoggedIn &&
      <LandingPage/>
    }
    </div>
  );
}

export default GeneralHome;
