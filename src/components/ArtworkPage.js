import React, { Component } from 'react';
import LazyImg from './LazyImg';
import styled from 'styled-components';
import {Button} from '../StyledComponents/button';
import { inject, observer } from 'mobx-react';

const Container = styled.section`
  margin-top: 20px;

  a {
    font-size: 12px;
    color: black;
    border-bottom: 1px solid black;
    font-weight: 600;

    &:hover {
      text-decoration: none;
    }
  }

`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 600;
  line-height: 28px;
`;

const Desc = styled.p`
  font-size: 13px;
`;

const ContactSection = styled.section`
  border-top: 1px solid lightgray;
  padding-top: 30px;
  margin-top: 30px;
  margin-bottom: 20px;
`;

const Price = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 10px;
`;

const FootNote = styled.p`
  font-size: 12px;
  margin-bottom: 25px;
  opacity: 0.6;
  line-height: 1.4;
`;

const Center = styled.div`
  text-align: center;
`;

class _ArtworkPage extends Component {

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const id = parseInt(this.props.match.params.id);
    const { ArtworkPageStore } = this.props;

    await ArtworkPageStore.loadArtwork(id);
  }

  render() {
    const { ArtworkPageStore } = this.props;
    const artwork = ArtworkPageStore.artwork;

    if(!artwork) {
      return <div>Artwork not found</div>;
    }

    return (
      <Container>
       <div className="container">
          <div className="row">
            <div className="col-md-6">
              <Center><LazyImg src={artwork.img_url}/></Center>
            </div>
            <div className="col-md-4">
              <Title>{artwork.title}</Title>
              <Desc>{artwork.description}</Desc>
              <ContactSection>
                <Price>$2,450</Price>
                <FootNote>Ships from Aventura, FL, US<br/>Shipping: $35 continental US, $100 rest of world</FootNote>
                <Button width="100%" href="#">Bid Now</Button>
              </ContactSection>
              <a href="#">Contact Gallery</a>
            </div>
          </div>
       </div>
     </Container>
    );
  }

}

const ArtworkPage = inject('ArtworkPageStore')(observer(_ArtworkPage));

export default ArtworkPage;
