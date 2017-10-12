import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../providers/api/api';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public api: ApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  pullMaster(){
    this.storage.ready().then(() => {
      this.api.getCountry().subscribe((data) => {
        this.storage.set('expoipsCountry',data);
      });
    });
    
  }

}
