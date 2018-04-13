import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

	for (var i = 1; i <= 100; i++) { 
		var temp = "test"+i;
    	this.items.push(temp);
    }
   }

   filterItems(ev: any) {
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      this.items = this.items.filter(function(item) {
        return item.toLowerCase().includes(val.toLowerCase());
      });
    }

  }

  ionViewDidLoad() {
  	console.log('ionViewDidLoad BrowsePage');
  }
}
