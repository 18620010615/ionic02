import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http'; //全局导入HTTP

import { HomePageModule } from '../pages/home/home.module';
import { WarningPageModule } from '../pages/warning/warning.module';
import { MorePageModule } from '../pages/more/more.module';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { RestProvider } from '../providers/rest/rest';
import {HttpClientModule} from "@angular/common/http";
import { SQLite } from "@ionic-native/sqlite";
import { DatabaseProvider } from '../providers/database/database';
import { Network } from '@ionic-native/network';
import { HomePage } from '../pages/home/home';
import { WarningPage } from '../pages/warning/warning';

@NgModule({
  declarations: [
    MyApp,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,     
    HttpClientModule,               //全局导入HTTP
    IonicModule.forRoot(MyApp,{
       backButtonText:"返回"
    }),
    IonicStorageModule.forRoot(),  //全局定义 storage 模块
    HomePageModule,
    WarningPageModule,
    MorePageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,                    //rest 的定义导入
    SQLite,
    DatabaseProvider,
    Network,
  ]
})
export class AppModule {}
