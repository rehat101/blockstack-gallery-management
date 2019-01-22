import React, { Component, Suspense } from 'react';
import { Provider } from 'mobx-react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import App from './App';
import GlobalStyle from '../StyledComponents/global';

const Signin = React.lazy(() => import('./Signin'));


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
            <Suspense fallback="...">
              <Switch>
                <Route exact path="/" render={(params) => <Signin {...params}/>} />
                <Route path="/app" component={App} />
              </Switch>
            </Suspense>
          </BrowserRouter>
      </React.Fragment>
      </Provider>
    );
  }

}

export default Client;
