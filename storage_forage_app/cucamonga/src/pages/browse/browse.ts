import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../popover/popover';
import { ListingPage } from '../listing/listing';
import { AngularfireDbProvider } from '../../providers/angularfiredb-service/angularfiredb-service';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Observable } from "rxjs";

@IonicPage()
@Component({
  selector: 'page-browse',
  templateUrl: 'browse.html',
})
export class BrowsePage{ 
  public items = [];
  public posts: Observable<{}[]>;

  constructor(public navCtrl: NavController,
      public popoverCtrl: PopoverController,
      public navParams: NavParams, public dbprovider: AngularfireDbProvider, public afdb: AngularFireDatabase) {
  }

  ngOnInit() {
    this.setItems();
    this.posts = this.afdb.list(`/posts`).valueChanges();
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

  openListing(element) {
    var a = element.title;
    var b = element.description;
    var c = element.price;
    let data = {
      title: a,
      description: b,
      price: c
    };
    console.log(data);
  	this.navCtrl.push(ListingPage, data);
  }

  presentPopover(myEvent) {
      let popover = this.popoverCtrl.create(PopoverPage);
      popover.present({
          ev: myEvent
      });
  }

}
