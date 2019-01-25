import React, { Component, Suspense } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Spinner from './Spinner';
import { isUserSignedIn } from 'blockstack';

const Dashboard = React.lazy(() => import('./Dashboard'));
const ArtworkPage = React.lazy(() => import('./ArtworkPage'));

const ProtectedRoute = ({isAllowed, ...rest}) => {
  return(
    isAllowed ? <Route {...rest} /> : <p>You are not authorized to view this page. Please login!</p>
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
            <ProtectedRoute isAllowed={isUserSignedIn()} exact path='/app/dashboard' render={() => <Dashboard/>}/>
            <ProtectedRoute isAllowed={isUserSignedIn()} path='/app/artwork/:id' render={(params) => <ArtworkPage {...params} />}/>
         </Switch>
      </Suspense>
    );
  }

}

export default App;
