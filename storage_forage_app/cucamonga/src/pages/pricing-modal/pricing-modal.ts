import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { Pricing } from '../../classes';
import { ViewChild } from "@angular/core";

@IonicPage()
@Component({
  selector: 'page-pricing-modal',
  templateUrl: 'pricing-modal.html',
})
export class PricingModal {

    private amount: number;
    private dom: string = 'day';
    private isMonthOnly: boolean = false;

    constructor(public viewCtrl: ViewController) {

    }

    setDayOrMonth(dom: string) {
        this.dom = dom;
    }

    displayDayPrice() {
        return this.dom === 'day' ? Number(this.amount).toFixed(2) : Number(this.amount / 30).toFixed(2);
    }

    displayMonthPrice() {
        return this.dom === 'month' ? Number(this.amount).toFixed(2) : Number(this.amount * 30).toFixed(2);
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
