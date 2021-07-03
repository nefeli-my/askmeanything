import '../css/Documentation.css';
import {Container, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import nodejs from '../assets/nodejs.png';
import expressjs from '../assets/expressjs.png';
import sequelize from '../assets/sequelize.png';
import github from '../assets/github.png';
import postgresql from '../assets/postgresql.png';
import reactjs from '../assets/reactjs.png';
import bootstrap from '../assets/bootstrap.png';
import emailjs from '../assets/emailjs.png';
import redis from '../assets/redis.png';

const Documentation = () => {
  // Project Documentation
  return (
    <div className="documentation">
      <h3> About the project's implementation using the
        <b> Microservices Architecture</b>: </h3>
      <p><i>
        (This page does not, by any means, replace the required project's documentation
        using UML diagrams, only complements it. The project's documentation using Unified Modeling
        Language, can be found
        <a href="https://github.com/nefeli-my/askmeanythingv2/tree/main/documentation"> here</a>.)
      </i></p>
      <b> Technologies used for the project: </b>
      <Container className="images">
        <Row id="row-1">
          <Col>
            <figure>
              <a href="https://nodejs.org/en/">
                <img src={nodejs} alt="nodejs"/>
              </a>
              <figcaption><b> Node JS </b></figcaption>
            </figure>
          </Col>
          <Col>
            <figure>
              <a href="https://expressjs.com/">
                <img src={expressjs} alt="expressjs"/>
              </a>
              <figcaption><b> Express JS </b></figcaption>
            </figure>
          </Col>
          <Col>
          <figure>
            <a href="https://www.postgresql.org/">
              <img src={postgresql} alt="postgresql"/>
            </a>
            <figcaption><b> PostgreSQL </b></figcaption>
          </figure>
          </Col>
        </Row>
        <Row id="row-1">
          <Col>
          <figure>
            <a href="https://sequelize.org/">
              <img src={sequelize} alt="sequelize"/>
            </a>
            <figcaption><b> Sequelize ORM </b></figcaption>
          </figure>
          </Col>
          <Col>
          <figure>
            <a href="https://reactjs.org/">
              <img src={reactjs} alt="reactjs"/>
            </a>
            <figcaption><b> React JS </b></figcaption>
          </figure>
          </Col>
          <Col>
          <figure>
            <a href="https://github.com/">
              <img src={github} alt="github"/>
            </a>
            <figcaption><b> GitHub </b></figcaption>
          </figure>
          </Col>
        </Row>
        <Row id="row-1">
          <Col>
          <figure>
            <a href="https://getbootstrap.com/">
              <img src={bootstrap} alt="bootstrap"/>
            </a>
            <figcaption><b> Bootstrap </b></figcaption>
          </figure>
          </Col>
          <Col>
          <figure>
            <a href="https://www.emailjs.com/">
              <img src={emailjs} alt="emailjs"/>
            </a>
            <figcaption><b> Email JS </b></figcaption>
          </figure>
          </Col>
          <Col>
          <figure>
            <a href="https://redis.io/">
              <img src={redis} alt="redis"/>
            </a>
            <figcaption><b> Redis </b></figcaption>
          </figure>
          </Col>
        </Row>
      </Container>
      <p>
        <b> Microservices implemented: </b>
        <ul>
          <li>
            <b> Authenticator Microservice: </b> this microservice encapsulates the main
            user-associated functionalities: user registration, logging <br/> in and logging
            out, as well as retrieval and update of personal account information. <br/>
          </li>
          <li>
            <b> Question Microservice: </b> this microservice is responsible for
            the posting of new questions.
          </li>
          <li>
            <b> Answer Microservice: </b> the Answer microservice is responsible for
            the creation of new answers, as well as for the retrieval of all <br/> of the
            answers of a chosen question.
          </li>
          <li>
            <b> QnADisplay Microservice: </b> this microservice is responsible for
            getting question posts when users browse the existing questions <br/> and answers,
            make filtered searches, or choose to view their own questions, or the questions
            they have contibuted to (answered). <br/> We note that some of the features
            mentioned above are only available to signed in users.
          </li>
          <li>
            <b> Analytics Microservice: </b> the Analytics microservice is responsible for the
            generation of general and personalized analytical <br/> information, which is
            later on presented to the users in the form of diagrams. More specifically,
            presented information is about <br/> the most used keywords and the number of
            questions and answers created during the last week. Signed in users have access <br/>
            to information generated by the whole askmeanything community, as well as solely
            by their own account.
          </li>
        </ul>
        <b> Data Management in the Microservices Architecture and the Choreographer's role: </b> <br/>
        In the Microservices Architecture, each microservice interacts with its own database, which
        only contains data relevant to the functionalities the corresponding microservice provides.
        In our project, all (five) databases are implemented as PostgreSQL <br/> databases.
        The Authenticator's database only contains Users' data, the Question Microservice's database
        contains Users', <br/> Keywords' and Questions' data, while the rest of the microservices
        have access to Users', Questions', Keywords' and Answers' <br/> information. This separation of
        databases inevitably brings about data integrity issues and evokes the need for a Choreographer,
        <br/> that is a seperate app responsible for the notification of the appropriate
        services upon an occurring event, via a Pub/Sub model. <br/> Events that cause data
        incosistencies  are mainly data creation events, such as new user creation, new question,
        or new answer submission events, so for the services' notification, three different
        channels are implemented: a users, a questions and an <br/> answers channel. The appropriate
        publisher and subscribers are defined in each of these channels, depending on the features <br/>
        each microservice implements and the data its database carries. In addition, a messages bus
        is used to store all occuring events before they are broadcast to the corresponding channel
        by the Choreographer. Thus, microservices that go down can obtain messages they may have missed,
        when they are functional once again. The Pub/Sub model described above was implemented <br/>
        using <a href="https://redis.io/"> Redis</a>.

        <br/> <br/>
        <b> Deployment: </b> <br/>
        The deployment was done using <a href="https://www.heroku.com/">Heroku</a>.
        The Microservices application was deployed as seven different applications.
      </p>
    </div>
  );
}

export default Documentation;
