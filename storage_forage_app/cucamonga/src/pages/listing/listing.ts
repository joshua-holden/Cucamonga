import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireObject } from '@angular/fire/database';
import { AngularFireList } from '@angular/fire/database';
import { Account } from '../../classes';
import { AngularfireDbProvider } from '../../providers/angularfiredb-service/angularfiredb-service';
import { Observable } from "rxjs";
import * as moment from 'moment';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { Reservation, getPriceString } from '../../classes';

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

  constructor(public navCtrl: NavController,
      private modalCtrl: ModalController,
      private alertCtrl: AlertController,
      public navParams: NavParams, private afdb: AngularfireDbProvider, public afa: AngularFireAuth) {
  }

  getPrice = getPriceString;

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

  createReservation(start, end, days) {
    //this.account = this.afa.auth.currentUser;
    //let start = data.eventData.startTime.toString();
    //let end = data.eventData.endTime.toString();
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
    this.presentConfirm(start, days, tp);
    let key = this.afdb.addReservation(res);
    res.reservationID = key;
    this.afdb.updateReservation(res);
    
  }

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
        //var mstart = moment(start).format('MM/DD/YYYY');
        //var mend = moment(end).format('MM/DD/YYYY');
        var mstart = moment(start);
        var mend = moment(end);
        var days = mstart.diff(mend, 'days');
        var mstarts = moment(start).format('MM/DD/YYYY');
        var mends = moment(end).format('MM/DD/YYYY');

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
 
 presentConfirm(start, days, price) {
  let mes = "do you want to reserve this listing for " + days + " days " + " starting on " + start + " for $" + price + "?";
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
        text: 'Buy',
        handler: () => {
          console.log('Buy clicked');
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


