import React, {useState, useEffect} from 'react';
import './css/Browse.css';
import Navbar from './Navbar';
import Footer from './Footer';

const Browse = () => {
  const [questions, setQuestions] = useState([]);
  const [limit, setLimit] = useState(10);
  const isLoggedIn = localStorage.getItem('REACT_TOKEN_AUTH');

  useEffect(() => {
    fetch('http://localhost:8002/getquestions/' + limit,
    {
      method: 'GET',
      headers: { "Content-Type": "application/json"}
    })
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      setQuestions(data);
      console.log(data);
    });
  }, [limit]);
  let show_button = isLoggedIn && (limit == questions.length);
  const listQuestions = questions.map((question) =>
    <li className="single-question">
      <h3 className="title"><b> {question.title} </b></h3>
      <h3 className="author"> author: {question.Author.username} </h3>
      <h3 className="posted-at"> posted at: {question.createdAt.substring(0,10)} </h3>
      <div className="question-body">
        <text> {question.body} </text>
      </div>
    </li>
  );

  return (
    <div>
      <div className="browse">
        <div className="titles">
          <h2><b> Most recent questions posted: </b></h2>
          <h3> (questions currently displayed: {questions.length}) </h3>
        </div>
        <ul className="question-list">
          { listQuestions }
        </ul>
      </div>
      { show_button &&
      <button
        id="show-more-btn"
        onClick={() => { setLimit(limit + 10) }}
        className="btn btn-outline-dark"
      >
        show more
      </button>
      }
    </div>
  );
}

export default Browse;
