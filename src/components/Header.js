import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';

import { signUserOut } from 'blockstack';
import { ActionButton } from '../StyledComponents/button';

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
        <div className="container">
          <div className="row">
            <div className="col-md-6">
                <p>Welcome, {this.props.name}</p>
            </div>
            <div className="col-md-6">
              <ActionList>
                <li onClick={this.openForm}><ActionButton>+ Artwork</ActionButton></li>
                <li><ActionButton onClick={this.handleSignOut}>Logout</ActionButton></li>
              </ActionList>
            </div>
          </div>
        </div>
      </HeaderWrapper>
    );
  }
}

const Header = inject('FormStore')(observer(_Header));

export default Header;
