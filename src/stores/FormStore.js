import { action, observable } from 'mobx';
import { putFile, getFile } from 'blockstack';

const IMG_PATH = 'artworks/images/artwork_';
const ART_DATA_PATH = 'artworks/artwork_';
const INDEX = 'index.json';

class FormStore {

  @observable isOpen = false;

  @action setIsOpen(value) {
    this.isOpen = value;
  }

  AddIndexFile(id) {

    let data = {
        artworks: [`artwork_${id}`]
    };

    data = JSON.stringify(data);

    return data;
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

      const imgUrl = await putFile(`${IMG_PATH}${payload.id}.png`, payload.img_buffer, {
          encrypt: false
      });

      const JSONdata = this.parseArtworkData(payload, imgUrl);
      await putFile(`${ART_DATA_PATH}${payload.id}.json`, JSONdata, {
          encrypt: false
      });
      const index = await this.upsertToIndex(payload.id);

      return index;
    }

    catch(err) { console.log(err); }
  }

  async upsertToIndex(id) {

    try {

      const response = await getFile(INDEX, {decrypt: false});

      //index doesn't exist
      if(!response) {
          return await putFile(INDEX, this.AddIndexFile(id), {
              encrypt: false
          });
      }

      //index exist
      let data = JSON.parse(response);
      data.artworks.push(`artwork_${id}`);
      data = JSON.stringify(data);

      const response2 = await putFile(INDEX, data, {
          encrypt: false
      });

      return response2;
    }

    catch (err) { console.log(err); }
  }

}

export default new FormStore();
