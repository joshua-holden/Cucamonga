/**
* Browse Page
* 
* Functions for page that allows users to view and browse 
* all listings posted by users.
*
* @author  Joshua Holden
* @version 1.0
* @since   2018-11-28
*/

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../popover/popover';
import { ListingPage } from '../listing/listing';
import { AngularfireDbProvider } from '../../providers/angularfiredb-service/angularfiredb-service';
import { Observable } from "rxjs";
import { getPriceString } from '../../classes';

@IonicPage()
@Component({
  selector: 'page-browse',
  templateUrl: 'browse.html',
})
export class BrowsePage{ 

  public items = [];
  public posts: Observable<{}[]>;
  public amenities: Observable<{}[]>;

  /**
    * @constructor
    */
  constructor(public navCtrl: NavController,
      public afdb: AngularfireDbProvider,
      public popoverCtrl: PopoverController,
      public navParams: NavParams) {
  }

  getPrice = getPriceString;

  ngOnInit() {
      this.setItems();
      this.posts = this.afdb.getAllPosts().valueChanges();
  }

   setItems() {     
     for (var i = 1; i <= 20; i++) {
        var item = new function(){
          this.id = "id" + i;
          this.title = "This is listing title " + i;
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

  /**
   * Open listing clicked on by user.
   * 
   * @param post  Post locked on user
   * @return Nothing
   */
  openListing(post) {
  	this.navCtrl.push(ListingPage, post);
  }

  presentPopover(myEvent) {
      let popover = this.popoverCtrl.create(PopoverPage);
      popover.present({
          ev: myEvent
      });
  }

}
