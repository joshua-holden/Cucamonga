import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
import { BrowsetabPage } from '../pages/browsetab/browsetab';
import { BrowsePage } from '../pages/browse/browse';
import { PostSpacePage } from '../pages/post-space/post-space';
import { MySpacesPage } from '../pages/my-spaces/my-spaces';
import { MessagesPage } from '../pages/messages/messages';
import { AccountPage } from '../pages/account/account';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage,
    LoginPage,
    BrowsetabPage,
    BrowsePage,
    PostSpacePage,
    MySpacesPage,
    MessagesPage,
    AccountPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage,
    LoginPage,
    BrowsetabPage,
    BrowsePage,
    PostSpacePage,
    MySpacesPage,
    MessagesPage,
    AccountPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
