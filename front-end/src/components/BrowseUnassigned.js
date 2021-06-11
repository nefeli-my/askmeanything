import React, {useState, useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";
import '../css/Browse.css';

const BrowseUnassigned = () => {
  // browse questions for unassigned users
  const [questions, setQuestions] = useState([]);
  const history = useHistory();

  // fetch the 10 most recent questions
  // when the component is mounted.
  // unassigned users can view only 10 questions
  // and cannot make filtered searches
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
                  // set questions to acquired data
                  setQuestions(data);
              })
      // error handling
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
        <h3> Login or signup to view more! </h3>
      </div>
      <ul className="question-list">
        {/* display of fetched questions using map function.    *
          * for each question show title, half of its body,     *
          * author's username, keywords and when it was created */}
        {questions.map((question) =>
          <li key={question.id} className="single-question">
            {/* when question's title is clicked, redirect to         *
              * ViewQuestion component with the question obj as state */}
            <Link to={{pathname: "/view-question", state: {question},}}
                  style={{textDecoration: 'inherit', color: 'inherit'}}>
              <h3 className="title"><b> {question.title} </b></h3>
            </Link>
            {/* &nbsp; used to create empty space */}
            <h3 className="author-on">
              posted by user {question.Author.username} on &nbsp;
              {(new Date(question.createdAt)).toLocaleString('en-GB')}
            </h3>
            <div className="question-body">
              <p> {question.body.substring(0, question.body.length / 2)} [...] </p>
            </div>
            <ul className="keyword-list">
              {question.Keywords.map((keyword, index) =>
                <li key={index} className="single-keyword">
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
