import '../css/Documentation.css';
import {Container, Row, Col} from "react-bootstrap";
import nodejs from '../assets/nodejs.png';
import expressjs from '../assets/expressjs.png';
import sequelize from '../assets/sequelize.png';
import github from '../assets/github.png';
import postgresql from '../assets/postgresql.png';
import reactjs from '../assets/reactjs.png';
import bootstrap from '../assets/bootstrap.png';
import emailjs from '../assets/emailjs.png';
import passportjs from '../assets/passportjs.png';
import heroku from '../assets/heroku.png';

const Documentation = () => {
  // Project Documentation
  return (
    <div className="documentation">
      <h3> About the project's implementation using the
        <b> Service Oriented Architecture (SOA)</b>: </h3>
      <p><i>
        (This page does not, by any means, replace the required project's documentation
        using UML diagrams, only complements it. The project's documentation using Unified Modeling
        Language, can be found
        <a href="askmeanything-25.vpp" download> here</a>.)
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
        <Row id="row-2">
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
              <a href="https://www.heroku.com/">
                <img src={heroku} alt="heroku"/>
              </a>
              <figcaption><b> Heroku </b></figcaption>
            </figure>
          </Col>
        </Row>
        <Row id="row-2">
          <Col>
            <figure>
              <a href="http://www.passportjs.org/">
                <img src={passportjs} alt="passportjs"/>
              </a>
              <figcaption><b> Passport JS </b></figcaption>
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
        </Row>
      </Container>
      <p>
        <b> SOA Services implemented: </b>
        <ul>
          <li>
            <b> Authenticator Service: </b> this service encapsulates the main user-associated
            functionalities: user registration, logging in and logging <br/> out, as well as
            retrieval and update of personal account information. <br/>
          </li>
          <li>
            <b> QnAOperations Service: </b> the QnAOperations service implements all functionalities
            directly linked to users' questions and answers: question and answer retrieval
            (also in the form of filtered searches), as well as new question and new answer
            creation. We note<br/> that some of the features mentioned above are
            only available to signed in users.
          </li>
          <li>
            <b> Analytics Service: </b> this service is responsible for the generation of general
            and personalized analytical information, which is later <br/> on presented to the users
            in the form of diagrams. More specifically, presented information is about the most used
            keywords and <br/> the number of questions and answers created during the
            last week. Signed in users have access to information generated by the
            whole askmeanything community, as well as solely by their own account.
          </li>
        </ul>
        <b> Data Management in the Service Oriented Architecture: </b> <br/>
        All of the services mentioned above share a common PostgreSQL database, however
        none of them interacts directly with it; <br/> they all communicate with
        a data access layer. The data access layer is a seperate express.js app which
        contains all database <br/> related information (models, migrations and database
        seeders). Using the Sequelize ORM, it retrieves the needed data (or an <br/> error
        notification, if that is the case), from the database and sends it back to the
        requiring service in a JSON form. Thus, the <br/> services remain framework
        agnostic and only implement business logic, as specified in the SOA principles.
        <br/> <br/>
        <b> Enterprise Service Bus (ESB) and Services' Intercommunication: </b> <br/>
        The services communicate via an Enterprise Service Bus, which is implemented
        as a seperate express.js application. This <br/> app serves as a mediator for
        the communication between the QnAOperations and the Authenticator services, as
        well as <br/> between the Analytics and the Authenticator services. Through
        this intercommunication the user's token is validated and <br/> the user is
        either granted access, or handed over a 401 (Unauthorized) status code.
        <br/> <br/>
        <b> Deployment: </b> <br/>
        The deployment was done using <a href="https://www.heroku.com/">Heroku</a>.
        The SOA application was deployed as six different applications.
      </p>

    </div>
  );
}

export default Documentation;
