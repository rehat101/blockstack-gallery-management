import React, { Component } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Dashboard from './Dashboard';
import ArtworkPage from './ArtworkPage';

class App extends Component {

  constructor(props) {
  	super(props);

  }

  render() {
    return (
      <main>
       <Switch>
          <Route exact path='/app'><Redirect to="/app/dashboard"/></Route>
          <Route exact path='/app/dashboard' component={Dashboard}/>
          <Route path='/app/artwork/:id' component={ArtworkPage}/>
       </Switch>
      </main>
    );
  }

}

export default App;
