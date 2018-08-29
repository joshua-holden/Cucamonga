import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BrowsePage } from '../browse/browse';
import { PostSpacePage } from '../post-space/post-space';
import { MySpacesPage } from '../my-spaces/my-spaces';
import { MessagesPage } from '../messages/messages';
import { AccountPage } from '../account/account';

/**
 * Generated class for the BrowsetabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-browsetab',
  templateUrl: 'browsetab.html',
  })
export class BrowsetabPage {

	tab1Root = BrowsePage;
	tab2Root = PostSpacePage;
	tab3Root = MySpacesPage;
	tab4Root = MessagesPage;
	tab5Root = AccountPage;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BrowsetabPage');
  }

}
