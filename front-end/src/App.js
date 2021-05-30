import Browse from './components/Browse';
import BrowseUnassigned from './components/BrowseUnassigned';
import Footer from './components/Footer';
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import NewQuestion from './components/NewQuestion';
import PrivateRoute from './components/PrivateRoute'
import Register from './components/Register';
import ViewQuestion from './components/ViewQuestion';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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
          <Route path="/browse-unassigned">
            <Navbar/>
            <BrowseUnassigned/>
          </Route>
          <PrivateRoute path="/browse" component={Browse}/>
          <PrivateRoute path="/home" component={Home}/>
          <PrivateRoute path="/newquestion" component={NewQuestion}/>
          <PrivateRoute path="/viewquestion" component={ViewQuestion}/>
          <Route path="*">
            <NotFound/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
