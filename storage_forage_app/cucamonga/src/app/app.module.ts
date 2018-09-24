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

import { MyApp } from './app.component';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
import { BrowsetabPage } from '../pages/browsetab/browsetab';
import { BrowsePage } from '../pages/browse/browse';
import { PostSpacePage } from '../pages/post-space/post-space';
import { MySpacesPage } from '../pages/my-spaces/my-spaces';
import { MessagesPage } from '../pages/messages/messages';
import { AccountPage } from '../pages/account/account';
import { ListingPage } from '../pages/listing/listing';

import { NgCalendarModule } from 'ionic2-calendar';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database'

import { AngularfireDbProvider } from '../providers/angularfiredb-service/angularfiredb-service';

const firebaseAuth = {
    apiKey: "AIzaSyAXZpabh_R6gPhUexA50tn_t9AED79Rn4Y",
    authDomain: "storage-forage-app.firebaseapp.com",
    databaseURL: "https://storage-forage-app.firebaseio.com",
    projectId: "storage-forage-app",
    storageBucket: "storage-forage-app.appspot.com",
    messagingSenderId: "563818531897"
};

@NgModule({
  declarations: [
    MyApp,
    SignupPage,
    LoginPage,
    BrowsetabPage,
    BrowsePage,
    PostSpacePage,
    MySpacesPage,
    MessagesPage,
    AccountPage, 
    ListingPage,  
  ],
  imports: [
    NgCalendarModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SignupPage,
    LoginPage,
    BrowsetabPage,
    BrowsePage,
    PostSpacePage,
    MySpacesPage,
    MessagesPage,
    AccountPage,
    ListingPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ImagePicker,
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
