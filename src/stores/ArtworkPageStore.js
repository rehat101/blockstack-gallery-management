import { observable, action } from 'mobx';
import { getFile } from 'blockstack';

class ArtworkPageStore {

    @observable artwork = {
      img_url: ''
    };

    @action.bound async loadArtwork(id) {

        try {

            let response = await getFile(`artworks/artwork_${id}.json`, {decrypt: false});
            response = JSON.parse(response);

            this.artwork = Object.assign({}, response);

        }

        catch(err) { console.log(err); }

    }

}

export default new ArtworkPageStore();
