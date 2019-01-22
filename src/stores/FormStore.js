import { action, observable } from 'mobx';
import { putFile, getFile } from 'blockstack';
import { indexOf } from 'lodash';

const IMG_PATH = 'artworks/images/artwork_';
const ART_DATA_PATH = 'artworks/artwork_';
const INDEX_PATH = 'index.json';

class FormStore {

  @observable isOpen = false;

  @action setIsOpen(value) {
    this.isOpen = value;
  }

  parseArtworkData(payload, imgUrl) {

    let data = {
        id: payload.id,
        img_url: imgUrl,
        title: payload.title,
        description: payload.description,
        created_at: (new Date).toISOString()
    };

    data = JSON.stringify(data);

    return data;
  }

  @action async uploadData(payload) {

    if(!payload.title) throw new Error('Missing title!');
    if(!payload.description) throw new Error('Missing description!');
    if(!payload.img_buffer) throw new Error('Missing artwork image!');
    if(!payload.id) throw new Error('Must define an ID');

    if( !(payload.img_buffer instanceof ArrayBuffer) ) {
        throw new Error('The image must be an instance of buffer');
    }

    try {

      const imgUrl = await putFile(`${IMG_PATH}${payload.id}.png`, payload.img_buffer, { encrypt: false, contentType: 'image/png' });
      const artwork = this.parseArtworkData(payload, imgUrl);

      await putFile(`${ART_DATA_PATH}${payload.id}.json`, artwork, { encrypt: false, contentType: 'application/json' });

      return await this.upsertIndex(payload.id);
    }

    catch(err) { console.log(err); }
  }

  async upsertIndex(id) {
    const artwork = `artwork_${id}`;

    try {

      let index = await getFile(INDEX_PATH, {decrypt: false});
      index = JSON.parse(index);

      //find and update
      const match = indexOf(index.artworks, artwork);

      if(match >= 0) {
          let i = indexOf(index.artworks, artwork);
          index.artworks.splice(i, 1, artwork);
      } else {
          index.artworks.push(artwork);
      }

      return await putFile(INDEX_PATH, JSON.stringify(index), { encrypt: false });
    }

    catch (err) { console.log(err); }
  }

}

export default new FormStore();
