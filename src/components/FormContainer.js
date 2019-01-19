import React, { Component } from 'react';
import styled from 'styled-components';
import Form from './Form';
import { inject, observer } from 'mobx-react';

const Container = styled.div`
  background-color: rgba(12, 16, 23, 0.8);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: alias;
  z-index: 999;
`;

class _FormContainer extends Component {

  constructor(props) {
  	super(props);

    this.closeForm = this.closeForm.bind(this);
  }

  closeForm(e) {

    const { FormStore } = this.props;

    if(e.currentTarget === e.target) {
      FormStore.setIsOpen(false);
    }
  }

  render() {
    return (
      <Container onClick={this.closeForm}>
        <Form/>
      </Container>
    );
  }

}

const FormContainer = inject('FormStore')(observer(_FormContainer))

export default FormContainer;
