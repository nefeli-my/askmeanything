import React, {useState, useEffect} from 'react';
import { LineChart } from 'react-chartkick';
import { Link } from "react-router-dom";
import 'chartkick/chart.js';
import moment from 'moment';
import Navbar from './Navbar';
import '../css/Statistics.css';

const MyProfile = () => {
  const [qperday, setQperDay] = useState([]);
  const [aperday, setAperDay] = useState([]);
  const [mytopkeywords, setMyTopKeywords] = useState([]);
  const [topkeywords, setTopKeywords] = useState([]);
  const token = localStorage.getItem('REACT_TOKEN_AUTH');
  const dates = [moment().subtract(6, 'days').format("MMM Do YYYY"),
                 moment().subtract(5, 'days').format("MMM Do YYYY"),
                 moment().subtract(4, 'days').format("MMM Do YYYY"),
                 moment().subtract(3, 'days').format("MMM Do YYYY"),
                 moment().subtract(2, 'days').format("MMM Do YYYY"),
                 moment().subtract(1, 'days').format("MMM Do YYYY"),
                 moment().format("MMM Do YYYY")];

  useEffect(() => {
    fetch('http://localhost:8003/user/questions',
    {
      method: 'GET',
      headers: { "Content-Type": "application/json", "Authorization": 'Bearer '+ JSON.parse(token) }
    })
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      setQperDay(data);
    });
    fetch('http://localhost:8003/user/answers',
    {
      method: 'GET',
      headers: { "Content-Type": "application/json", "Authorization": 'Bearer '+ JSON.parse(token) }
    })
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      setAperDay(data);
    });
    fetch('http://localhost:8003/user/keywords',
    {
      method: 'GET',
      headers: { "Content-Type": "application/json", "Authorization": 'Bearer '+ JSON.parse(token) }
    })
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      setMyTopKeywords(data);
    });
    fetch('http://localhost:8003/general/keywords',
    {
      method: 'GET',
      headers: { "Content-Type": "application/json" }
    })
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      setTopKeywords(data);
    });
  }, [token]);

  return (
    <div>
      <Navbar/>
      <div className="my-profile">
        <h3 id="title"> In this page you can find information about your <b>ask</b>me<b>anything</b> activity.
        You can view more general information <Link to="/general-statistics"> here</Link>. </h3>
        <div className="diagrams">
          <div className="questions-diagram">
            <h3 className="diagram-title"> Number of <b>questions</b> you've posted during the last week: </h3>
            <LineChart data={[[dates[0], qperday[0]], [dates[1], qperday[1]],
                             [dates[2], qperday[2]], [dates[3], qperday[3]],
                             [dates[4], qperday[4]], [dates[5], qperday[5]],
                             [dates[6], qperday[6]]]} xtitle="date" ytitle="questions posted" />
          </div>
          <div className="answers-diagram">
            <h3 className="diagram-title"> Number of <b>answers</b> you've posted during the last week: </h3>
            <LineChart data={[[dates[0], aperday[0]], [dates[1], aperday[1]],
                             [dates[2], aperday[2]], [dates[3], aperday[3]],
                             [dates[4], aperday[4]], [dates[5], aperday[5]],
                             [dates[6], aperday[6]]]} xtitle="date" ytitle="answers posted" colors={["#f4a261"]} />
          </div>
        </div>
        { (mytopkeywords.length !==0) &&
          <div className="my-keywords">
            <h3>The topics that interest you the most:</h3>
            <ul>
            {mytopkeywords.map((keyword) =>
              <li key={keyword.keywordId} className="single-keyword">
                {keyword.word}
              </li>
            )}
            </ul>
          </div>
        }
        { (mytopkeywords.length === 0) &&
            <div className="my-keywords">
              <h3> It seems you haven't made enough questions yet for us to get to know what interests you!
              However, here are the most popular topics in the community right now: </h3>
              <ul>
              {topkeywords.map((keyword) =>
                <li key={keyword.keywordId} className="single-keyword">
                  {keyword.word}
                </li>
              )}
              </ul>
            </div>
        }
      </div>
    </div>
  );
}

export default MyProfile;