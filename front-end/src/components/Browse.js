import React, {useState, useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";
import Navbar from './Navbar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../css/Browse.css';

const Browse = () => {
  // browse page for signed in users (private route used)
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
    // taking into account the time zone difference
    let offset = startDate.getTimezoneOffset();
    displayed_sd = new Date(startDate.getTime() - (offset * 60000));
    // keep only the 'MM-DD-YYYY' part of the date
    displayed_sd = displayed_sd.toISOString().split('T')[0];
  }
  if (endDate) {
    // taking into account the time zone difference
    let offset = endDate.getTimezoneOffset();
    displayed_ed = new Date(endDate.getTime() - (offset * 60000));
    // keep only the 'MM-DD-YYYY' part of the date
    displayed_ed = displayed_ed.toISOString().split('T')[0];
  }

  useEffect(() => {
    // show the first 10 (most recent) questions right after the page is mounted
    // offset used: 0 (reminder: sequelize query limit is set to 10)
    // get request to qnaoperations service endpoint
    fetch('http://localhost:8002/getquestions/0',
        {
          method: 'GET',
          headers: {"Content-Type": "application/json", "Authorization": 'Bearer ' + JSON.parse(token)}
        })
        .then(function (res) {
              if (res.status === 200) {
                res.json()
                    .then(function (data) {
                      // set questions to acquired data
                      setQuestions(data);
                    })
              // error handling
              } else if (res.status === 401) {
                console.log('401 Unauthorized Error');
                alert('Your session expired. Please login again.');
                localStorage.removeItem('REACT_TOKEN_AUTH')
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
      // when the user clicks the 'show more' button at the end of the page
      // the offset is increased by 10, thus loading more questions
      // in a gradual way. (10 questions loaded per request)
      fetch('http://localhost:8002/getquestions/' + offset,
          {
            method: 'GET',
            headers: {"Content-Type": "application/json", "Authorization": 'Bearer ' + JSON.parse(token)}
          })
          .then(function (res) {
                if (res.status === 200) {
                  res.json()
                      .then(function (data) {
                        // concat returned questions to the ones
                        // already displayed
                        setQuestions(questions.concat(data));
                        // stop showing the 'show more' button
                        // if there aren't any questions left to fetch
                        if (data.length === 0)
                          setShow_Button(false);
                      })
                // error handling
                } else if (res.status === 401) {
                  console.log('401 Unauthorized Error');
                  localStorage.removeItem('REACT_TOKEN_AUTH');
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
                        // 'show more' button not used in filtered search
                        // all relative questions are returned in the first req
                        // (no offset and limit used)
                        setQuestions(data);
                      })
                //  error handling
                } else if (res.status === 401) {
                  console.log('401 Unauthorized Error');
                  alert('Your session expired. Please login again.');
                  localStorage.removeItem('REACT_TOKEN_AUTH')
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
            </div>
            {/* search boxes for filtered search */}
            <div className="inline-divs">
              {/* =search by username */}
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
              {/* search by keyword */}
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
            {/* search by time period */}
            <div className="date-search">
              <div className="datepicker">
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
              </div>
              <div className="datepicker">
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
                    className="datepicker"
                />
              </div>
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
            {/* show the user the filters being applied */}
            <div className="inline-divs">
              {author && <p className="filters"><b>author:</b> {author} </p>}
              {keyword && <p className="filters"><b>keyword:</b> {keyword} </p>}
              {startDate && <p className="filters"><b>start date:</b> {displayed_sd} </p>}
              {endDate && <p className="filters"><b>end date:</b> {displayed_ed} </p>}
            </div>
            {/* display list of  fetched questions                  *
              * for each question show title, half of its body,     *
              * author's username, keywords and when it was created */}
            <ul className="question-list">
              {questions.map((question) =>
                  <li key={question.id} className="single-question">
                    {/* when question's title is clicked, redirect to         *
                      * ViewQuestion component with the question obj as state */}
                    <Link to={{pathname: "/view-question", state: {question: question}}}
                          className="link">
                      <h3 className="title"><b> {question.title} </b></h3>
                    </Link>
                    {/* &nbsp; used to create empty space */}
                    <h3 className="author-on">
                      posted by user {question.Author.username} on &nbsp;
                      {(new Date(question.createdAt)).toLocaleString('en-GB')}
                    </h3>
                    {/* show only half of the question's body */}
                    <div className="question-body">
                      <p> {question.body.substring(0, question.body.length / 2)} [...] </p>
                    </div>
                    {/* keywords displayed for each question */}
                    <ul className="keyword-list">
                      {question.Keywords.map((keyword,index) =>
                        <li key={index} className="single-keyword">
                          {keyword.word}
                        </li>
                      )}
                    </ul>
                  </li>
              )}
            </ul>
            {/* load more questions button, *
              * (for unfiltered search)     */}
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
