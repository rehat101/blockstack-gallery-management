import React, { Component } from 'react';
import {
  isUserSignedIn,
  redirectToSignIn,
  isSignInPending,
  handlePendingSignIn } from 'blockstack';
import styled from 'styled-components';
import { Button } from '../StyledComponents/button';

const SignInContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #151515;
  color: white;
`;

const Logo = styled.section`
  margin-bottom: 14px;
  width: 100px;
  height: 100px;
`;

const SignInWrapper = styled.section`
  width: 680px;
`;

class Signin extends Component {
  constructor(props) {
    super(props);

    this.handleSignIn = this.handleSignIn.bind(this);
  }

  handleSignIn(e) {
    e.preventDefault();
    redirectToSignIn(origin, origin + '/manifest.json', ['store_write', 'publish_data']);
  }

  async componentDidMount() {
    if (isSignInPending()) {
      await handlePendingSignIn();
      window.location = window.location.origin;
    }

    if(isUserSignedIn()) {
      this.props.history.push('/app/dashboard');
    }
  }

  render() {
    return (
      <SignInContainer>
        <SignInWrapper>
          <Logo><img src="logo.png"/></Logo>
          <Button onClick={this.handleSignIn}>Sign In with blockstack</Button>
        </SignInWrapper>
      </SignInContainer>
    );
  }
}

export default Signin;
