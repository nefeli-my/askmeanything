import '../css/Browse.css';
import React, {useState, useEffect} from 'react';

const BrowseUnassigned = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8002/getquestions/unassigned',
    {
      method: 'GET',
      headers: { "Content-Type": "application/json"}
    })
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      setQuestions(data);
    });
  }, []);

  return (
    <div className="browse">
      <div className="titles">
        <h2><b> Most recent questions posted: </b></h2>
        <h3> (questions currently displayed: {questions.length}) </h3>
      </div>
      <ul className="question-list">
        {questions.map((question) =>
          <li key={question.id} className="single-question">
            <h3 className="title"><b> {question.title} </b></h3>
            <h3 className="author-on"> posted by user {question.Author.username} on {question.createdAt.substring(0,10)} </h3>
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
