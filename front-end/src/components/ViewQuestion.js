import '../css/ViewQuestion.css';
import React, {useState, useEffect} from 'react';
import {useLocation} from "react-router-dom";
import Navbar from './Navbar';

const ViewQuestion = () => {
  const location = useLocation();
  const { question } = location.state;
  const [answers, setAnswers] = useState([]);
  const [noanswers, SetNoAnswers] = useState(false);
  // const [ansdisplay, setAnsDisplay] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8002/getanswers/'+question.id,
    {
      method: 'GET',
      headers: { "Content-Type": "application/json"}
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
  }, []);

  return (
    <div>
      <Navbar/>
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
        {/*
          { !ansdisplay &&
          <button className="btn btn-outline-primary btn-sm"
                  id="btn-show-answers"
                  onClick={() => setAnsDisplay(true)}>
                  show answers
          </button>
          }
        */}
        { (!noanswers /*&& ansdisplay*/) &&
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
        }
        { (/*ansdisplay &&*/ noanswers) && <h3 className="no-answers-msg"> { noanswers } </h3> }
      </div>
    </div>
  );
}

export default ViewQuestion;
