import '../css/Loading.css';
import loading from '../assets/loading.jpg';
import Navbar from './Navbar';
import Footer from './Footer';

const Loading = () => {
  // loading page
  return (
    <div>
      <Navbar/>
      <div className="loading">
        <img src={loading} alt="loading symbol"/>
      </div>
      <Footer/>
    </div>
  );
}

export default Loading;
