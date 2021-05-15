import Footer from './Footer.js';
import Home from './Home.js';
import LandingPage from './LandingPage.js';
import Login from './Login.js';
import Navbar from './Navbar.js';
import NotFound from './NotFound.js';
import NewQuestion from './NewQuestion.js';
import PrivateRoute from './PrivateRoute'
import Register from './Register.js';
import { BrowserRouter as Router,  Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Navbar/>
            <LandingPage/>
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
          <PrivateRoute path="/home" component={Home}/>
          <PrivateRoute path="/newquestion" component={NewQuestion}/>
          <Route path="*">
            <NotFound/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
