import '../css/Home.css';
import { useHistory } from "react-router-dom";
import myaccount from '../assets/myaccount.jpg'
import newquestion from '../assets/newquestion.jpg'
import answer from '../assets/puzzle.jpg'

const Home = () => {
  // Home page for signed in users (path: '/')
  const history = useHistory();
  const username = localStorage.getItem('username');
  return (
    <div className="home">
      {/* welcoming messages */}
      <h2> Welcome to <b>ask</b>me<b>anything</b> {username}! </h2>
      <div className="p-lg">
         A place to ask and answer questions freely.  Discuss, learn
         and bloom along with people <br/> from all over the world. 🌎
      </div>
      <hr/>
      <div className="options-div">
        {/* 3 (clickable) option boxes make up the homepage. each presents a  *
          * different feature with a small description and accompanying image */}
        <div className="row">
          <div className="col-sm" onClick={() => history.push('/profile')}>
            {/* my askmeanything profile */}
            <h4><b>My askmeanything</b></h4>
            <p> View the questions you've made<br/> and the answers
            you have given,<br/> as well as <b>statistics</b> and <b>general information </b>
            about your <b>account</b>.
            </p>
            <div>
              <img src={myaccount}  alt="my account"/>
            </div>
          </div>
          <div className="col-sm" onClick={() => history.push('/browse')}>
            {/* browse */}
            <h4><b>Browse questions & answers</b></h4>
            <p>  <b>Browse</b> the existing questions  <br/> and answers and apply <b>searching <br/>
            filters</b> to find exactly what <br/> interests you. <b>Answer  questions</b> <br/> to add
            your piece to this <br/> knowledge puzzle!
            </p>
            <div>
              <img src={answer} alt="puzzle piece"/>
            </div>
          </div>
          <div className="col-sm" onClick={() => history.push('/new-question')}>
            {/* post a new question */}
            <h4><b>Make a new question</b></h4>
            <p> Don't be shy to make <br/> your own question! Try to pose <br/>your questions
            in a <b>simple</b> and<br/> <b>clear way</b> and don't forget to <br/>add the necessary <b>keywords</b>.
            </p>
            <div>
              <img src={newquestion} alt="new question"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
