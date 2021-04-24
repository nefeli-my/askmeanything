import './css/Home.css';
import { Link, useHistory } from "react-router-dom"
import myaccount from './assets/myaccount.jpg'
import newquestion from './assets/newquestion.jpg'
import answer from './assets/answer.jpg'

const Home = () => {
  const history = useHistory();
  function redirect(option) {
    //history.push("/"+option);
  }
  return (
    <div className="home">
      <h2> Welcome to <b>ask</b>me<b>anything</b>! </h2>
      <p className="p-lg">
         A place to ask and answer questions freely.  Discuss, learn
         and bloom along with people <br/> from all over the world. 🌎
      </p>
      <hr/>
      <div className="options-div">
        <div className="row">
          <div className="col-sm" onClick={redirect("myprofile")}>
            <h4><b>My askmeanything</b></h4>
            <p> View the questions you've made and  <br/> the answers
            you have given, as well <br/> as <b>statistics</b> and <b>general information </b>
            about your <b>account</b>.
            </p>
            <div className="col-sm-img1">
              <img src={myaccount} />
            </div>
          </div>
          <div className="col-sm" onClick={redirect("newquestion")}>
            <h4><b>Make a new question</b></h4>
            <p> Don't be shy to make your own question! Try to pose your questions
            in a <b>simple</b> and <b>clear way</b> and don't forget to add the necessary <b>keywords</b>.
            </p>
            <div className="col-sm-img2">
              <img src={newquestion} />
            </div>
          </div>
          <div className="col-sm" onClick={redirect("browse")}>
            <h4><b>Browse questions & answers</b></h4>
            <p> <b>Browse the existing questions</b> and <b>answers </b>
            and <b>apply searching filters</b> <br/> to find exactly what you're looking
            for. <b>Answer questions</b> to add your piece to this knowledge puzzle!
            </p>
            <div className="col-sm-img3">
              <img src={answer} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
