import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

interface document {
  customerName: string;
  jobTitle: string;
  companyName: string;
  country: string;
  address: string;
  telephone: string;
  mobile: string;
  email: string;

}


@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage {

  public customerName;
  public jobTitle;
  public companyName;
  public country;
  public address;
  public telephone;
  public docCount;
  public documents: document[];
  public expoDoc: document;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormPage');
    this.storage.ready().then( () => {
      this.storage.get('expocount').then( (data) => {
        this.docCount = data;
      });
    });
  }

  doSave(){
    this.storage.ready().then( () => {
      this.storage.set('expocount',this.docCount);
      this.expoDoc.customerName = this.customerName;
      this.expoDoc.jobTitle = this.jobTitle;
      this.expoDoc.companyName = this.companyName;
      this.expoDoc.country = this.country;
      this.expoDoc.address = this.address;
      this.expoDoc.telephone = this.telephone;      
      this.documents.push(this.expoDoc);
      this.storage.set('expoDocs',this.documents);
    });
  }

  reset(){
    this.customerName = '';
    this.jobTitle = '';
    this.companyName = '';
    this.country = '';
    this.address = '';
    this.telephone = '';
  }

}
