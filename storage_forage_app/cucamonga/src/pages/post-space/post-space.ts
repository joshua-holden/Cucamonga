﻿import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../popover/popover';
import { ImagePicker } from '@ionic-native/image-picker';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularfireDbProvider } from '../../providers/angularfiredb-service/angularfiredb-service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Posting } from '../../classes';
import { Account } from '../../classes';
import { Observable } from "rxjs";
import { ToastController } from 'ionic-angular';
import { AccountPage } from '../account/account';
import { Base64 } from '@ionic-native/base64';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-post-space',
  templateUrl: 'post-space.html',
})

export class PostSpacePage {


private posting : FormGroup;
public images = [];
public userID: any;
private account: Observable<{}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public imagePicker: ImagePicker, public formbuilder: FormBuilder, public afa: AngularFireAuth, public popoverCtrl: PopoverController, public afdb: AngularfireDbProvider, private toastCtrl: ToastController, private base64: Base64, private alertCtrl: AlertController) {
  this.posting = this.formbuilder.group({
      title: ['', Validators.required], 
      address: ['', Validators.required],
      price: ['', Validators.required],
      size: [''],
      amenities: [''],
      description: ['']
    });
    
}

presentToast() {
  let toast = this.toastCtrl.create({
    message: 'Post Created',
    duration: 3000,
    position: 'top'
  });
  toast.present();
  }

/*
getPictures(){
this.imagePicker.getPictures({
    }).then( results =>{
      console.log(results);
      for(let i=0; i < results.length;i++){
        this.images.push(results[i]);
      };
    });
}*/

getPictures() {
  let options = {
    maximumImagesCount: 5,
    outputType: 1
  };
  this.images = [];
  this.imagePicker.getPictures(options).then((results) => {
    for (var i = 0; i < results.length; i++) {
        this.images.push("data:image/jpeg;base64," + results[i]);
    }
  }, (err) => {this.presentAlert(); });
}

presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'Sorry',
    subTitle: 'Only works on mobile for now',
    buttons: ['Dismiss']
  });
  alert.present();
}

createPost(){
  let account = this.afa.auth.currentUser;
  let post: Posting = {
    postID: account.uid,
    userID: account.uid,
    title: this.posting.value.title,
    address: this.posting.value.address,
    price: this.posting.value.price,
    size: this.posting.value.size,
    amenities: this.posting.value.amenities,
    images: this.images,
    description: this.posting.value.description
  };
  let key = this.afdb.addPost(post);
  
  console.log(post.postID);
  post.postID = key;
  this.afdb.updatePost(post);
  console.log(post.postID);
  this.presentToast();
  this.navCtrl.setRoot(AccountPage);
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad PostSpacePage');
  }

presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
        ev: myEvent
    });
}


}
