import React, { Component } from 'react';
import Header from './Header';
import Grid from './Grid';
import { inject, observer } from 'mobx-react';
import GlobalStyle from '../StyledComponents/global';
import styled from 'styled-components';
import FormContainer from './FormContainer';

import {
  signUserOut,
  listFiles,
} from 'blockstack';

const MainBody = styled.section`
  filter: ${props => props.blur ? 'blur(10px)' : 'blur(0px)'};
`;

class _Dashboard extends Component {

  constructor(props) {
  	super(props);

  }

  handleSignOut(e) {
    e.preventDefault();
    signUserOut(window.location.origin);
  }

  async componentDidMount() {
    const { AppStore } = this.props;
    await AppStore.loadUserInfo();

    listFiles((files) => console.log(files));

  }

  render() {
    const { AppStore } = this.props;
    const { FormStore } = this.props;

    return (
      <main>
          <GlobalStyle/>
          <MainBody blur={FormStore.isOpen}>
            <Header name={AppStore.userName}/>
            <Grid/>
          </MainBody>
          {FormStore.isOpen ? <FormContainer/> : ''}
      </main>
    );
  }

}

const Dashboard = inject('AppStore', 'FormStore')(observer(_Dashboard));

export default Dashboard;
