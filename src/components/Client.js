import React, { Component } from 'react';
import { Provider } from 'mobx-react';

// import Routes from './Routes';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import App from './App';
import Signin from './Signin';
import Form from './Form';

class Client extends Component {

  constructor(props) {
  	super(props);
  }

  render() {
    return (
      <Provider {...this.props.stores}>
         <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Signin} />
              <Route path="/app" component={App} />
              <Route path="/add-artwork" component={Form} />
            </Switch>
        </BrowserRouter>
      </Provider>
    );
  }

}

export default Client;
