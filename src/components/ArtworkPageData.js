import React from 'react';
import LazyImg from './LazyImg';
import {Button} from '../StyledComponents/button';
import { Row, Col } from 'react-grid-system';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 22px;
  font-weight: 600;
  line-height: 28px;
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

const Right = styled.section`
  min-height: 150px;
`;

const ArtworkPageData = ({artwork}) => {
  return(
    <Row justify="center">
      <Col md={4}>
        <LazyImg src={artwork.img_url} key={artwork.img_url || '(none)'}/>
      </Col>
      <Col md={4}>
      <Right>
        <Title>{artwork.title}</Title>
        <p>{artwork.description}</p>
      </Right>
        <ContactSection>
          <Price>$2,450</Price>
          <FootNote>Ships from Aventura, FL, US<br/>Shipping: $35 continental US, $100 rest of world</FootNote>
          <Button width="100%" href="#">Bid Now</Button>
        </ContactSection>
        <a href="#">Contact Gallery</a>
      </Col>
    </Row>
  );
};

export default ArtworkPageData;
