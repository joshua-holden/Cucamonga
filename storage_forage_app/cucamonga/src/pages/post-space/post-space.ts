/**
* Post space page
* 
* Create a listing for other users to view and reserve
*
* @author  Joshua Holden
* @version 1.0
* @since   2018-11-28
*/

import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../popover/popover';
import { ImagePicker } from '@ionic-native/image-picker';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularfireDbProvider } from '../../providers/angularfiredb-service/angularfiredb-service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Posting } from '../../classes';
import { Observable } from "rxjs";
import { ToastController } from 'ionic-angular';
import { AccountPage } from '../account/account';
import { AlertController } from 'ionic-angular';
import { Pricing, getPriceString } from '../../classes';
import { Camera, CameraOptions } from '@ionic-native/camera';

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
  private pricing: Pricing;
  private priceString: string = this.pricing ? getPriceString(this.pricing) : "";

  /**
    * @constructor
    */
  constructor(public navCtrl: NavController,
      public navParams: NavParams,
      public imagePicker: ImagePicker,
      public formbuilder: FormBuilder,
      public afa: AngularFireAuth,
      public afdb: AngularfireDbProvider,
      public modalCtrl: ModalController,
      public popoverCtrl: PopoverController,
      private toastCtrl: ToastController,
      private alertCtrl: AlertController, private camera: Camera) {
        this.posting = this.formbuilder.group({
            title: ['', Validators.required], 
            address: ['', Validators.required],
            price: ['', Validators.required],
            size: [''],
            amenities: [''],
            description: ['']
          });   
  }

  /**
   * Present message to user that listing was created
   *
   * @param Nothing
   * @return Nothing
   */
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Post Created',
      duration: 3000,
      position: 'top'
    });
    toast.present();
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
  *
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
  * Creates a new listing with user input and adds it to database
  *
  * @param Nothing
  * @return Nothing
  */
  createPost(){
    let account = this.afa.auth.currentUser;
    let post: Posting = {
      postID: account.uid,
      userID: account.uid,
      title: this.posting.value.title,
      address: this.posting.value.address,
      price: this.pricing,
      size: this.posting.value.size,
      amenities: this.posting.value.amenities,
      images: this.images,
      description: this.posting.value.description
    };
    let key = this.afdb.addPost(post);
    post.postID = key;
    this.afdb.updatePost(post);
    this.presentToast();
    this.navCtrl.setRoot(AccountPage);
  }

  presentPopover(myEvent) {
      let popover = this.popoverCtrl.create(PopoverPage);
      popover.present({
          ev: myEvent
      });
  }

  priceModal() {
      let priceModal = this.modalCtrl.create('PricingModal');
      priceModal.onDidDismiss(price => {
          if (price) {
              this.pricing = price;
              this.priceString = getPriceString(price);
          }
      });
      priceModal.present();
  }
}
