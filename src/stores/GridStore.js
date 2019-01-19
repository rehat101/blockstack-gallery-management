import { observable, action } from 'mobx';
import { getFile } from 'blockstack';
import Promise from 'bluebird';

class GridStore {

	@observable artworks = [];

	@action setData(data) {
		this.artworks = data;
	}

	@action async loadData() {

		try {

			let response = await getFile('index.json', {decrypt: false});
			response = JSON.parse(response);

			let data = await Promise.map(response.artworks, async id => {
				return await getFile(`artworks/${id}.json`, { decrypt: false });
			});

      data = data.map(item => JSON.parse(item));

			this.setData(data);
		}

		catch(err) { console.log(err); }

	}

}

export default new GridStore();
