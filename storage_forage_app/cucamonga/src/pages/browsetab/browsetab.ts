/**
* Browse Tab View
* 
* Allows navigation of app for logged in users including
* browse, post, messages, account.
*
* @author  Joshua Holden
* @version 1.0
* @since   2018-11-28
*/

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BrowsePage } from '../browse/browse';
import { PostSpacePage } from '../post-space/post-space';
import { MessagesPage } from '../messages/messages';
import { AccountPage } from '../account/account';

@IonicPage()
@Component({
  selector: 'page-browsetab',
  templateUrl: 'browsetab.html',
  })

/**
 * 
 * Allows navigation of app for logged in users including
 * browse, post, messages, account.
 */  
export class BrowsetabPage {

	tab1Root = BrowsePage;
	tab2Root = PostSpacePage;
	tab3Root = MessagesPage;
	tab4Root = AccountPage;

  /**
    * @constructor
    */
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
