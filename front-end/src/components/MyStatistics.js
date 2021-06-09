import React, {useState, useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";
import {LineChart, ColumnChart} from 'react-chartkick';
import Navbar from "./Navbar";
import 'chartkick/chart.js';
import moment from 'moment';
import '../css/Statistics.css';

const MyStatistics = () => {
  // personalized statistics
  const [qperday, setQperDay] = useState([]);
  const [aperday, setAperDay] = useState([]);
  const [mytopkeywords, setMyTopKeywords] = useState([]);
  const [topkeywords, setTopKeywords] = useState([]);
  const history = useHistory();
  const token = localStorage.getItem('REACT_TOKEN_AUTH');
  // 'dates' array contains last week's dates (today's date is also included)
  // format example: to add
  const dates = [moment().subtract(6, 'days').format("MMM Do YYYY"),
                 moment().subtract(5, 'days').format("MMM Do YYYY"),
                 moment().subtract(4, 'days').format("MMM Do YYYY"),
                 moment().subtract(3, 'days').format("MMM Do YYYY"),
                 moment().subtract(2, 'days').format("MMM Do YYYY"),
                 moment().subtract(1, 'days').format("MMM Do YYYY"),
                 moment().format("MMM Do YYYY")];

  useEffect(() => {
    // fetch number of questions per day (only last weeks's
    // and user's data), when component is mounted
    fetch('http://localhost:8003/user/questions',
    {
      method: 'GET',
      headers: { "Content-Type": "application/json", "Authorization": 'Bearer '+ JSON.parse(token) }
    })
    .then(function (res) {
          if (res.status === 200) {
            res.json()
                .then(function (data) {
                  setQperDay(data);
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
    // fetch number of answers per day (only last weeks's
    // and user's data), when component is mounted
    fetch('http://localhost:8003/user/answers',
    {
      method: 'GET',
      headers: { "Content-Type": "application/json", "Authorization": 'Bearer '+ JSON.parse(token) }
    })
    .then(function (res) {
          if (res.status === 200) {
            res.json()
                .then(function (data) {
                  setAperDay(data);
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
    // fetch the user's most used keywords (when posting questions)
    // limit: 20
    fetch('http://localhost:8003/user/keywords',
    {
      method: 'GET',
      headers: { "Content-Type": "application/json", "Authorization": 'Bearer '+ JSON.parse(token) }
    })
    .then(function (res) {
          if (res.status === 200) {
            res.json()
                .then(function (data) {
                  let keywords = data.map(o=>[o.word,o.count]);
                  // keywords: array[20][2]
                  setMyTopKeywords(keywords);
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
    // if the user hasn't asked any questions yet, show
    // most popular keywords in general instead
    fetch('http://localhost:8003/general/keywords',
    {
      method: 'GET',
      headers: { "Content-Type": "application/json" }
    })
    .then(function (res) {
          if (res.status === 200) {
            res.json()
                .then(function (data) {
                  let keywords = data.map(o=>[o.word,o.count]);
                  // keywords: array[20][2]
                  setTopKeywords(keywords);
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

  return (
    <div>
      <Navbar/>
      <div className="my-statistics">
        <nav>
          <a href="/profile">Account information</a>
          <a href="/my-statistics">My askmeanything statistics</a>
        </nav>
        <h3 id="title"> In this page you can find information about your <b>ask</b>me<b>anything</b> activity.
        You can view more general information <Link to="/general-statistics"> here</Link>. </h3>
        <div className="diagrams">
          {/* question diagram */}
          <div className="questions-diagram">
            <h3 className="diagram-title"> Number of <b>questions</b> you've posted during the last week: </h3>
            <LineChart data={[[dates[0], qperday[0]], [dates[1], qperday[1]],
                             [dates[2], qperday[2]], [dates[3], qperday[3]],
                             [dates[4], qperday[4]], [dates[5], qperday[5]],
                             [dates[6], qperday[6]]]} xtitle="date" ytitle="questions posted" />
          </div>
          <div className="answers-diagram">
            {/* answer diagram */}
            <h3 className="diagram-title"> Number of <b>answers</b> you've posted during the last week: </h3>
            <LineChart data={[[dates[0], aperday[0]], [dates[1], aperday[1]],
                             [dates[2], aperday[2]], [dates[3], aperday[3]],
                             [dates[4], aperday[4]], [dates[5], aperday[5]],
                             [dates[6], aperday[6]]]} xtitle="date" ytitle="answers posted" colors={["#f4a261"]} />
          </div>
        </div>
        {/* user's most frequently used keywords */}
        { (mytopkeywords.length !==0) &&
          <div className="my-keywords">
            <h3>The topics that interest you the most:</h3>
            <ul>
              {mytopkeywords.map((keyword) =>
                <li key={keyword[0]} className="single-keyword">
                  {keyword[0]}
                </li>
              )}
            </ul>
            {/* number of questions per keyword column chart */}
            <h3> Your top <b>keywords</b> appearance <b>frequency</b>:
                (only the questions you have posted are taken into consideration)
            </h3>
            <div className="column-chart">
              <ColumnChart data={mytopkeywords} xtitle="keyword" ytitle="frequency"
                           colors={["#48cae4"]}/>
            </div>
          </div>
        }
        {/* or most popular keywords (in general) */}
        { (mytopkeywords.length === 0) &&
            <div className="my-keywords">
              <h3> It seems you haven't made enough questions yet for us to get to know what interests you!
              However, here are the most popular topics in the community right now: </h3>
              <ul>
                {topkeywords.map((keyword) =>
                  <li key={keyword[0]} className="single-keyword">
                    {keyword[0]}
                  </li>
                )}
              </ul>
              {/* number of questions per keyword column chart */}
              <h3> Top {topkeywords.length} <b>keywords</b> appearance <b>frequency</b> in posted questions: </h3>
              <div className="column-chart">
                <ColumnChart data={topkeywords} xtitle="keyword" ytitle="frequency"
                             colors={["#48cae4"]}/>
              </div>
            </div>
        }
      </div>
    </div>
  );
}

export default MyStatistics;
