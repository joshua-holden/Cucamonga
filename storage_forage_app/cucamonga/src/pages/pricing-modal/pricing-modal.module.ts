import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PricingModal } from './pricing-modal';

@NgModule({
  declarations: [
    PricingModal,
  ],
  imports: [
    IonicPageModule.forChild(PricingModal),
  ],
})
export class PricingModalPageModule {}
