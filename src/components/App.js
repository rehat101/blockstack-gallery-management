import React, { Component, Suspense } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { isUserSignedIn } from 'blockstack';
import Spinner from './Spinner';

const Dashboard = React.lazy(() => import(/* webpackChunkName: "Dashboard"*/ './Dashboard'));
const ArtworkPage = React.lazy(() => import(/* webpackChunkName: "ArtworkPage" */ './ArtworkPage'));

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
