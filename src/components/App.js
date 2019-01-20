import React, { Component, Suspense } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Spinner from './Spinner';

// import Dashboard from './Dashboard';
// import ArtworkPage from './ArtworkPage';

const Dashboard = React.lazy(() => import('./Dashboard'));
const ArtworkPage = React.lazy(() => import('./ArtworkPage'));

class App extends Component {

  constructor(props) {
  	super(props);

  }

  render() {
    return (
      <Suspense fallback={<Spinner/>}>
       <Switch>
          <Route exact path='/app'><Redirect to="/app/dashboard"/></Route>
          <Route exact path='/app/dashboard' render={() => <Dashboard/>}/>
          <Route path='/app/artwork/:id' render={(params) => <ArtworkPage {...params} />}/>
       </Switch>
      </Suspense>
    );
  }

}

export default App;
