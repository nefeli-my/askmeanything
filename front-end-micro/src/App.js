import Browse from './components/Browse';
import BrowseUnassigned from './components/BrowseUnassigned';
import Documentation from './components/Documentation';
import Error500 from './components/Error500';
import Footer from './components/Footer';
import GeneralHome from './components/GeneralHome';
import GeneralStatistics from './components/GeneralStatistics';
import Login from './components/Login';
import Navbar from './components/Navbar';
import MyProfile from './components/MyProfile';
import MyStatistics from './components/MyStatistics';
import MyQuestions from './components/MyQuestions';
import MyAnswers from './components/MyAnswers';
import NotFound from './components/NotFound';
import NewQuestion from './components/NewQuestion';
import PrivateRoute from './components/PrivateRoute';
import Register from './components/Register';
import ViewQuestion from './components/ViewQuestion';
import UpdateName from './components/UpdateName';
import UpdatePw from './components/UpdatePassword';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ContactForm from "./components/ContactForm";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Navbar/>
            <GeneralHome/>
            <Footer/>
          </Route>
          <Route path="/login">
            <Navbar/>
            <Login/>
            <Footer/>
          </Route>
          <Route path="/register">
            <Navbar/>
            <Register/>
            <Footer/>
          </Route>
          <Route path="/contactus">
            <Navbar/>
            <ContactForm/>
            <Footer/>
          </Route>
          <Route path="/browse-unassigned">
            <Navbar/>
            <BrowseUnassigned/>
          </Route>
          <Route path="/error-500">
            <Error500/>
          </Route>
          <Route path="/view-question">
            <Navbar/>
            <ViewQuestion/>
          </Route>
          <Route path="/general-statistics">
            <Navbar/>
            <GeneralStatistics/>
            <Footer/>
          </Route>
          <Route path="/documentation">
            <Navbar/>
            <Documentation/>
          </Route>
          <PrivateRoute path="/browse" component={Browse}/>
          <PrivateRoute path="/new-question" component={NewQuestion}/>
          <PrivateRoute path="/profile" component={MyProfile}/>
          <PrivateRoute path="/my-statistics" component={MyStatistics}/>
          <PrivateRoute path="/update-password" component={UpdatePw}/>
          <PrivateRoute path="/update-name" component={UpdateName}/>
          <PrivateRoute path="/my-questions" component={MyQuestions}/>
          <PrivateRoute path="/my-answers" component={MyAnswers}/>
          <Route path="*">
            <NotFound/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
