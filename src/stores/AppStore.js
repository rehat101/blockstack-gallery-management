import { observable, action } from 'mobx';
import { loadUserData } from 'blockstack';

class AppStore {
  @observable userName = '';

  @action setUserInfo (data) {
      this.userName = data;
  }

  @action async loadUserInfo() {

    try {
      let data = loadUserData().profile;

      this.setUserInfo(data.name);
    }

    catch(err) { console.log(err); }
  }
}

export default new AppStore();
