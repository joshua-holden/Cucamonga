import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListingPage } from './listing';
import { NgCalendarModule } from 'ionic2-calendar';

@NgModule({
  declarations: [
    ListingPage,
  ],
  imports: [
      IonicPageModule.forChild(ListingPage),
      NgCalendarModule,
  ],
})
export class ListingPageModule {}
