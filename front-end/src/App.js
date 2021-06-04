import Browse from './components/Browse';
import BrowseUnassigned from './components/BrowseUnassigned';
import Footer from './components/Footer';
import GeneralHome from './components/GeneralHome';
import GeneralStatistics from './components/GeneralStatistics';
import Login from './components/Login';
import MyProfile from './components/MyProfile';
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
          <Route path="/browse-unassigned">
            <Navbar/>
            <BrowseUnassigned/>
          </Route>
          <Route path="/viewquestion">
            <Navbar/>
            <ViewQuestion/>
          </Route>
          <Route path="/general-statistics">
            <Navbar/>
            <GeneralStatistics/>
          </Route>
          <PrivateRoute path="/browse" component={Browse}/>
          <PrivateRoute path="/newquestion" component={NewQuestion}/>
          <PrivateRoute path="/profile" component={MyProfile}/>
          <Route path="*">
            <NotFound/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
