import React, { Component } from 'react';
import {
  isUserSignedIn,
  redirectToSignIn,
  isSignInPending,
  handlePendingSignIn } from 'blockstack';
import styled from 'styled-components';
import { Button } from '../StyledComponents/button';

const Pitch = styled.h1`
  font-size: 35px;
  font-weight: 600;
  margin: 0;
`;

const Desc = styled.h2`
  font-size: 18px;
  font-weight: normal;
  line-height: 1.5;
  margin-top: 0;
  margin-bottom: 24px;
`;

const SignInContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
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
          <Pitch>Manage and sell artworks in your gallery</Pitch>
          <Desc>Recieve inquiries, review collector profiles, and
          process payments—all in one place with easy-to-use content management and messaging system.</Desc>
          <Button onClick={this.handleSignIn}>Sign In with blockstack</Button>
        </SignInWrapper>
      </SignInContainer>
    );
  }
}

export default Signin;
