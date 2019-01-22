import { observable, action } from 'mobx';
import { getFile } from 'blockstack';
import Promise from 'bluebird';

class GridStore {

	@observable data = [];

	@action.bound async loadData() {

		try {

			let index = await getFile('index.json', {decrypt: false});
      index = JSON.parse(index);

      let artworks = await Promise.map(index.artworks, async name => {
        let artwork = await getFile(`artworks/${name}.json`, {decrypt: false});

        return artwork = JSON.parse(artwork);
      });

      this.data = artworks;
		}

		catch(err) { console.log(err); }

	}

}

export default new GridStore();
