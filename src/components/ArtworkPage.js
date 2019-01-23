import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { Container } from 'react-grid-system';
import Spinner from './Spinner';
import ArtworkPageData from './ArtworkPageData';

const Wrapper = styled.section`
  margin-top: 40px;

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


class _ArtworkPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };

  }

  async componentDidMount() {
    const id = parseInt(this.props.match.params.id);
    const { ArtworkPageStore } = this.props;

    this.setState({ isLoading: true });
    await ArtworkPageStore.loadArtwork(id);
    this.setState({ isLoading: false });

  }

  render() {
    const { ArtworkPageStore } = this.props;
    const artwork = ArtworkPageStore.artwork;

    if(!artwork) {
      return( <div>Artwork not found</div> );
    }

    return (
      <Wrapper>
        <Container fluid>
          {this.state.isLoading ? <Spinner/> : <ArtworkPageData artwork={artwork}/>}
        </Container>
     </Wrapper>
    );
  }

}

const ArtworkPage = inject('ArtworkPageStore')(observer(_ArtworkPage));

export default ArtworkPage;
