import { observable, action } from 'mobx';
import { getFile } from 'blockstack';

class ArtworkPageStore {

    @observable artwork = {};

    @action setArtwork(data) {
        this.artwork = data;
    }

    @action async loadArtwork(id) {

        try {

            let response = await getFile(`artworks/artwork_${id}.json`, {decrypt: false});
            response = JSON.parse(response);

            this.setArtwork(response);
        }

        catch(err) { console.log(err); }

    }

}

export default new ArtworkPageStore();
