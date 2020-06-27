import React, { useReducer } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.css';
import Population from './layout/population/Population.js';
import Metro from './components/population/Metro';
import County from './components/population/County';
import rootReducer from './reducer/index';
import { initalState } from './store/initalState';
import { Provider } from './store/index';
import Navbar from './layout/navbar/Navbar';
import Home from './components/style/Home';

function App() {
  const [state, dispatch] = useReducer(rootReducer, initalState);

  return (
    <Router>
      <Provider value={{ state, dispatch }}>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/metro/:cbsa" component={Metro}></Route>
            <Route exact path="/county/:id" component={County}></Route>
            <Route exact path="/metros" render={() => <Home placeToShow={'metro'} />}></Route>
            <Route exact path="/counties" render={() => <Home placeToShow={'county'} />}></Route>
            <Route exact path="/metros/pop_growth" render={() => <Population type={'metro'} />}></Route>
            <Route exact path="/counties/pop_growth" render={() => <Population type={'county'} />}></Route>
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
