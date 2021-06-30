import '../css/ViewQuestion.css';
import React, {useState, useEffect} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const ViewQuestion = () => {
  // view a question + all of its current answers
  // post new answer functionality for signed in users
  const { id } = useParams();
  const [question, setQuestion] = useState({Author:{},Keywords:[]});
  const [answers, setAnswers] = useState([]);
  const [noanswers, SetNoAnswers] = useState(false);
  const [body, setAnsBody] = useState("");
  const history = useHistory();
  const token = localStorage.getItem('askmeanything_token');

  useEffect(() => {
    // get all answers of a chosen question when component is mounted
    let url;
    if(token){
       url =  'http://localhost:8004/getanswers/'
    }
    else{
        url = 'http://localhost:8004/getanswers/unassigned/'
    }
    fetch(url+id,
    {
      method: 'GET',
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + (token? JSON.parse(token): '') }
    })
    .then(function (res) {
          if (res.status === 200) {
            res.json()
                .then(function (data) {
                  // in case no answers exist, show relative message instead
                  let question = {...data};
                  delete question.Answers;
                  setQuestion(question);
                  if (data.Answers.length === 0)
                    SetNoAnswers("This question hasn't been answered yet.");
                  else
                    setAnswers(data.Answers);
                })
          // error handling
          } else if (res.status === 401) {
            console.log('401 Unauthorized Error');
            if(token)
              alert('Your session expired. Please login again.');
            else
              alert('You must be logged in to view this question and its answers!');
            localStorage.removeItem('askmeanything_token');
            history.push('/login');
          } else if (res.status === 400) {
            console.log('400 Bad Request Error');
            NotificationManager.error('You must be logged in to view this questions and its answers.','Error', 2000);
            setTimeout(() => history.push('/login'), 2000);
          } else if(res.status === 404) {
             NotificationManager.error('No question with given id exists','Error', 2000);
              setTimeout(() => history.push(token?'/browse':'/browse-unassigned'), 2000);
          } else {
            console.log('500 Internal Server Error');
            history.push('/error-500');
          }
        }
    )
    .catch(err => {
          console.log(err);
          history.push('/error-500');
    });
  }, [history, id, token]);

  function postAnswer() {
    // post new answer (for logged in users only, token required)
    let answer = {questionId: question.id, body: body};
    fetch('http://localhost:8004/create/', {
      method: 'POST',
      headers: { "Content-Type": "application/json", "Authorization": 'Bearer '+ JSON.parse(token) },
      body: JSON.stringify(answer)
      })
      .then(function (res) {
            if (res.status === 200) {
              console.log('answer successfully uploaded');
            // error handling
            } else if (res.status === 401) {
              localStorage.removeItem('askmeanything_token');
              alert('Your session expired. Please login again.');
              history.push('/login');
            } else if (res.status === 400) {
              console.log('400 Bad Request');
                NotificationManager.error('Uploading of answer failed, please try again.','Error');
            } else {
              console.log('500 Internal Server Error');
              history.push('/error-500');
            }
            setAnsBody("");
            // reload component after new answer submission
            window.location.reload(false);
          }
      )
      .catch(err => {
          console.log(err);
          history.push('/error-500');
      });
  }

  return (
    <div>
      <div className="view-question">
        {/* display question */}
        <div className="question">
          <h3 className="title"><b> {question.title} </b></h3>
          {/* &nbsp; used to create empty space */}
          <h3 className="author-on">
            posted by user {question.Author.username} on &nbsp;
            {(new Date(question.createdAt)).toLocaleString('en-GB')}
          </h3>
          {/* full question body is shown here */}
          <div className="question-body">
            <p> {question.body} </p>
          </div>
          {/* keywords display */}
          <ul className="keyword-list">
            {question.Keywords.map((keyword,index) =>
              <li key={index} className="single-keyword">
                 {keyword.word}
              </li>
            )}
          </ul>
        </div>
        {/* display question's answers (if there are any) */}
        { !noanswers &&
          <ul className="answer-list">
            <h3 className="num-answers"> { answers.length } Answers </h3>
            {answers.map((answer) =>
              <li key={answer.id} className="single-answer">
                {/* &nbsp; used to create empty space */}
                <h3 className="author-on">
                  posted by user {answer.User.username} on &nbsp;
                  {(new Date(answer.createdAt)).toLocaleString('en-GB')}
                </h3>
                <div className="question-body">
                  <p> {answer.body} </p>
                </div>
              </li>
            )}
          </ul>
        }
        {/* in case no answers exist */}
        { noanswers && <h3 className="no-answers-msg"> { noanswers } </h3> }
        {/* post new answer form is only shown to logged in users */}
        { token &&
        <div>
          <div className="your-answer">
            <h3 className="num-answers"> Your Answer: </h3>
            <textarea rows="8"
                      cols="100"
                      value={body}
                      onChange={(e) => setAnsBody(e.target.value)}>
            </textarea>
          </div>
          {/* submit button is disabled for empty answer body */}
          <button className="btn btn-primary btn-sm"
                  id="btn-post-answer"
                  disabled={!body}
                  onClick={() => postAnswer()}
          >
            Post Your Answer
          </button>
        </div>
      }
      </div>
      <NotificationContainer/>
    </div>
  );
}

export default ViewQuestion;
