import Browse from './Browse';
import Footer from './Footer';
import Home from './Home';
import LandingPage from './LandingPage';
import Login from './Login';
import Navbar from './Navbar';
import NotFound from './NotFound';
import NewQuestion from './NewQuestion';
import PrivateRoute from './PrivateRoute'
import Register from './Register';
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
          <Route path="/browse">
            <Navbar/>
            <Browse/>
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
