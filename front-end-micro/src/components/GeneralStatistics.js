import React, {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom";
import {LineChart, ColumnChart} from 'react-chartkick';
import 'chartkick/chart.js';
import Loading from './Loading';
import Footer from "./Footer";
import Navbar from "./Navbar";
import moment from 'moment';
import '../css/Statistics.css';

const GeneralStatistics = () => {
  // general statistics
  const [qperday, setQperDay] = useState([]);
  const [aperday, setAperDay] = useState([]);
  const [topkeywords, setTopKeywords] = useState([]);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const history = useHistory();
  // 'dates' array contains last week's dates (today's date is also included)
  // date format example: Jun 10th 2021
  const dates = [moment().subtract(7, 'days').format("MMM Do YYYY"),
                 moment().subtract(6, 'days').format("MMM Do YYYY"),
                 moment().subtract(5, 'days').format("MMM Do YYYY"),
                 moment().subtract(4, 'days').format("MMM Do YYYY"),
                 moment().subtract(3, 'days').format("MMM Do YYYY"),
                 moment().subtract(2, 'days').format("MMM Do YYYY"),
                 moment().subtract(1, 'days').format("MMM Do YYYY"),
                 moment().format("MMM Do YYYY")];

  useEffect(() => {
    // endpoints of the statistics microservice accessed for all following requests

    // fetch number of questions per day (only last weeks's data),
    // when component is mounted
    setLoading1(true);
    setLoading2(true);
    setLoading3(true);
    fetch(process.env.REACT_APP_STATISTICS_URL + 'general/questions/' + Intl.DateTimeFormat().resolvedOptions().timeZone.replace('/','%2F'),
    {
      method: 'GET',
      headers: { "Content-Type": "application/json"}
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
    // fetch number of answers per day (only last weeks's data),
    // when component is mounted
    fetch(process.env.REACT_APP_STATISTICS_URL + 'general/answers/' + Intl.DateTimeFormat().resolvedOptions().timeZone.replace('/','%2F'),
    {
      method: 'GET',
      headers: { "Content-Type": "application/json"}
    })
    .then(function (res) {
          setLoading2(false);
          if (res.status === 200) {
            res.json()
                .then(function (data) {
                  setAperDay(data);
                })
          // error handling
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
    // fetch the 20 most popular keywords (and the total number they
    // appear in questions), when component is mounted
    fetch(process.env.REACT_APP_STATISTICS_URL + 'general/keywords',
    {
      method: 'GET',
      headers: { "Content-Type": "application/json"}
    })
    .then(function (res) {
          setLoading3(false);
          if (res.status === 200) {
            res.json()
                .then(function (data) {
                  let keywords = data.map(o=>[o.word,o.count]);
                  // keywords: array[20][2]
                  setTopKeywords(keywords);
                })
          // error handling
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
  }, [history]);

  return (
    <div>
      {(loading1 || loading2 || loading3) && <Loading/>}
      {(!loading1 && !loading2 && !loading3) &&
      <div>
          <Navbar/>
          <div className="general-statistics">
            <h3 id="title">Activity statistics generated by the whole <b>ask</b>me<b>anything</b> community:</h3>
            {/* question and answer line charts */}
            <div className="diagrams">
              <div className="questions-diagram">
                <h3 className="diagram-title"> Number of <b>questions</b> posted during the last week: </h3>
                <LineChart loading="Loading..." data={[[dates[0], qperday[0]], [dates[1], qperday[1]],
                                 [dates[2], qperday[2]], [dates[3], qperday[3]],
                                 [dates[4], qperday[4]], [dates[5], qperday[5]],
                                 [dates[6], qperday[6]], [dates[7], qperday[7]]]}
                                 xtitle="date" ytitle="questions posted" />
              </div>
              <div className="answers-diagram">
                <h3 className="diagram-title"> Number of <b>answers</b> posted during the last week: </h3>
                <LineChart loading="Loading..." data={[[dates[0], aperday[0]], [dates[1], aperday[1]],
                                 [dates[2], aperday[2]], [dates[3], aperday[3]],
                                 [dates[4], aperday[4]], [dates[5], aperday[5]],
                                 [dates[6], aperday[6]], [dates[7], aperday[7]]]}
                                 xtitle="date" ytitle="answers posted" colors={["#f4a261"]} />
              </div>
            </div>
            <div className="top-keywords">
              {/* 20 most popular keywords */}
              <h3>Trending topics based on keyword popularity:</h3>
              <ul>
              {topkeywords.map(keyword =>
                <li key={keyword[0]} className="single-keyword">
                    {keyword[0]}
                </li>
              )}
              </ul>
              {/* number of questions per keyword column chart */}
              <h3> Top {topkeywords.length} <b>keywords</b> appearance <b>frequency</b> in posted questions: </h3>
              <div className="column-chart">
                <ColumnChart data={topkeywords} xtitle="keyword" ytitle="frequency"
                             colors={["#e5989b"]}/>
              </div>
            </div>
          </div>
          <Footer/>
      </div>
      }
    </div>
  );
}

export default GeneralStatistics;
