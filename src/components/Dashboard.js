import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { signUserOut } from 'blockstack';
import Header from './Header';
import Grid from './Grid';
import FormContainer from './FormContainer';

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
  }

  render() {
    const { AppStore, FormStore } = this.props;

    return (
      <main>
          <MainBody blur={FormStore.isOpen}>
            <Header name={AppStore.userName}/>
            <Grid/>
          </MainBody>
          {FormStore.isOpen ? <FormContainer /> : ''}
      </main>
    );
  }

}

const Dashboard = inject('AppStore', 'FormStore')(observer(_Dashboard));

export default Dashboard;
