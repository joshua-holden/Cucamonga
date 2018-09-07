import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';

/**
 * Generated class for the PostSpacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-post-space',
  templateUrl: 'post-space.html',
})
export class PostSpacePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public imagePicker: ImagePicker) {
  }

/*
this.imagePicker.getPictures(options).then((results) => {
  for (var i = 0; i < results.length; i++) {
      console.log('Image URI: ' + results[i]);
  }
}, (err) => { });
*/

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostSpacePage');
  }

}
