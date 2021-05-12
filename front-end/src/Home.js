import './css/Home.css';
import { useHistory } from "react-router-dom"
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import myaccount from './assets/myaccount.jpg'
import newquestion from './assets/newquestion.jpg'
import answer from './assets/answer.jpg'

const Home = () => {
  const history = useHistory();
  const username = localStorage.getItem('username')
  return (
    <div>
      <Navbar/>
      <div className="home">
        <h2> Welcome to <b>ask</b>me<b>anything</b> {username}! </h2>
        <p className="p-lg">
           A place to ask and answer questions freely.  Discuss, learn
           and bloom along with people <br/> from all over the world. 🌎
        </p>
        <hr/>
        <div className="options-div">
          <div className="row">
            <div className="col-sm" style={{cursor: "pointer"}} onClick={() => {history.push('/myprofile')}}>
              <h4><b>My askmeanything</b></h4>
              <p> View the questions you've made<br/> and the answers
              you have given,<br/> as well as <b>statistics</b> and <b>general information </b>
              about your <b>account</b>.
              </p>
              <div>
                <img src={myaccount} />
              </div>
            </div>
            <div className="col-sm" style={{cursor: "pointer"}} onClick={() => {history.push('/newquestion')}}>
              <h4><b>Make a new question</b></h4>
              <p> Don't be shy to make <br/> your own question! Try to pose <br/>your questions
              in a <b>simple</b> and<br/> <b>clear way</b> and don't forget to <br/>add the necessary <b>keywords</b>.
              </p>
              <div>
                <img src={newquestion} />
              </div>
            </div>
            <div className="col-sm" style={{cursor: "pointer"}} onClick={() => {history.push('/browse')}}>
              <h4><b>Browse questions & answers</b></h4>
              <p>  <b>Browse</b> the existing questions  <br/> and answers and apply <b>searching <br/>
              filters</b> to find exactly what <br/> interests you. <b>Answer  questions</b> <br/> to add
              your piece to this <br/> knowledge puzzle!
              </p>
              <div>
                <img src={answer} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Home;
