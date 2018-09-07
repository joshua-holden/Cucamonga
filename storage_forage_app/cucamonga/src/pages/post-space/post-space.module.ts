import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostSpacePage } from './post-space';
import { ImagePicker } from '@ionic-native/image-picker';

@NgModule({
  declarations: [
    PostSpacePage,
  ],
  imports: [
    IonicPageModule.forChild(PostSpacePage),
  ],
})
export class PostSpacePageModule {}
