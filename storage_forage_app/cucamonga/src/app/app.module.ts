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
import { PricingModal } from '../pages/pricing-modal/pricing-modal';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AngularfireDbProvider } from '../providers/angularfiredb-service/angularfiredb-service';
import { FirestoreProvider } from '../providers/firestore-service/firestore-service';

/*
const firebaseAuth = {
    apiKey: "AIzaSyAXZpabh_R6gPhUexA50tn_t9AED79Rn4Y",
    authDomain: "storage-forage-app.firebaseapp.com",
    databaseURL: "https://storage-forage-app.firebaseio.com",
    projectId: "storage-forage-app",
    storageBucket: "storage-forage-app.appspot.com",
    messagingSenderId: "563818531897"
};*/

const firebaseAuth = {
    apiKey: "AIzaSyDZ-ZP4OOTaS02n4b2vNP5wJARnFqCGxsk",
    authDomain: "cucamonga-a35c9.firebaseapp.com",
    databaseURL: "https://cucamonga-a35c9.firebaseio.com",
    projectId: "cucamonga-a35c9",
    storageBucket: "cucamonga-a35c9.appspot.com",
    messagingSenderId: "454666002927"
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
    AngularFireStorageModule,
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
      FirestoreProvider,
  ]
})
export class AppModule {}
