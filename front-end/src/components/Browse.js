import React, {useState, useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";
import Navbar from './Navbar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../css/Browse.css';

const Browse = () => {
  const [questions, setQuestions] = useState([]);
  const [offset, setOffset] = useState(10);
  const [show_button, setShow_Button] = useState(true);
  const [author, setAuthor] = useState("");
  const [keyword, setKeyword] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const token = localStorage.getItem('REACT_TOKEN_AUTH');
  const history = useHistory();
  // dates being displayed when applying date filter search
  let displayed_sd = "";
  let displayed_ed = "";

  if (startDate) {
    let offset = startDate.getTimezoneOffset();
    displayed_sd = new Date(startDate.getTime() - (offset * 60000));
    displayed_sd = displayed_sd.toISOString().split('T')[0];
  }
  if (endDate) {
    let offset = endDate.getTimezoneOffset();
    displayed_ed = new Date(endDate.getTime() - (offset * 60000));
    displayed_ed = displayed_ed.toISOString().split('T')[0];
  }

  useEffect(() => {
    fetch('http://localhost:8002/getquestions/0',
        {
          method: 'GET',
          headers: {"Content-Type": "application/json", "Authorization": 'Bearer ' + JSON.parse(token)}
        })
        .then(function (res) {
              if (res.status === 200) {
                res.json()
                    .then(function (data) {
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
            }
        );
  }, [token, history]);

  function getQuestions() {
    // unfiltered seach
    if (!author && !keyword && !startDate) {
      fetch('http://localhost:8002/getquestions/' + offset,
          {
            method: 'GET',
            headers: {"Content-Type": "application/json", "Authorization": 'Bearer ' + JSON.parse(token)}
          })
          .then(function (res) {
                if (res.status === 200) {
                  res.json()
                      .then(function (data) {
                        setQuestions(questions.concat(data));
                        if (data.length === 0)
                          setShow_Button(false);
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
              }
          );
    }
    // filtered search
    else {
      //format url
      let url = 'http://localhost:8002/getquestions/filters/?'
      if (author)
        url = url + `author=${author}&`;
      if (keyword)
        url = url + `keyword=${keyword}&`;
      if (startDate)
        url = url + `start_date=${startDate}&end_date=${endDate}`;

      fetch(url,
          {
            method: 'GET',
            headers: {"Content-Type": "application/json", "Authorization": 'Bearer ' + JSON.parse(token)}
          })
          .then(function (res) {
                if (res.status === 200) {
                  res.json()
                      .then(function (data) {
                        setQuestions(data);
                        if (data.length === 0)
                          setShow_Button(false);
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
              }
          );
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
                        disabled={!author}
                        onClick={() => {
                          setShow_Button(false);
                          getQuestions();
                        }}>
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
                        disabled={!keyword}
                        onClick={() => {
                          setShow_Button(false);
                          getQuestions();
                        }}>
                  search
                </button>
              </div>
            </div>
            <div className="date-search">
              <DatePicker
                  filterDate={d => {
                    return new Date() > d;
                  }}
                  isClearable
                  placeholderText="Select start date"
                  selected={startDate}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  onChange={date => setStartDate(date)}
              />
              <DatePicker
                  filterDate={d => {
                    return new Date() > d;
                  }}
                  isClearable
                  placeholderText="Select end date"
                  selected={endDate}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  onChange={date => setEndDate(date)}
              />
              <button type="button"
                      className="btn btn-outline-primary btn-sm"
                      disabled={!startDate || !endDate}
                      onClick={() => {
                        setShow_Button(false);
                        getQuestions();
                      }}>
                search
              </button>
            </div>
            <div className="inline-divs">
              {author && <p className="filters"><b>author:</b> {author} </p>}
              {keyword && <p className="filters"><b>keyword:</b> {keyword} </p>}
              {startDate && <p className="filters"><b>start date:</b> {displayed_sd} </p>}
              {endDate && <p className="filters"><b>end date:</b> {displayed_ed} </p>}
            </div>
            <ul className="question-list">
              {questions.map((question) =>
                  <li key={question.id} className="single-question">
                    <Link to={{pathname: "/view-question", state: {question},}}
                          style={{textDecoration: 'inherit', color: 'inherit'}}>
                      <h3 className="title"><b> {question.title} </b></h3>
                    </Link>
                    <h3 className="author-on">
                      posted by user {question.Author.username} on
                      {(new Date(question.createdAt)).toLocaleString('en-US')}
                    </h3>
                    <div className="question-body">
                      <p> {question.body.substring(0, question.body.length / 2)} [...] </p>
                    </div>
                    <ul className="keyword-list">
                      {question.Keywords.map((keyword,index) =>
                        <li key={ index } className="single-keyword">
                          {keyword.word}
                        </li>
                      )}
                    </ul>
                  </li>
              )}
            </ul>
            {show_button &&
            <button
                id="show-more-btn"
                onClick={() => {
                  setOffset(offset + 10);
                  getQuestions();
                }}
                className="btn btn-outline-primary">
              show more
            </button>
            }
          </div>
        </div>
    );
}

export default Browse;
