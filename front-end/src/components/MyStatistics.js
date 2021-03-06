import React, {useState, useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";
import {LineChart, ColumnChart} from 'react-chartkick';
import Navbar from "./Navbar";
import Footer from "./Footer";
import Loading from './Loading';
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
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const token = localStorage.getItem('askmeanything_token');
  // 'dates' array contains last week's dates (today's date is also included)
  // format example: Jun 10th 2021
  const dates = [moment().subtract(7, 'days').format("MMM Do YYYY"),
                 moment().subtract(6, 'days').format("MMM Do YYYY"),
                 moment().subtract(5, 'days').format("MMM Do YYYY"),
                 moment().subtract(4, 'days').format("MMM Do YYYY"),
                 moment().subtract(3, 'days').format("MMM Do YYYY"),
                 moment().subtract(2, 'days').format("MMM Do YYYY"),
                 moment().subtract(1, 'days').format("MMM Do YYYY"),
                 moment().format("MMM Do YYYY")];

  useEffect(() => {
    // fetch number of questions per day (only last weeks's
    // and user's data), when component is mounted
    setLoading1(true);
    setLoading2(true);
    setLoading3(true);
    setLoading4(true);
    fetch(process.env.REACT_APP_ANALYTICS_URL + 'user/questions/' + Intl.DateTimeFormat().resolvedOptions().timeZone.replace('/','%2F'),
    {
      method: 'GET',
      headers: { "Content-Type": "application/json", "Authorization": 'Bearer '+ JSON.parse(token) }
    })
    .then(function (res) {
          setLoading1(false);
          if (res.status === 200) {
            res.json()
                .then(function (data) {
                  setQperDay(data);
                })
          // error handling
          } else if (res.status === 401) {
            console.log('401 Unauthorized Error');
            alert('Your session expired. Please login again.');
            localStorage.removeItem('askmeanything_token');
            history.push('/login');
          } else if (res.status === 400) {
            console.log('400 Bad Request');
          } else {
            console.log('500 Internal Server Error');
            history.push('/error-500');
          }
        }
    )
    .catch(err => {
         console.log(err);
         history.push('/error-500');
    });
    // fetch number of answers per day (only last weeks's
    // and user's data), when component is mounted
    fetch(process.env.REACT_APP_ANALYTICS_URL + 'user/answers/' + Intl.DateTimeFormat().resolvedOptions().timeZone.replace('/','%2F'),
    {
      method: 'GET',
      headers: { "Content-Type": "application/json", "Authorization": 'Bearer '+ JSON.parse(token) }
    })
    .then(function (res) {
          setLoading2(false);
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
    )
    .catch(err => {
         console.log(err);
         history.push('/error-500');
    });
    // fetch the user's most used keywords (when posting questions)
    // limit: 20
    fetch(process.env.REACT_APP_ANALYTICS_URL + 'user/keywords',
    {
      method: 'GET',
      headers: { "Content-Type": "application/json", "Authorization": 'Bearer '+ JSON.parse(token) }
    })
    .then(function (res) {
          setLoading3(false);
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
    )
    .catch(err => {
         console.log(err);
         history.push('/error-500');
    });
    // if the user hasn't asked any questions yet, show
    // most popular keywords in general instead
    fetch(process.env.REACT_APP_ANALYTICS_URL + 'general/keywords',
    {
      method: 'GET',
      headers: { "Content-Type": "application/json" }
    })
    .then(function (res) {
          setLoading4(false);
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
    )
    .catch(err => {
        console.log(err);
        history.push('/error-500');
    });
  }, [token, history]);

  return (
    <div>
      {(loading1 || loading2 || loading3 || loading4) && <Loading/>}
      {(!loading1 && !loading2 && !loading3 && !loading4) &&
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
            {/* question line diagram */}
            <div className="questions-diagram">
              <h3 className="diagram-title"> Number of <b>questions</b> you've posted during the last week: </h3>
              <LineChart loading="Loading..."
                         data={[[dates[0], qperday[0]], [dates[1], qperday[1]],
                               [dates[2], qperday[2]], [dates[3], qperday[3]],
                               [dates[4], qperday[4]], [dates[5], qperday[5]],
                               [dates[6], qperday[6]], [dates[7], qperday[7]]]}
                               xtitle="date" ytitle="questions posted" />
            </div>
            <div className="answers-diagram">
              {/* answer line diagram */}
              <h3 className="diagram-title"> Number of <b>answers</b> you've posted during the last week: </h3>
              <LineChart loading="Loading..."
                         data={[[dates[0], aperday[0]], [dates[1], aperday[1]],
                               [dates[2], aperday[2]], [dates[3], aperday[3]],
                               [dates[4], aperday[4]], [dates[5], aperday[5]],
                               [dates[6], aperday[6]], [dates[7], aperday[7]]]}
                               xtitle="date" ytitle="answers posted" colors={["#f4a261"]} />
            </div>
          </div>
          {/* user's most frequently used keywords */}
          { (mytopkeywords.length !==0) &&
            <div className="my-keywords">
              <h3>The topics that interest you the most:</h3>
              <ul>
                {topkeywords.map((keyword) =>
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
        <Footer/>
      </div>
      }
    </div>
  );
}

export default MyStatistics;
