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

const idle = {
  request: ((fn) => window.requestAnimationFrame(fn)),
  cancel: ((id) => window.cancelAnimationFrame(id))
};

class LazyImg extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      src: null,
      ratio: null
    };

    this.handleLoad = this.handleLoad.bind(this);
    this.handleError = this.handleError.bind(this);
    this.getImgRatio = this.getImgRatio.bind(this);
  }

  loadImg() {
    this._rAfid = null;
    this.img = new Image();
    this.img.src = this.props.src;

    this._rAfid = idle.request(this.getImgRatio);
    this.img.addEventListener('load', this.handleLoad);
    this.img.addEventListener('error', this.handleError);
  }

  getImgRatio() {

    if(this.img.naturalWidth) {
      idle.cancel(this._rAfid);
      console.log('get width...');
      const ratio = (this.img.naturalHeight/this.img.naturalWidth) * 100;
      this.setState({ ratio });
      console.log(ratio);
    } else {
      this._rAfid = idle.request(this.getImgRatio);
    }

  }

  handleLoad() {
    this.setState({ src: this.img.src });
    this.setState({ isLoaded: true });
  }

  handleError(e) {
    console.log(e);
    this.setState({ isLoaded: false });
  }

  componentDidMount() {
    this.loadImg();
  }

  cleanup() {
    if (!this.img) {
      return;
    }

    idle.cancel(this._rAfid);
    this.img.removeEventListener('load', this.handleLoad);
    this.img.removeEventListener('error', this.handleError);
    delete this.img;
  }

  componentWillUnmount() {
    this.cleanup();
  }

  componentDidUpdate(_, prevState) {
    if (this.state.src !== prevState.src) {
      this.loadImg();
      console.log('update', prevState);
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.src !== state.src) {
      return { src: props.src };
    }

    return null;
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
