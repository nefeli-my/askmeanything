import React, {useState, useEffect} from 'react';
import { Link, useHistory } from "react-router-dom";
import '../css/Browse.css';

const BrowseUnassigned = () => {
  const [questions, setQuestions] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetch('http://localhost:8002/getquestions/unassigned',
    {
      method: 'GET',
      headers: { "Content-Type": "application/json"}
    })
    .then(function(res) {
      if(res.status === 200) {
          res.json()
              .then(function(data) {
                  setQuestions(data);
              })
      } else if (res.status === 401) {
        console.log('401 Unauthorized Error');
        alert('Your session expired. Please login again.');
        history.push('/login');
      } else if (res.status === 400) {
        console.log('400 Bad Request');
      } else {
        console.log('500 Internal Server Error');
        history.push('/error-500');
      }
    })

  }, [history]);

  return (
    <div className="browse">
      <div className="titles">
        <h2><b> Most recent questions posted: </b></h2>
        <h3> (questions currently displayed: {questions.length}) </h3>
      </div>
      <ul className="question-list">
        {questions.map((question) =>
          <li key={question.id} className="single-question">
            <Link to={{pathname: "/view-question", state: {question},}}
                  style={{textDecoration: 'inherit', color: 'inherit'}}>
              <h3 className="title"><b> {question.title} </b></h3>
            </Link>
            <h3 className="author-on">
              posted by user {question.Author.username}
              on {(new Date(question.createdAt)).toLocaleString('en-US')}
            </h3>
            <div className="question-body">
              <p> {question.body.substring(0, question.body.length / 2)} [...] </p>
            </div>
            <ul className="keyword-list">
              {question.Keywords.map((keyword) =>
                <li key={keyword.index} className="single-keyword">
                   {keyword.word}
                </li>
              )}
            </ul>
          </li>
        )}
      </ul>
    </div>
  )
}

export default  BrowseUnassigned;
