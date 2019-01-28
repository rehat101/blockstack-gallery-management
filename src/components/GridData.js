import React from 'react';
import styled from 'styled-components';
import LazyImg from './LazyImg';

const Item = styled.div`
  width: 100%;
  margin-bottom: 20px;
  -webkit-column-break-inside:avoid;
  -moz-column-break-inside:avoid;
  page-break-inside: avoid;
`;

const Meta = styled.div`
  margin-top: 2px;

  p {
    margin: 0 0 -5px 0;
  }

  small {
    color: gray;
  }
`;

const Anchor = styled.a`
  color: inherit;

  &:hover {
    color: inherit;
    text-decoration: none;
  }
`;

const GridData = ({ artworks }) => {
  return artworks.map((artwork, key) => {
    return(
      <Anchor key={key} href={'app/artwork/' + artwork.id} data-id={artwork.id}>
        <Item>
            <LazyImg src={artwork.img_url}/>
            <Meta>
              <p>{artwork.title}</p>
              <small>{artwork.created_at}</small>
            </Meta>
        </Item>
      </Anchor>
    );
  });
};

export default GridData;
