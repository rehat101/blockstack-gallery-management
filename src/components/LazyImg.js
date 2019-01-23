import React, { Component } from 'react';
import styled from 'styled-components';

const Figure = styled.figure`
  height: 0;
  margin: 0;
  background-color: #efefef;
  position: relative;
  padding-bottom: ${props => props.ratio}%;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  top: 0;
  position: absolute;
  object-fit: contain;
  opacity: ${props => props.isLoaded ? '1' : '0'};
  transition: opacity .20s ease-in;
`;

class LazyImg extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      src: null,
      ratio: null
    };
  }


  componentDidMount() {
    this.img = new Image();
    this.img.src = this.props.src;
    const src = this.img.src;

    this.poll = setInterval(() => {
      if (this.img.naturalWidth) {
          clearInterval(this.poll);
          const ratio = (this.img.naturalHeight/this.img.naturalWidth) * 100;
          this.setState({ ratio });
      }
    }, 10);

    this.img.onload = () => {
      this.setState({ src });
      this.setState({ isLoaded: true });
    };
  }

  componentWillUnmount() {

    if (!this.img) {
      return;
    }

    clearInterval(this.poll);
    this.img.onload = () => {};
    delete this.img;
  }

  render() {
    const {src, ratio, isLoaded} = this.state;

    return(
      <Figure ratio={ratio}>
        <Img isLoaded={isLoaded} src={src}/>
      </Figure>
    );
  }

}

export default LazyImg;
