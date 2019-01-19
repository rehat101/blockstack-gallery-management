import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import LazyImg from './LazyImg';

const GridWrapper = styled.div`
  columns: 4 200px;
`;

const GridItem = styled.div`
  width: 100%;
  padding-right: 10px;
  margin-bottom: 20px;
  -webkit-column-break-inside:avoid;
  -moz-column-break-inside:avoid;
  page-break-inside: avoid;
`;

const GridMeta = styled.div`
  margin-top: 10px;

  p {
    margin-bottom: -5px;
  }

  small {
    color: gray;
  }
`;

const GridItemAnchor = styled.a`
  color: inherit;

  &:hover {
    color: inherit;
    text-decoration: none;
  }
`;

class _Grid extends Component {

  constructor(props) {
  	super(props);
  }

  async componentDidMount() {
    const { GridStore } = this.props;

    await GridStore.loadData();
  }

  render() {
    const { GridStore } = this.props;

    return (
      <div className="container">
        <GridWrapper>
            {
              GridStore.artworks.map((v, k) => {
               return(
                <GridItemAnchor key={k} href={'app/artwork/' + v.id} data-id={v.id}>
                  <GridItem>
                      <LazyImg src={v.img_url}/>
                      <GridMeta>
                        <p>{v.title}</p>
                        <small>{v.created_at}</small>
                      </GridMeta>
                  </GridItem>
                </GridItemAnchor>
                );
              })
            }
        </GridWrapper>
      </div>
    );
  }

}

const Grid = inject('GridStore')(observer(_Grid));

export default Grid;
