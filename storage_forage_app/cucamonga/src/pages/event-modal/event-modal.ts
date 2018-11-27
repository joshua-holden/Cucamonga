import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';
 
@IonicPage()
@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})
export class EventModalPage {
 
  event = { startTime: new Date().toISOString(), endTime: new Date().toISOString(), allMonth: false };
  minDate = new Date().toISOString();

  /**
   * This class is the modal that retrieves the requested dates from the user.
   * @constructor
   */
  constructor(public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController) {
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;
  }

    /**
     * close the modal.
     */
  cancel() {
    this.viewCtrl.dismiss();
  }

    /**
     * close the modal and return the dates.
     */
  save() {
    this.viewCtrl.dismiss(this.event);
  }
}
