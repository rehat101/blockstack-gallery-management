import React, { Component, Suspense } from 'react';
import { Provider } from 'mobx-react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import GlobalStyle from '../StyledComponents/global';
import Spinner from './Spinner';

const Signin = React.lazy(() => import(/* webpackChunkName: "Signin"*/ './Signin'));
const App = React.lazy(() => import(/* webpackChunkName: "App"*/  './App'));

class Client extends Component {

  constructor(props) {
  	super(props);
  }

  render() {
    return (
      <Provider {...this.props.stores}>
      <React.Fragment>
          <GlobalStyle/>
          <BrowserRouter>
            <Suspense fallback={<Spinner/>}>
              <Switch>
                <Route exact path="/" render={(params) => <Signin {...params}/>} />
                <Route path="/app" render={(params) => <App {...params}/>} />
                <Route render={() => <p>404 Not Found</p>} />
              </Switch>
            </Suspense>
          </BrowserRouter>
      </React.Fragment>
      </Provider>
    );
  }

}

export default Client;
