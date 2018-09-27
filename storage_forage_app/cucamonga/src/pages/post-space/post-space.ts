import { Component } from '@angular/core';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public imagePicker: ImagePicker, public formbuilder: FormBuilder, public afa: AngularFireAuth, public popoverCtrl: PopoverController, public afdb: AngularfireDbProvider, private toastCtrl: ToastController) {
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

getPictures(){
this.imagePicker.getPictures({
    }).then( results =>{
      console.log(results);
      for(let i=0; i < results.length;i++){
        this.images.push(results[i]);
      };
    });
}


createPost(){
  let account = this.afa.auth.currentUser;
  let post: Posting = {
    userID: account.uid,
    title: this.posting.value.title,
    address: this.posting.value.address,
    price: this.posting.value.price,
    size: this.posting.value.size,
    amenities: this.posting.value.amenities,
    description: this.posting.value.description
  };
  this.afdb.addPost(post);
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
