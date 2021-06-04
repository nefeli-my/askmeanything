import Home from './Home';
import LandingPage from './LandingPage';

const GeneralHome = () => {
  const isLoggedIn = localStorage.getItem('REACT_TOKEN_AUTH');
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
