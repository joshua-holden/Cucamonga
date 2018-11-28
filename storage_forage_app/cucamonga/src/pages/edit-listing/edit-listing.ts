/**
* Edit Listing Page
* 
* Page to edit a user's listing
*
* @author  Joshua Holden
* @version 1.0
* @since   2018-11-28
*/

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularfireDbProvider } from '../../providers/angularfiredb-service/angularfiredb-service';
import { Observable } from "rxjs";
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { Posting } from '../../classes';
import { AccountPage } from '../account/account';
import { AlertController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';

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

  /**
    * @constructor
    */
  constructor(public navCtrl: NavController,
      public navParams: NavParams,
      private afdb: AngularfireDbProvider,
      public formbuilder: FormBuilder,
      private toastCtrl: ToastController,
      public afa: AngularFireAuth,
      public imagePicker: ImagePicker,
      public alertCtrl: AlertController,
      private camera: Camera) {
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

/**
  * Get photos from camera roll/gallery using Ionic 
  * Camera compnent
  * https://ionicframework.com/docs/native/camera/
  * @param Nothing
  * @return Nothing
  */
getPictures() {
        const options: CameraOptions = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            encodingType: this.camera.EncodingType.JPEG,
            saveToPhotoAlbum: false,
            allowEdit: false,
            targetWidth: 300,
            targetHeight: 300,
        };
        this.camera.getPicture(options).then((imageData) => {          
              this.images.push("data:image/jpeg;base64," + imageData);    
        }).catch(err => {
            this.presentAlert();
            console.log(err);
        });
    }

/**
  * Present alert on browser version indicating that  
  * uploading photos is only possible on mobile version.
  * https://ionicframework.com/docs/native/camera/
  * @param Nothing
  * @return Nothing
  */
presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'Sorry',
    subTitle: 'Only works on mobile for now',
    buttons: ['Dismiss']
  });
  alert.present();
}

/**
  * Get data about listing from previous page.
  * 
  * @param Nothing
  * @return Nothing
  */
  getData(){
    let postID = this.navParams.get('postID');
    let title = this.navParams.get('title');
    let address = this.navParams.get('address');
    let size = this.navParams.get('size');
    let price = this.navParams.get('price');
    let description = this.navParams.get('description');
    let images = this.navParams.get('images');
    let amenities = this.navParams.get('amenities');
    var post = new function(){
    	this.postID = postID;
        this.title = title;
        this.price = price;
        this.address = address;
        this.size = size;
        this.description = description;
        this.images = images;
        this.amenities = amenities;
      }
    this.images = images;
    this.posts.push(post);
  }

  /**
  * Update and submit the changes to the database.
  * 
  * @param Nothing
  * @return Nothing
  */
  updatePost(){
  let account = this.afa.auth.currentUser;
  let posta = this.posts[0];
  let post: Posting = {
  	postID: posta.postID,
    userID: account.uid,
    title: this.posting.value.title,
    address: this.posting.value.address,
    price: this.posting.value.price,
    size: this.posting.value.size,
    amenities: this.posting.value.amenities,
    images: this.images,
    description: this.posting.value.description
  };
  this.afdb.updatePost(post);
  this.presentUpdateToast();
  this.navCtrl.setRoot(AccountPage);
}

/**
  * Delete the selected listing
  * 
  * @param Nothing
  * @return Nothing
  */
deletePost(){
  let posta = this.posts[0];
  this.afdb.deletePost(posta);
  this.presentDeleteToast();
  this.navCtrl.setRoot(AccountPage);
}

/**
  * Present a message indicating to the user that the
  * changes they made were submitted to the database.
  * @param Nothing
  * @return Nothing
  */
presentUpdateToast() {
  let toast = this.toastCtrl.create({
    message: 'Post Updated',
    duration: 3000,
    position: 'top'
  });
  toast.present();
  }

/**
  * Present a message indicating to the user that the
  * listing was deleted.
  * @param Nothing
  * @return Nothing
  */
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
