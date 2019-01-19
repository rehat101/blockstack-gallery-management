import React, { Component } from 'react';
import styled from 'styled-components';

const ArtworkThumb = styled.div`
  background-color: white;
  border: 1px solid #E5E5E5;
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
`;

class ArtworkThumbPreview extends Component {

  constructor(props) {
  	super(props);

    this.artCanvas = React.createRef();
  }

  loadPreview(file) {
    const canvas = this.artCanvas.current;
    const ctx = canvas.getContext('2d');
    const imgUrl = URL.createObjectURL(file);
    const img = new Image();
    img.src = imgUrl;

    img.onload = () => {
      const newImg = this.setImageDimensions(200, 200, img.naturalWidth, img.naturalHeight);
      ctx.drawImage(img, 0, 0, newImg.width, newImg.height);
    };
  }

  setImageDimensions(maxW, maxH, naturalW, naturalH) {
    const maxWidth = maxW;
    const maxHeight = maxH;

    const ratio = Math.min(
      maxWidth / naturalW,
      maxHeight / naturalH
    );

    return {
      width: naturalW * ratio,
      height: naturalH * ratio
    };
  };

  render() {
    return (
      <ArtworkThumb>
        <canvas ref={this.artCanvas} width={100} height={100} />
      </ArtworkThumb>
    );
  }

}

export default ArtworkThumbPreview;
