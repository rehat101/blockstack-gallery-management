import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { Container } from 'react-grid-system';
import Spinner from './Spinner';
import GridData from './GridData';

const GridWrapper = styled.section`
  columns: 4 200px;
`;

const EmptyMsg = styled.p`
  opacity: 0.3;
  font-size: 60px;
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

    if(this.state.isLoading) {
      return(<Spinner/>);
    }

    if(artworks.length === 0) {
      return(<Container fluid><EmptyMsg>You have no artworks.</EmptyMsg></Container>);
    }

    return (
      <GridWrapper>
        <Container fluid>
          <GridData artworks={artworks}/>
        </Container>
      </GridWrapper>
    );
  }

}

const Grid = inject('GridStore')(observer(_Grid));

export default Grid;
