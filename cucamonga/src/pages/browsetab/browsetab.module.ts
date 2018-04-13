import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BrowsetabPage } from './browsetab';

@NgModule({
  declarations: [
    BrowsetabPage,
  ],
  imports: [
    IonicPageModule.forChild(BrowsetabPage),
  ],
})
export class BrowsetabPageModule {}
