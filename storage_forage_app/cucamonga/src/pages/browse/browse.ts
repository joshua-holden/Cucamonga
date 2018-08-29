import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListingPage } from '../listing/listing'

/**
 * Generated class for the BrowsePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-browse',
  templateUrl: 'browse.html',
})
export class BrowsePage{ 

  public items = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

 /* https://github.com/ionic-team/ionic/tree/v3/demos/src/searchbar */



  ngOnInit() {
    this.setItems();
  }

   setItems() { 
	   for (var i = 1; i <= 20; i++) {
      var item = new function(){
        this.id = "id" + i;
        this.title = "Listing " + i;
        this.description = "This is a description for listing " + i;
        this.img = "assets/imgs/" + i + ".jpg";
      }
    	this.items.push(item);
    }
   }

   filterItems(ev: any) {
    let val = ev.target.value;

    if(val) {
      this.items = this.items.filter(function(item) {
        return item.title.toLowerCase().includes(val.toLowerCase());
      });
    }else{
      this.items = [];
      return this.setItems();
    }

  }

  ionViewDidLoad() {
  	console.log('ionViewDidLoad BrowsePage');
  }

  openListing(element) {
    var a = element.title;
    var b = element.description;
    var c = element.img;
    let data = {
      title: a,
      description: b,
      img: c
    };
    console.log(data);
  	this.navCtrl.push(ListingPage, data);
  }

}
