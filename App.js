import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css'
import Home from './components/Home/Home';
import Lab from './components/Labs/Lab'
import Vitals from './components/Vitals/Vitals';

function App() {
  return (
    <Router>
      <Header />
      <div className="App">
          <Sidebar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/vitals">
              <Vitals />
            </Route>
            <Route exact path="/labs">
              <Lab />
            </Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
