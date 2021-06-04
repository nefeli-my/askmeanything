import React, {useState, useEffect} from 'react';
import { LineChart } from 'react-chartkick'
import 'chartkick/chart.js'
import moment from 'moment';
import '../css/GeneralStatistics.css';

const GeneralStatistics = () => {
  const [qperday, setQperDay] = useState([]);
  const [aperday, setAperDay] = useState([]);
  const [topkeywords, setTopKeywords] = useState([]);

  const dates = [moment().subtract(6, 'days').format("MMM Do YYYY"),
                 moment().subtract(5, 'days').format("MMM Do YYYY"),
                 moment().subtract(4, 'days').format("MMM Do YYYY"),
                 moment().subtract(3, 'days').format("MMM Do YYYY"),
                 moment().subtract(2, 'days').format("MMM Do YYYY"),
                 moment().subtract(1, 'days').format("MMM Do YYYY"),
                 moment().format("MMM Do YYYY")];

  useEffect(() => {
    fetch('http://localhost:8003/general/questions',
    {
      method: 'GET',
      headers: { "Content-Type": "application/json"}
    })
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      setQperDay(data);
    });
    fetch('http://localhost:8003/general/answers',
    {
      method: 'GET',
      headers: { "Content-Type": "application/json"}
    })
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      setAperDay(data);
    });
    fetch('http://localhost:8003/general/keywords',
    {
      method: 'GET',
      headers: { "Content-Type": "application/json"}
    })
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      setTopKeywords(data);
    });
  }, []);

  return (
    <div className="general-statistics">
      <h3 id="title">General usage statistics generated by the whole <b>ask</b>me<b>anything</b> community:</h3>
      <div className="diagrams">
        <div className="questions-diagram">
          <h3 className="diagram-title"> Number of <b>questions</b> posted during the last week: </h3>
          <LineChart data={[[dates[0], qperday[0]], [dates[1], qperday[1]],
                           [dates[2], qperday[2]], [dates[3], qperday[3]],
                           [dates[4], qperday[4]], [dates[5], qperday[5]],
                           [dates[6], qperday[6]]]} xtitle="date" ytitle="questions posted" />
        </div>
        <div className="answers-diagram">
          <h3 className="diagram-title"> Number of <b>answers</b> posted during the last week: </h3>
          <LineChart data={[[dates[0], aperday[0]], [dates[1], aperday[1]],
                           [dates[2], aperday[2]], [dates[3], aperday[3]],
                           [dates[4], aperday[4]], [dates[5], aperday[5]],
                           [dates[6], aperday[6]]]} xtitle="date" ytitle="answers posted" colors={["#f4a261"]} />
        </div>
      </div>
      <div className="top-keywords">
        <h3>Trending topics based upon keyword popularity:</h3>
        <ul>
        {topkeywords.map((keyword) =>
          <li key={keyword.keywordId} className="single-keyword">
             <b> {keyword.word} </b>
          </li>
        )}
        </ul>
      </div>
    </div>
  );
}

export default GeneralStatistics;
