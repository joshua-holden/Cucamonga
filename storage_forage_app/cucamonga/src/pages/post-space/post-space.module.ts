import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostSpacePage } from './post-space';

@NgModule({
  declarations: [
    PostSpacePage,
  ],
  imports: [
    IonicPageModule.forChild(PostSpacePage),
  ],
})
export class PostSpacePageModule {}
