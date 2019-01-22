import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import LazyImg from './LazyImg';
import Spinner from './Spinner';
import { Container } from 'react-grid-system';

const GridWrapper = styled.div`
  columns: 4 200px;
`;

const GridItem = styled.div`
  width: 100%;
  margin-bottom: 20px;
  -webkit-column-break-inside:avoid;
  -moz-column-break-inside:avoid;
  page-break-inside: avoid;
`;

const GridMeta = styled.div`
  margin-top: 2px;

  p {
    margin: 0 0 -5px 0;
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

    this.state = {
      isLoading: false
    };
  }

  async componentDidMount() {
    const { GridStore } = this.props;

    this.setState({ isLoading: true});
    await GridStore.loadData();
    this.setState({ isLoading: false});
  }

  render() {
    const { GridStore } = this.props;
    const artworks = GridStore.data;

    return (
      <GridWrapper>
      {this.state.isLoading ? <Spinner/> : null}
      <Container fluid>
          {
           artworks.map((v, k) => {
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
      </Container>
      </GridWrapper>
    );
  }

}

const Grid = inject('GridStore')(observer(_Grid));

export default Grid;
