import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImagePicker } from '@ionic-native/image-picker';

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
  public mobile;
  public email;
  public docCount;
  public documents: document[];
  public expoDoc: document;

  public countries;

  exhForm: FormGroup;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, 
    public formBuilder: FormBuilder, private imagePicker: ImagePicker) {
    this.initializeForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormPage');
    this.storage.ready().then( () => {
      this.storage.get('expocount').then( (data) => {
        this.docCount = data;
      });
    });
  }

  initializeForm(){
    this.exhForm = this.formBuilder.group({
      customerNameCntrl: ['', Validators.required],
      jobTitleCntrl: ['', Validators.required],
      companyNameCntrl: ['', Validators.required],
      countryCntrl: ['', Validators.required],
      addressCntrl: [''],
      telephoneCntrl: [''],
      mobileCntrl: ['', Validators.required],
      emailCntrl: ['', Validators.required],
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
      this.expoDoc.mobile = this.mobile; 
      this.expoDoc.email = this.email; 
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
    this.mobile = '';
    this.email = '';
  }

  refreshMaster(){
    this.storage.ready().then(() => {
      this.storage.get('expoipsCountry').then((data) => {
        this.countries = data;
      });
    });
  }

  addFiles(){
    
    var options = {
      maximumImagesCount: 10,
      width: 800,
      height: 800,
      quality: 80
     };
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
      }
    });
  }

}
