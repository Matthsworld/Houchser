import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Home from './components/Home';
import Booking from './components/Booking';
import Profile from './components/Profile';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/booking" component={Booking} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;

