import './css/NewQuestion.css';
import { Form, Button } from "react-bootstrap";
// import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import Navbar from './Navbar.js';

const NewQuestion = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [keyword, setKeyword] = useState("");
  const [keywords, setKeywords] = useState([]);

  function updateKeywords() {
    if (!keywords.includes(keyword)) {
      keywords.push(keyword);
    }
    setKeyword("");
  }

  return (
    <div>
      <Navbar/>
      <div className="new-question">
        <h3> <b>  Make your own question! 💬 </b> </h3>
        <p>
          Here you can ask your own questions to get all the answers you need.
          Don't forget to <b>add a title to your question</b>, <br/> as well as the necessary <b>keywords </b>
          to make sure your question gets all the attention it deserves!
        </p>
        <Form>
          <Form.Group>
            <Form.Label> Question Title: </Form.Label>
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
            <label id="label-kw"> Keyword: </label>
            <input
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
              onClick={() => {setKeyword(""); setKeywords([])}}
            >
              clear keywords
            </button>
          </div>
          <Button id="btn-nq" variant="dark" type="submit"> Submit </Button>
        </Form>
      </div>
    </div>
  );
}

export default NewQuestion;
