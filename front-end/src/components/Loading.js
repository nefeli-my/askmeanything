import '../css/Loading.css';
import loading from '../assets/loading.jpg'

const Loading = () => {
  // loading page
  return (
    <div className="loading">
      <img src={loading} alt="loading symbol"/>
    </div>
  );
}

export default Loading;
