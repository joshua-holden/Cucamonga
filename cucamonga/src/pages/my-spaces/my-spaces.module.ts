import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MySpacesPage } from './my-spaces';

@NgModule({
  declarations: [
    MySpacesPage,
  ],
  imports: [
    IonicPageModule.forChild(MySpacesPage),
  ],
})
export class MySpacesPageModule {}
