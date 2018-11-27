import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pricing-modal',
  templateUrl: 'pricing-modal.html',
})
export class PricingModal {

    private amount: number;
    private dom: string = 'day';  //dom stands for "day or month"
    private isMonthOnly: boolean = false;

    /**
     * This is the modal that appears when the user enters a price while creating a posting.
     * @constructor
     */
    constructor(public viewCtrl: ViewController) { }

    setDayOrMonth(dom: string) {
        this.dom = dom;
    }

    /**
     * displays the prices when the user enters in a daily price.
     */
    displayDayPrice() {
        return this.dom === 'day' ? Number(this.amount).toFixed(2) : Number(this.amount / 30).toFixed(2);
    }

    /**
     * displays the prices when the user enter in a monthly price.
     */
    displayMonthPrice() {
        return this.dom === 'month' ? Number(this.amount).toFixed(2) : Number(this.amount * 30).toFixed(2);
    }

    /**
     * returns a pricing object when dismissed.
     */
    dismiss() {
        this.viewCtrl.dismiss({
            dailyAmount: this.displayDayPrice(),
            monthlyAmount: this.displayMonthPrice(),
            isMonthOnly: this.isMonthOnly
        });
    }
}
