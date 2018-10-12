import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireObject } from '@angular/fire/database';
import { AngularFireList } from '@angular/fire/database';
import { Account } from '../../classes';
import { AngularfireDbProvider } from '../../providers/angularfiredb-service/angularfiredb-service';
import { Observable } from "rxjs";
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { Posting } from '../../classes';
import { AccountPage } from '../account/account';
import { AlertController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';


/**
 * Generated class for the EditListingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-listing',
  templateUrl: 'edit-listing.html',
})
export class EditListingPage {

  private posting : FormGroup;
  public posts = [];
  private account: Observable<{}>;
  public images = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private afdb: AngularfireDbProvider, public formbuilder: FormBuilder, private toastCtrl: ToastController, public afa: AngularFireAuth, public imagePicker: ImagePicker, public alertCtrl: AlertController) {
  this.posting = this.formbuilder.group({
      title: ['', Validators.required], 
      address: ['', Validators.required],
      price: ['', Validators.required],
      size: ['', Validators.required],
      amenities: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
      this.getData();
  }

getPictures() {
  let options = {
    maximumImagesCount: 5,
    outputType: 1,
  };
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

  getData(){
    let posterID = this.navParams.get('posterID');
    this.account = this.afdb.getAccount(posterID);
    let title = this.navParams.get('title');
    let address = this.navParams.get('address');
    let size = this.navParams.get('size');
    let price = this.navParams.get('price');
    let description = this.navParams.get('description');
    let images = [];
    let amenities = this.navParams.get('amenities');
    var post = new function(){
        this.title = title;
        this.price = price;
        this.address = address;
        this.size = size;
        this.description = description;
        this.amenities = amenities;
      }
    this.posts.push(post);
  }

  updatePost(){
  let account = this.afa.auth.currentUser;
  let post: Posting = {
    userID: account.uid,
    title: this.posting.value.title,
    address: this.posting.value.address,
    price: this.posting.value.price,
    size: this.posting.value.size,
    amenities: this.posting.value.amenities,
    images: this.posting.value.amenities,
    description: this.posting.value.description
  };
  this.afdb.updatePost(post);
  this.presentUpdateToast();
  this.navCtrl.setRoot(AccountPage);
}

deletePost(){
  let post = this.posting;
  this.afdb.deletePost(post);
  this.presentDeleteToast();
  this.navCtrl.setRoot(AccountPage);
}

presentUpdateToast() {
  let toast = this.toastCtrl.create({
    message: 'Post Updated',
    duration: 3000,
    position: 'top'
  });
  toast.present();
  }

  presentDeleteToast() {
  let toast = this.toastCtrl.create({
    message: 'Post Deleted',
    duration: 3000,
    position: 'top'
  });
  toast.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditListingPage');
  }

}
