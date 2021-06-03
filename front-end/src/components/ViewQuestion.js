import '../css/ViewQuestion.css';
import React, {useState, useEffect} from 'react';
import {useLocation} from "react-router-dom";

const ViewQuestion = () => {
  const location = useLocation();
  const { question } = location.state;
  const [answers, setAnswers] = useState([]);
  const [noanswers, SetNoAnswers] = useState(false);
  const [body, setAnsBody] = useState("");
  const token = localStorage.getItem('REACT_TOKEN_AUTH');

  useEffect(() => {
    fetch('http://localhost:8002/getanswers/'+question.id,
    {
      method: 'GET',
      headers: { "Content-Type": "application/json", "Authorization": 'Bearer '+ JSON.parse(token) }
    })
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      if (data.Answers.length === 0) {
        SetNoAnswers("This question has no answers yet.");
      }
      else {
        setAnswers(data.Answers);
      }
    });
  }, [question.id]);

  function postAnswer() {
    let answer = {questionId: question.id, body: body};
    console.log(token);
    fetch('http://localhost:8002/createanswer/', {
      method: 'POST',
      headers: { "Content-Type": "application/json", "Authorization": 'Bearer '+ JSON.parse(token) },
      body: JSON.stringify(answer)
      })
    .then(() => console.log("answer successfully posted"))
    .catch(err => console.log(err));
  }

  return (
    <div>
      <div className="view-question">
        <div className="question">
          <h3 className="title"><b> {question.title} </b></h3>
          <h3 className="author-on"> posted by user {question.Author.username} on {question.createdAt.substring(0,10)} </h3>
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
          <div>
            <ul className="answer-list">
              <h3 className="num-answers"> { answers.length } Answers </h3>
              {answers.map((answer) =>
                <li key={answer.id} className="single-answer">
                  <h3 className="author-on"> posted by user {answer.User.username} on {answer.createdAt.substring(0,10)} </h3>
                  <div className="question-body">
                    <p> {answer.body} </p>
                  </div>
                </li>
              )}
            </ul>
            { token && <hr/> }
          </div>
        }
        { noanswers && <h3 className="no-answers-msg"> { noanswers } </h3> }
        { token &&
        <div>
          <div className="your-answer">
            <h3 className="num-answers"> Your Answer: </h3>
            <textarea rows="8" cols="100" value={body} onChange={(e) => setAnsBody(e.target.value)}>
            </textarea>
          </div>
          <button className="btn btn-outline-primary btn-sm"
                  id="btn-post-answer"
                  onClick={() => postAnswer()}>
            Post Your Answer
          </button>
        </div>
      }
      </div>
    </div>
  );
}

export default ViewQuestion;
