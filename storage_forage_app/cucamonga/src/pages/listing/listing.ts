import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController , ModalController } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-listing',
  templateUrl: 'listing.html',
})

export class ListingPage {
  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  public list = [];

  constructor(public navCtrl: NavController,private modalCtrl: ModalController, private alertCtrl: AlertController, public navParams: NavParams) {  }

  getData(){
    let title = this.navParams.get('title');
    let img = this.navParams.get('img');
    var item = new function(){
        this.title = title;
        this.img = img;
      }
    this.list.push(item);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListingPage');
    console.log(this.navParams.get('title'));
    console.log(this.navParams.get('description'));
    console.log(this.navParams.get('img'));
    this.getData();
  }

  addEvent() {
    let modal = this.modalCtrl.create('EventModalPage', {selectedDay: this.selectedDay});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        let eventData = data;
 
        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);
 
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


