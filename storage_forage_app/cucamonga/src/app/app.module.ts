import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ImagePicker } from '@ionic-native/image-picker';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { HTTP } from '@ionic-native/http';
import { Base64 } from '@ionic-native/base64';

import { MyApp } from './app.component';
import { SignupPageModule } from '../pages/signup/signup.module';
import { LoginPageModule } from '../pages/login/login.module';
import { BrowsetabPageModule } from '../pages/browsetab/browsetab.module';
import { BrowsePageModule } from '../pages/browse/browse.module';
import { PostSpacePageModule } from '../pages/post-space/post-space.module';
import { MessagesPageModule } from '../pages/messages/messages.module';
import { AccountPageModule } from '../pages/account/account.module';
import { ListingPageModule } from '../pages/listing/listing.module';
import { PopoverPageModule } from '../pages/popover/popover.module';
import { AccountEditPageModule } from '../pages/account-edit/account-edit.module';
import { EditListingPageModule } from '../pages/edit-listing/edit-listing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AngularfireDbProvider } from '../providers/angularfiredb-service/angularfiredb-service';

const firebaseAuth = {
    apiKey: "AIzaSyAC-fP9eI-sMrcIywaWtvEnzQKetNCa5tg",
    authDomain: "storage-forage.firebaseapp.com",
    databaseURL: "https://storage-forage.firebaseio.com",
    projectId: "storage-forage",
    storageBucket: "storage-forage.appspot.com",
    messagingSenderId: "759283778161"
};

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AccountPageModule,
    AccountEditPageModule,
    BrowsePageModule,
    BrowsetabPageModule,
    EditListingPageModule,
    ListingPageModule,
    LoginPageModule,
    MessagesPageModule,
    PopoverPageModule,
    PostSpacePageModule,
    SignupPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ImagePicker,
    Base64,
    File,
    Transfer,
    Camera,
    FilePath,
    HTTP,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
      AngularfireDbProvider,
  ]
})
export class AppModule {}
