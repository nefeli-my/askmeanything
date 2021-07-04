import React, {useState, useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";
import Navbar from './Navbar';
import Loading from './Loading';
import '../css/Browse.css';

const MyAnswers = () => {
  // this component displays the questions to which a certain
  // signed in user has contributed to (answered)
  // the user is redirected here through the MyProfile component
  const [questions, setQuestions] = useState('');
  const token = localStorage.getItem('askmeanything_token');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    // fetch questions when component is loaded
    setLoading(true);
    fetch(process.env.REACT_APP_QNA_URL + 'getquestions/user',
        {
          method: 'GET',
          headers: {"Content-Type": "application/json", "Authorization": 'Bearer ' + JSON.parse(token)}
        })
        .then(function (res) {
              setLoading(false);
              if (res.status === 200) {
                res.json()
                    .then(function (data) {
                      // 'data' also includes the questions the user
                      //  has made, keep only the ones he/she has answered to
                      setQuestions(data.answered);
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
  }, [token, history]);
  return (
    <div>
      {loading && <Loading/>}
      {!loading &&
      <div>
        <Navbar/>
        <div className="my-qna">
          {/* display questions */}
          { (questions.length !== 0) &&
          <div>
            <div className="titles">
              <h2><b> Questions which you have contributed to: </b></h2>
            </div>
            <ul className="question-list">
              {/* display of fetched questions using map function.    *
                * for each question show title, half of its body,     *
                * author's username, keywords and when it was created */}
              {questions.map((question) =>
                <li key={question.id} className="single-question">
                  {/* when question's title is clicked, redirect to         *
                    * ViewQuestion component */}
                    <Link to={{pathname: `/view-question/${question.id}`}}
                        className="link">
                    <h3 className="title"><b> {question.title} </b></h3>
                  </Link>
                  {/* &nbsp; used to create empty space */}
                  <h3 className="author-on">
                    posted by user {question.Author.username} on &nbsp;
                    {(new Date(question.createdAt)).toLocaleString('en-GB')}
                  </h3>
                  <div className="question-body">
                    <p> {question.body.substring(0, question.body.length / 2)} [...] </p>
                  </div>
                  <ul className="keyword-list">
                    {question.Keywords.map((keyword, index) =>
                      <li key={index} className="single-keyword">
                         {keyword.word}
                      </li>
                    )}
                  </ul>
                </li>
              )}
            </ul>
          </div>
          }
          {/* in case the user hasn't answered any *
            *   questions show relative message    */}
          { (questions.length === 0) &&
            <p>
              It seems you have't made any contributions!
              Head <Link to={'/browse'}> here </Link> to
              start helping the <b>ask</b>me<b>anything</b> community.
            </p>
          }
        </div>
      </div>
      }
    </div>
  );
}

export default MyAnswers;
