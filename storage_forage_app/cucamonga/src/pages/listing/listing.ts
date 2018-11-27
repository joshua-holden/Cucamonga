/**
* Listing Page
* 
* Page that presents the details about a listing.
*
* @author  Joshua Holden
* @version 1.0
* @since   2018-11-28
*/

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularfireDbProvider } from '../../providers/angularfiredb-service/angularfiredb-service';
import { Observable } from "rxjs";
import * as moment from 'moment';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { Reservation, getPriceString } from '../../classes';
import { AccountPage } from '../account/account';

@IonicPage()
@Component({
  selector: 'page-listing',
  templateUrl: 'listing.html',
})

export class ListingPage {
@ViewChild(Slides) slides: Slides;
  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  public posts = [];
  private postAccount: Observable<{}>;
  private reservations = [];

  /**
    * @constructor
    */
  constructor(public navCtrl: NavController,
      private modalCtrl: ModalController,
      private alertCtrl: AlertController,
      public navParams: NavParams, private afdb: AngularfireDbProvider, public afa: AngularFireAuth) {
  }

  getPrice = getPriceString;

  /**
  * Get data about listing from previous page.
  * 
  * @param Nothing
  * @return Nothing
  */
  getData(){
    let posterID = this.navParams.get('userID');
    this.postAccount = this.afdb.getAccount(posterID);
    let title = this.navParams.get('title');
    let address = this.navParams.get('address');
    let price = this.navParams.get('price');
    let description = this.navParams.get('description');
    let amenities = this.navParams.get('amenities');
    let images = this.navParams.get('images');
    var post = new function(){
        this.title = title;
        this.address = address;
        this.price = price;
        this.description = description;
        this.amenities = amenities;
        this.images = images;
      }
    this.posts.push(post);
  }

  ionViewDidLoad() {
    this.getData();
  }

  /**
   * Get data about listing from previous page.
   * 
   * @param start The start date of the reservation
   * @param end The end date of the reservation
   * @param days The number of days
   * @return Nothing
   */
  createReservation(start, end, days) {
    var p = Number((this.posts[0].price.dailyAmount));
    days = days*-1;
    var tp = p*days;
    let res : Reservation = {
      postID: this.navParams.get('postID'),
      userID: this.afa.auth.currentUser.uid,
      reservationID: this.afa.auth.currentUser.uid,
      startDate: start,
      endDate: end,
      totalPrice: tp
    }
    this.presentConfirm(start, days, tp, res);
  }

  /**
   * Adds the reservation to the calendar with days
   * reserved shaded in.
   *
   * @param Nothing
   * @return Nothing
   */
  addEvent() {
    let modal = this.modalCtrl.create('EventModalPage', {selectedDay: this.selectedDay});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        let eventData = data;
        
        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);
        let start = eventData.startTime.toString();
        let end = eventData.endTime.toString();
        
        var mstart = moment(start);
        var mend = moment(end);
        var days = mstart.diff(mend, 'days');

        var mstarts = moment(start).format('MM/DD/YYYY');
        var mends = moment(end).format('MM/DD/YYYY');
        if(eventData.allMonth){
          mends = moment(start).add(30, 'days').format('MM/DD/YYYY');
        }
        this.createReservation(mstarts, mends, days);
        let events = this.eventSource;
        events.push(eventData);
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
        });
      }
    });
  }
 
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
 
 /**
   * 
   *
   * @param event
   * @return Nothing
   */
  onEventSelected(event) {
    let start = moment(event.startTime).format('L');
    let end = moment(event.endTime).format('L');
  
    let alert = this.alertCtrl.create({
      title: '' + event.title,
      subTitle: 'From: ' + start + '<br>To: ' + end,
      buttons: ['OK']
    })
    alert.present();
  }
 
 /**
   * Present confirmation for user to cancel or confirm
   * reservation.
   *
   * @param start The start date for the reservation
   * @param days The number of days for the reservation
   * @param price The total price of the reservation
   * @param res The reservation object
   * @return Nothing
   */
  presentConfirm(start, days, price, res) {
  let mes = "Do you want to reserve this listing for " + days + " days " + " starting on " + start + " for $" + price + "?";
  let alert = this.alertCtrl.create({
    title: 'Confirm purchase',
    message: mes,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Reserve',
        handler: () => {
          let key = this.afdb.addReservation(res);
          res.reservationID = key;
          this.afdb.updateReservation(res);
          this.navCtrl.setRoot(AccountPage);
        }
      }
    ]
  });
  alert.present();
}

  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }
};


