import { Form, Button } from "react-bootstrap";
import React, { useState } from "react";
import Navbar from './Navbar';
import { useHistory } from "react-router-dom";
import '../css/NewQuestion.css';

const NewQuestion = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [keyword, setKeyword] = useState("");
  const [keywords, setKeywords] = useState([]);
  const history = useHistory();

  function updateKeywords() {
    if (!keywords.includes(keyword.toLowerCase())) {
      keywords.push(keyword.toLowerCase());
    }
    //setKeyword("");
  }

  const question = { title: title, body: body, keywords: keywords };
  function submitQuestion() {
    const token = localStorage.getItem('REACT_TOKEN_AUTH');
    console.log(token);
    fetch('http://localhost:8002/createquestion/', {
      method: 'POST',
      headers: { "Content-Type": "application/json", "Authorization": "Bearer "+ JSON.parse(token) },
      body: JSON.stringify(question)
      })
    .then(() => history.push('/'))
    .catch(err => console.log(err));
  }

  return (
    <div>
      <Navbar/>
      <div className="new-question">
        <div className="description">
          <h3> <b>  Make your own question! 💬 </b> </h3>
          <p>
            Here you can ask your own questions to get all the answers you need.
            Don't forget to <b>add a title to your question</b>, as well as <br/>the necessary <b>keywords </b>
            to make sure your question gets all the attention it deserves!
          </p>
        </div>
        <Form className="new-question-form">
          <Form.Group>
            <Form.Label className="label"> Question Title: </Form.Label>
            <Form.Control
            placeholder="Enter title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            />
            <Form.Text className="text-muted">
              We advise you to keep your title short and descriptive.
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label> Question Text: </Form.Label>
            <textarea id="text-box"
            rows="8" cols="100"
            value={body}
            required
            onChange={(e) => setBody(e.target.value)}
          />
          </Form.Group>
          <ul>
              {keywords.map(keyword => (
              <li className="keyword" key={keyword}>{keyword}</li>
              ))}
          </ul>
          <div className="input-group">
            <Form.Label className="label"> Keyword: </Form.Label>
            <Form.Control
            placeholder="  Enter keyword"
            id= "keyword-box"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            />
            <button
              className="btn btn-outline-dark btn-sm"
              onClick={updateKeywords}
            >
              add keyword
            </button>
            <button
              className="btn btn-outline-dark btn-sm"
              id="btn-keyword"
              onClick={() => {setKeyword(""); setKeywords([])}}
            >
              clear all keywords
            </button>
          </div>
          <Button id="btn-submit" variant="dark" onClick={() => submitQuestion()}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default NewQuestion;
