import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../popover/popover';
import { ImagePicker } from '@ionic-native/image-picker';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularfireDbProvider } from '../../providers/angularfiredb-service/angularfiredb-service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Posting } from '../../classes';

@IonicPage()
@Component({
  selector: 'page-post-space',
  templateUrl: 'post-space.html',
})
export class PostSpacePage {

<<<<<<< HEAD
private posting : FormGroup;
public images = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public imagePicker: ImagePicker, public formbuilder: FormBuilder, public dbProvider: AngularfireDbProvider, public fireAuth: AngularFireAuth) {
  this.posting = this.formbuilder.group({
      title: ['', Validators.required], 
      address: ['', Validators.required],
      price: ['', Validators.required],
      size: [''],
      amenities: [''],
      description: ['']
    })
=======
    constructor(public navCtrl: NavController,
        public popoverCtrl: PopoverController,
        public navParams: NavParams,
        public imagePicker: ImagePicker) {
>>>>>>> 2de33a595b5fb296cc33b42369b828e61424490b
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

<<<<<<< HEAD
createPost(){
  let post: Posting = {
    title: this.posting.value.title,
    address: this.posting.value.address,
    price: this.posting.value.price,
    size: this.posting.value.size,
    amenities: this.posting.value.amenities,
    description: this.posting.value.description
  };
  this.dbProvider.addPost(post);

}


  ionViewDidLoad() {
    console.log('ionViewDidLoad PostSpacePage');
  }
=======
presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
        ev: myEvent
    });
}
>>>>>>> 2de33a595b5fb296cc33b42369b828e61424490b

}
