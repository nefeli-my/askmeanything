import React, {useState, useEffect} from 'react';
import './css/Browse.css';

const Browse = () => {
  const [questions, setQuestions] = useState([]);
  const [show_button, setShow_Button] = useState(true);
  const [offset, setOffset] = useState(10)
  const [author, setAuthor] = useState("");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    fetch('http://localhost:8002/getquestions/0',
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

  function getQuestions() {
    // unfiltered seach
    if (!author && !keyword) {
      fetch('http://localhost:8002/getquestions/' + offset,
      {
        method: 'GET',
        headers: { "Content-Type": "application/json"}
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
          headers: { "Content-Type": "application/json"}
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
          headers: { "Content-Type": "application/json"}
        })
        .then(function(res) {
          return res.json();
        })
        .then(function(data) {
          console.log('hi')
          setQuestions(data);
          if (data.length === 0)
            setShow_Button(false);
        });
      }
      else {
        fetch(`http://localhost:8002/getquestions/filters/?author=${author}&keyword=${keyword}`,
        {
          method: 'GET',
          headers: { "Content-Type": "application/json"}
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

  const listQuestions = questions.map((question) =>
    <li key={question.id} className="single-question">
      <h3 className="title"><b> {question.title} </b></h3>
      <h3 className="author-on"> posted by user {question.Author.username} on {question.createdAt.substring(0,10)} </h3>
      <div className="question-body">
        <p> {question.body} </p>
      </div>
    </li>
  );

  return (
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
        { listQuestions }
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
  );
}

export default Browse;
