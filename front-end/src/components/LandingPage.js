import '../css/LandingPage.css';
import {useHistory} from "react-router-dom"
import newquestion from '../assets/newquestion.jpg'
import unlock from '../assets/unlock.jpg'
import stats from '../assets/stats.jpg'

const LandingPage = () => {
  // homepage for not signed users 
  const history = useHistory();
  return (
    <div className="landing-page">
      <div className="landing-main">
        <h2> Welcome to <b>ask</b>me<b>anything</b>! </h2>
        <p className="p-lg">
           A place to ask and answer questions freely.  Discuss, learn
           and bloom along with people from all over the world. 🌎
        </p>
        <hr/>
        <div className="options-div">
          {/* 3 (clickable) option boxes make up the landing page. each presents a *
            * different feature with a small description and accompanying image    */}
          <div className="row">
            <div className="col-sm" onClick={() => {history.push('/login')}}>
              {/* sign up or login */}
              <h4><b>Sign up or login</b></h4>
              <p> <b>Create an account</b> (or <b>login</b>),<br/>
              to gain access to useful <br/> features as <b>asking </b>
              and <b> <br/> answering  questions!</b>
              </p>
              <div>
                <img src={unlock} alt="unlock"/>
              </div>
            </div>
            <div className="col-sm" onClick={() => {history.push('/browse-unassigned')}}>
              {/* browse for unassigned users */}
              <h4><b>Browse questions & answers</b></h4>
              <p> Get a <b>sneak peak</b> of the <br/> <b>most recent questions</b> <br/> posted, as well
              as of their <br/> answers. Login or sign up <br/> for more features!
              </p>
              <div>
                <img src={newquestion} alt="new question"/>
              </div>
            </div>
            <div className="col-sm" onClick={() => {history.push('/general-statistics')}}>
              {/* general statistics */}
              <h4><b>General statistics</b></h4>
              <p> Do you want to know about what the world is curious about? <br/>
              View askmeanything's <b> general <br/> statistics </b>
              and learn all about <br/> the talk of the town.
              </p>
              <div>
                <img src={stats} alt="stats"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
