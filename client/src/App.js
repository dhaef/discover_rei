import React, { useReducer } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.css';
import Population from './layout/Population.js';
import Metro from './components/population/Metro';
import County from './components/population/County';
import rootReducer from './reducer/index';
import { initalState } from './store/initalState';
import { Provider } from './store/index';
import Navbar from './layout/Navbar';
import Home from './components/style/Home';
import ScoreLayout from './components/score/ScoreLayout';
import Feedback from './components/style/Feedback';
import EmailList from './components/style/EmailList';
import PopupAlert from './components/style/PopupAlert';

function App() {
  const [state, dispatch] = useReducer(rootReducer, initalState);

  return (
    <Router>
      <Provider value={{ state, dispatch }}>
        <div className={{ position: 'relative' }}>
          <PopupAlert />
          <EmailList />
          <Feedback />
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/metro/:cbsa" component={Metro}></Route>
            <Route exact path="/county/:id" component={County}></Route>
            <Route exact path="/metros" render={() => <ScoreLayout placeToShow={'metro'} banner="show" />}></Route>
            <Route exact path="/counties" render={() => <ScoreLayout placeToShow={'county'} banner="show" />}></Route>
            <Route exact path="/metros/pop_growth" render={() => <Population type={'metro'} />}></Route>
            <Route exact path="/counties/pop_growth" render={() => <Population type={'county'} />}></Route>
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
