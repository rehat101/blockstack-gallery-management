import { observable, action } from 'mobx';
import { getFile, putFile } from 'blockstack';
import Promise from 'bluebird';

const INDEX_PATH = 'index.json';

const INDEX = {
  artworks: []
};

class GridStore {

	@observable data = [];

  @action.bound async createIndex() {

    try {
      await putFile(INDEX_PATH, JSON.stringify(INDEX), { encrypt: false, contentType: 'application/json'});
    }

    catch(err) { console.log(err); }

  }

	@action.bound async loadData() {

		try {

			let index = await getFile(INDEX_PATH, {decrypt: false});

      if(!index) {
        console.log(`Looks like ${INDEX_PATH} not found...`);
        await this.createIndex();
        return await this.loadData();
      }

      index = JSON.parse(index);

      const artworks = await Promise.map(index.artworks, async name => {
        let artwork = await getFile(`artworks/${name}.json`, {decrypt: false});
        return artwork = JSON.parse(artwork);
      });

      this.data = artworks;
		}

		catch(err) { console.log(err); }

	}

}

export default new GridStore();
