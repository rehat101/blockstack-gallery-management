import React, { Component } from 'react';
import { Provider } from 'mobx-react';

// import Routes from './Routes';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import App from './App';
import Signin from './Signin';
import Form from './Form';
import GlobalStyle from '../StyledComponents/global';


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
            <Switch>
              <Route exact path="/" component={Signin} />
              <Route path="/app" component={App} />
              <Route path="/add-artwork" component={Form} />
            </Switch>
        </BrowserRouter>
      </React.Fragment>
      </Provider>
    );
  }

}

export default Client;
