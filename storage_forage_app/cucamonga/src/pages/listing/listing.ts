﻿import { Component } from '@angular/core';
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
import { Reservation } from '../../classes';

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
  private account: Observable<{}>;
  private reservations = [];

  constructor(public navCtrl: NavController,
      private modalCtrl: ModalController,
      private alertCtrl: AlertController,
      public navParams: NavParams, private afdb: AngularfireDbProvider, public afa: AngularFireAuth
      ) { }

  getData(){
    let posterID = this.navParams.get('posterID');
    //this.account = this.afa.auth.currentUser;
    let title = this.navParams.get('title');
    let price = this.navParams.get('price');
    let description = this.navParams.get('description');
    let amenities = this.navParams.get('amenities');
    let images = this.navParams.get('images');
    var post = new function(){
        this.title = title;
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

  createReservation(data) {
    let account = this.afa.auth.currentUser;
    let start = data.eventData.startTime.toString();

    let res : Reservation = {
      postID: this.navParams.get('posterID'),
      userID: account.uid,
      reservationID: account.uid,
      startDate: data.eventData.startTime.toString(),
      endDate: data.eventData.endTime.toString(),
      totalPrice: 0
    }
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
        this.createReservation(eventData);
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
    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');
    


    let alert = this.alertCtrl.create({
      title: '' + event.title,
      subTitle: 'From: ' + start + '<br>To: ' + end,
      buttons: ['OK']
    })
    alert.present();
  }
 
  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }
};


