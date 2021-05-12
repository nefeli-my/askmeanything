import './css/LandingPage.css';
import { useHistory } from "react-router-dom"
import newquestion from './assets/newquestion.jpg'
import unlock from './assets/unlock.jpg'
import stats from './assets/stats.jpg'

const LandingPage = () => {
  const history = useHistory();
  return (
    <div className="landing-page">
      <div className="landing-main">
        <h2> Welcome to <b>ask</b>me<b>anything</b>! </h2>
        <p className="p-lg">
           A place to ask and answer questions freely.  Discuss, learn
           and bloom along with people <br/> from all over the world. 🌎
        </p>
        <hr/>
        <div className="options-div">
          <div className="row">
            <div className="col-sm" style={{cursor: "pointer"}} onClick={() => {history.push('/login')}}>
              <h4><b>Login or sign up</b></h4>
              <p> <b>Create an account</b> (or <b>login</b>),<br/>
              to gain access to useful features<br/> as <b>asking </b>
              and <b>answering questions!</b>
              </p>
              <div>
                <img src={unlock} />
              </div>
            </div>
            <div className="col-sm" style={{cursor: "pointer"}} onClick={() => {history.push('/stats')}}>
              <h4><b>General statistics</b></h4>
              <p> Do you want to know about what the world is curious about? <br/>
              View askmeanything's <b> general <br/> statistics </b>
              and get to know <br/> all about the talk of the town.
              </p>
              <div>
                <img src={stats} />
              </div>
            </div>
            <div className="col-sm" style={{cursor: "pointer"}} onClick={() => {history.push('/browse')}}>
              <h4><b>Browse questions & answers</b></h4>
              <p> <b>Browse the existing questions</b> <br/>and <b>answers </b>
              and <b>apply searching <br/>filters</b> to find exactly what you're <br/>
              looking for.
              </p>
              <div>
                <img src={newquestion} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
