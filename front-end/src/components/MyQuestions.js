import React, {useState, useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";
import Navbar from './Navbar';
import '../css/Browse.css';

const MyQuestions = () => {
  // this component displays the questions a certain signed in user has made
  // the user is redirected here through the MyProfile component
  const [questions, setQuestions] = useState('');
  const token = localStorage.getItem('REACT_TOKEN_AUTH');
  const history = useHistory();

  useEffect(() => {
    // fetch questions when component is loaded
    fetch('http://localhost:8002/getquestions/user',
        {
          method: 'GET',
          headers: {"Content-Type": "application/json", "Authorization": 'Bearer ' + JSON.parse(token)}
        })
        .then(function (res) {
              if (res.status === 200) {
                res.json()
                    .then(function (data) {
                      setQuestions(data.made);
                    })
              // error handling
              } else if (res.status === 401) {
                console.log('401 Unauthorized Error');
                alert('Your session expired. Please login again.');
                localStorage.removeItem('REACT_TOKEN_AUTH');
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
      <Navbar/>
      <div className="my-qna">
        { (questions.length !== 0) &&
        <div>
          <div className="titles">
            <h2><b> Questions you have posted: </b></h2>
          </div>
          <ul className="question-list">
            {/* display of fetched questions using map function.    *
              * for each question show title, half of its body,     *
              * author's username, keywords and when it was created */}
            {questions.map((question) =>
              <li key={question.id} className="single-question">
                {/* when question's title is clicked, redirect to         *
                  * ViewQuestion component with the question obj as state */}
                <Link to={{pathname: "/view-question", state: {question},}}
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
        {/* in case the user hasn't made any   *
          *   questions show relative message  */}
        { (questions.length === 0) &&
          <p>
            It seems you have't posted any questions yet.
            Head <Link to={'/new-question'}> here </Link> to
            start making your own questions.
          </p>
        }
      </div>
    </div>
  );
}

export default MyQuestions;
