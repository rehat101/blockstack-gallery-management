import React, { Component, Suspense } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Spinner from './Spinner';
import { isUserSignedIn } from 'blockstack';

const Dashboard = React.lazy(() => import('./Dashboard'));
const ArtworkPage = React.lazy(() => import('./ArtworkPage'));

const ProtectedRoute = (props) => {
  return(
    isUserSignedIn() ? <Route {...props} /> : <p>You are not authorized to view this page. Please login!</p>
  );
};

class App extends Component {

  constructor(props) {
  	super(props);
  }

  render() {
    return (
      <Suspense fallback={<Spinner/>}>
         <Switch>
            <Route exact path='/app'><Redirect to="/app/dashboard"/></Route>
            <ProtectedRoute exact path='/app/dashboard' render={() => <Dashboard/>}/>
            <ProtectedRoute path='/app/artwork/:id' render={(params) => <ArtworkPage {...params} />}/>
            <Route render={() => <p>404 Not Found</p>} />
         </Switch>
      </Suspense>
    );
  }

}

export default App;
