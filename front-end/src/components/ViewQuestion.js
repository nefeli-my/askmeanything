import '../css/ViewQuestion.css';
import React, {useState, useEffect} from 'react';
import {useLocation, useHistory} from "react-router-dom";

const ViewQuestion = () => {
  const location = useLocation();
  const { question } = location.state;
  const [answers, setAnswers] = useState([]);
  const [noanswers, SetNoAnswers] = useState(false);
  const [body, setAnsBody] = useState("");
  const history = useHistory();
  const token = localStorage.getItem('REACT_TOKEN_AUTH');

  useEffect(() => {
    fetch('http://localhost:8002/getanswers/'+question.id,
    {
      method: 'GET',
      headers: { "Content-Type": "application/json" }
    })
    .then(function (res) {
          if (res.status === 200) {
            res.json()
                .then(function (data) {
                  if (data.Answers.length === 0)
                    SetNoAnswers("This question hasn't been answered yet.");
                  else
                    setAnswers(data.Answers);
                })
          } else if (res.status === 401) {
            console.log('401 Unauthorized Error');
            alert('Your session expired. Please login again.');
            history.push('/login');
          } else if (res.status === 400) {
            console.log('400 Bad Request Error');
          } else {
            console.log('500 Internal Server Error');
            history.push('/error-500');
          }
        }
    );
  }, [question.id, token, history]);

  function postAnswer() {
    let answer = {questionId: question.id, body: body};
    console.log(token);
    fetch('http://localhost:8002/createanswer/', {
      method: 'POST',
      headers: { "Content-Type": "application/json", "Authorization": 'Bearer '+ JSON.parse(token) },
      body: JSON.stringify(answer)
      })
      .then(function (res) {
            if (res.status === 200) {
              console.log('answer successfully uploaded');
            } else if (res.status === 401) {
              alert('Your session expired. Please login again.');
              history.push('/login');
            } else if (res.status === 400) {
              console.log('400 Bad Request');
              alert('Uploading of answer failed, please try again.');
            } else {
              console.log('500 Internal Server Error');
              history.push('/error-500');
            }
          }
      );
    setAnsBody("");
    window.location.reload(false);
  }

  return (
    <div>
      <div className="view-question">
        <div className="question">
          <h3 className="title"><b> {question.title} </b></h3>
          <h3 className="author-on">
            posted by user {question.Author.username} on
            {(new Date(question.createdAt)).toLocaleString('en-US')}
          </h3>
          <div className="question-body">
            <p> {question.body} </p>
          </div>
          <ul className="keyword-list">
            {question.Keywords.map((keyword) =>
              <li key={keyword.index} className="single-keyword">
                 {keyword.word}
              </li>
            )}
          </ul>
        </div>
        { !noanswers &&
          <ul className="answer-list">
            <h3 className="num-answers"> { answers.length } Answers </h3>
            {answers.map((answer) =>
              <li key={answer.id} className="single-answer">
                <h3 className="author-on">
                  posted by user {answer.User.username} on
                  {(new Date(answer.createdAt)).toLocaleString('en-US')}
                </h3>
                <div className="question-body">
                  <p> {answer.body} </p>
                </div>
              </li>
            )}
          </ul>
        }
        { noanswers && <h3 className="no-answers-msg"> { noanswers } </h3> }
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
    </div>
  );
}

export default ViewQuestion;
