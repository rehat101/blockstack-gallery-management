import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { Button } from '../StyledComponents/button';
import ArtworkThumbPreview from './ArtworkThumbPreview';

import {
  InputContainer,
  InvisibleInput,
  InvisibleTextArea } from '../StyledComponents/input';

const FormWrapper = styled.div`
  background-color: white;
  border: 1px solid #E5E5E5;
  padding: 40px;
  width: 600px;
  cursor: auto;
`;

const ArtworkThumbContainer = styled.div`
  margin-bottom: 30px;
  position: relative;
`;

const InputFile = styled.input`
  width: 0;
  height: 0;
  overflow: hidden;
  position: absolute;
  top: -100000px;
`;

const InputFileLabel = styled.label`
  font-size: 12px;
  font-weight: normal;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.1s ease-in;

  &:hover {
    opacity: 1;
  }
`;

class _Form extends Component {

  constructor(props) {
  	super(props);

    this.uploadFile = this.uploadFile.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);
    this.handleSave = this.handleSave.bind(this);

    this.canvas = React.createRef();

    this.state = {
      title: '',
      img_url: '',
      description: '',
      img_buffer: '',
      isFormProcessing: false
    };

  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleDescChange(e) {
    this.setState({ description: e.target.value });
  }

  async handleSave() {

    const { FormStore, GridStore } = this.props;

    try {

      this.setState({isFormProcessing: true});
      await FormStore.uploadData({
        id: Date.now(),
        title: this.state.title,
        description: this.state.description,
        img_buffer: this.state.img_buffer
      });
      this.setState({isFormProcessing: false});
      FormStore.setIsOpen(false);
      await GridStore.loadData();
    }

    catch(err) { console.log(err); }

  }


  uploadFile(e) {
    const file = e.target.files[0];
    this.canvas.current.loadPreview(file);

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = async () => {
      const arrayBuffer = reader.result;
      this.setState({ img_buffer: arrayBuffer });
    };
  }

  render() {
    return (
      <FormWrapper>
        <ArtworkThumbContainer>
          <ArtworkThumbPreview ref={this.canvas}/>
          <InputFile
            type="file"
            id="files"
            onChange={this.uploadFile}
            accept="image/x-png,image/jpeg"/>
          <InputFileLabel htmlFor="files">+ Add artwork image</InputFileLabel>
        </ArtworkThumbContainer>
        <InputContainer>
          <InvisibleInput
            type="text"
            placeholder="Add Artwork title"
            fontSize="22px"
            onChange={this.handleTitleChange}
          />
          <InvisibleTextArea
            placeholder="Add description to your artwork"
            fontSize="16px"
            onChange={this.handleDescChange}
          />
        </InputContainer>
        <Button
          width="100%"
          onClick={this.handleSave}
          disabled={this.state.isFormProcessing}>
          {this.state.isFormProcessing ? 'Working...' : 'Save'}
        </Button>
      </FormWrapper>
    );
  }

}

const Form = inject('FormStore', 'GridStore')(observer(_Form));

export default Form;
