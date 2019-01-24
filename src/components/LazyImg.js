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
  request: ((fn) => window.requestIdleCallback(fn, {timeout: 50})) || ((fn) => setTimeout(fn, 10)),
  cancel: ((id) => window.cancelIdleCallback(id))
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

  }

  loadImg() {
    this.idleHandle = null;
    this.img = new Image();
    this.img.src = this.props.src;

    // this.poll = setInterval(() => {

    //   if (this.img.naturalWidth) {
    //     clearInterval(this.poll);
    //     this.setState({ ratio: (this.img.naturalHeight/this.img.naturalWidth) * 100 });
    //   }

    // }, 10);

    this.idleHandle = idle.request(() => {
      this.idleHandle = null;
      this.setState({ ratio: (this.img.naturalHeight/this.img.naturalWidth) * 100 });
    });

    this.img.addEventListener('load', this.handleLoad);
    this.img.addEventListener('error', this.handleError);
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

  componentWillUnmount() {
    if (!this.img) {
      return;
    }

    idle.cancel(this.handleIdle);
    this.img.removeEventListener('load', this.handleLoad);
    this.img.removeEventListener('error', this.handleError);
    delete this.img;
  }

  componentDidUpdate(_, prevState) {
    if (this.state.src !== prevState.src) {
      this.loadImg();
      console.log('update', prevState);
    } else {
      console.log('dont update!');
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.src !== state.src) {
      return { src: props.src };
    }

    console.log(props,state);
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
