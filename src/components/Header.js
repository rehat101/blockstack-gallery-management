import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { signUserOut } from 'blockstack';
import { ActionButton } from '../StyledComponents/button';
import { Container, Row, Col } from 'react-grid-system';

const ActionList = styled.ul`
  text-align: right;

  li {
    display: inline-block;
    margin-right: 5px;
  }
`;

const HeaderWrapper = styled.header`
  padding-top 20px;
  margin-bottom: 20px;
`;

class _Header extends Component {

  constructor(props) {
  	super(props);

    this.handleSignOut = this.handleSignOut.bind(this);
    this.openForm = this.openForm.bind(this);
  }

  handleSignOut(e) {
    e.preventDefault();
    signUserOut(window.location.origin);
  }

  openForm() {
    const { FormStore } = this.props;

    FormStore.setIsOpen(true);
  }

  render() {
    return (
      <HeaderWrapper>
        <Container fluid>
        <Row align="center">
          <Col>
              <p>Welcome, {this.props.name}</p>
          </Col>
          <Col>
              <ActionList>
                <li onClick={this.openForm}><ActionButton>+ Artwork</ActionButton></li>
                <li><ActionButton onClick={this.handleSignOut}>Logout</ActionButton></li>
              </ActionList>
          </Col>
        </Row>
        </Container>
      </HeaderWrapper>
    );
  }
}

const Header = inject('FormStore')(observer(_Header));

export default Header;
