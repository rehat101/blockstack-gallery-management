import { observable, action } from 'mobx';
import { loadUserData } from 'blockstack';

class AppStore {
  @observable userName = '';

  @action.bound async loadUserInfo() {

    try {

      let data = loadUserData().profile;
      this.userName = data.name;

    }

    catch(err) { console.log(err); }
  }
}

export default new AppStore();
