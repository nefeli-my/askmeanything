import './css/NewQuestion.css';
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";

const NewQuestion = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const history = useHistory();

  function validateForm() {
    return title.length > 0 && body.length > 0;
  }
  return (
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
          onChange={(e) => setBody(e.target.value)}
        />
        </Form.Group>
        <div className="input-group">
          <label id="label-kw"> Keyword: </label>
          <input
          id="keyword-box"
          placeholder="  Enter keyword"
          />
          <button className="btn btn-outline-dark btn-sm">
            Add keyword
          </button>
        </div>
        <Button id="btn-nq" variant="dark"
                type="submit" disabled={!validateForm()}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default NewQuestion;
