import React, { Component } from 'react';
import styled from 'styled-components';

const Img = styled.img`
	max-width: 100%;
	height: auto;
	max-height: 100%;
	width: auto;
	opacity: ${props => props.isLoaded ? '1' : '0'}
	transition: all .50s ease-in;
	pointer-events: none;
`;

class LazyImg extends Component {

	constructor(props) {
		super(props);
		this.state = { isImageLoaded: false };
	}

	ImageLoaded() {
		this.setState({ isImageLoaded: true });
	}

	ImageErrored() {
		this.setState({ isImageLoaded: false });
	}

	render() {
		return(
			<Img
				onLoad={this.ImageLoaded.bind(this)}
				onError={this.ImageErrored.bind(this)}
				isLoaded={this.state.isImageLoaded}
				src={this.props.src}/>
		);
	}

}

export default LazyImg;
