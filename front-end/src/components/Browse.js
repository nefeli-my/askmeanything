import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import Navbar from './Navbar';
import '../css/Browse.css';

const Browse = () => {
  const [questions, setQuestions] = useState([]);
  const [offset, setOffset] = useState(10);
  const [show_button, setShow_Button] = useState(true);
  const [author, setAuthor] = useState("");
  const [keyword, setKeyword] = useState("");
  const token = localStorage.getItem('REACT_TOKEN_AUTH');

  useEffect(() => {
    fetch('http://localhost:8002/getquestions/0',
    {
      method: 'GET',
      headers: { "Content-Type": "application/json", "Authorization": 'Bearer '+ JSON.parse(token) }
    })
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      setQuestions(data);
    });
  }, [token]);

  function getQuestions() {
    // unfiltered seach
    if (!author && !keyword) {
      fetch('http://localhost:8002/getquestions/' + offset,
      {
        method: 'GET',
        headers: { "Content-Type": "application/json", "Authorization": 'Bearer '+ JSON.parse(token)}
      })
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        setQuestions(questions.concat(data));
        if (data.length === 0)
          setShow_Button(false);
      });
    }
    // filtered search
    else {
      if (!author && keyword) {
        fetch(`http://localhost:8002/getquestions/filters/?keyword=${keyword}`,
        {
          method: 'GET',
          headers: { "Content-Type": "application/json", "Authorization": 'Bearer '+ JSON.parse(token)}
        })
        .then(function(res) {
          return res.json();
        })
        .then(function(data) {
          setQuestions(data);
          if (data.length === 0)
            setShow_Button(false);
        });
      }
      else if (author && !keyword) {
        fetch(`http://localhost:8002/getquestions/filters/?author=${author}`,
        {
          method: 'GET',
          headers: { "Content-Type": "application/json", "Authorization": 'Bearer '+ JSON.parse(token)}
        })
        .then(function(res) {
          return res.json();
        })
        .then(function(data) {
          setQuestions(data);
          if (data.length === 0)
            setShow_Button(false);
        });
      }
      else {
        fetch(`http://localhost:8002/getquestions/filters/?author=${author}&keyword=${keyword}`,
        {
          method: 'GET',
          headers: { "Content-Type": "application/json", "Authorization": 'Bearer '+ JSON.parse(token)}
        })
        .then(function(res) {
          return res.json();
        })
        .then(function(data) {
          setQuestions(data);
          if (data.length === 0)
            setShow_Button(false);
        });
      }
    }
  }

  return (
    <div>
      <Navbar/>
      <div className="browse">
        <div className="titles">
          <h2><b> Most recent questions posted: </b></h2>
          <h3> (questions currently displayed: {questions.length}) </h3>
        </div>
        <div className="inline-divs">
          <div className="input-group">
            <input type="search"
                   className="form-control rounded"
                   placeholder="Search by author"
                   value={author}
                   onChange={(e) => setAuthor(e.target.value)}
            />
            <button type="button"
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => {setShow_Button(false); getQuestions();}}>
                    search
            </button>
          </div>
          <div className="input-group">
            <input type="search"
                   className="form-control rounded"
                   placeholder="Search by keyword"
                   value={keyword}
                   onChange={(e) => setKeyword(e.target.value)}
            />
            <button type="button"
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => {setShow_Button(false); getQuestions();}}>
                    search
            </button>
          </div>
        </div>
        <div className="inline-divs">
          { author && <p className="filters"> <b>author:</b> {author} </p> }
          { keyword && <p className="filters"> <b>keyword:</b> {keyword} </p> }
        </div>
        <ul className="question-list">
          {questions.map((question) =>
            <li key={question.id} className="single-question">
              <Link to={{pathname: "/viewquestion", state: {question},}} style={{textDecoration: 'inherit', color: 'inherit'}}>
                <h3 className="title"><b> {question.title} </b></h3>
              </Link>
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
        { show_button &&
        <button
          id="show-more-btn"
          onClick={() => {setOffset(offset+10); getQuestions();}}
          className="btn btn-outline-primary">
          show more
        </button>
        }
      </div>
    </div>
  );
}

export default Browse;
