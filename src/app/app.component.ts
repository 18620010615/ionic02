import { Component } from '@angular/core';
import { Platform ,Events, LoadingController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { DatabaseProvider } from '../providers/database/database';
import { Network } from '@ionic-native/network';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  private networkStatus: number;
  private cookie:any;
  constructor(
              platform: Platform,
              private events: Events,
              private statusBar: StatusBar, 
              private splashScreen: SplashScreen,
              private databaseProvider: DatabaseProvider,
              private network: Network,
              private loadingCtrl: LoadingController,
              private storage: Storage
            ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.init();//初始化
      this.checkNetwork();  //写入函数，让app启动后进行网络监测
   
    });
  }

  init(){
    //确保异步执行完毕后才隐藏启动动画
    this.events.subscribe('db:create',() => {
      //创建数据库与表成功后才隐藏启动动画
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    })
    
    //初始化创建数据库
    this.databaseProvider.createDb();
  }

   //检测网络，若未连接网络，给出提示
  checkNetwork() {
    if(this.network.type === 'unknown') {
      this.networkStatus = 1;
      console.log('This is a unknown network, please be careful!');
    } else if(this.network.type === 'none') {
      this.networkStatus = 0;
      console.log('none network!');
      let loader = this.loadingCtrl.create({
        content: "当前网络不可用，请检查网络设置！",
        duration:6000
      });
      loader.present();
    } else {
      this.networkStatus = 1; 
      console.log("component0:",this.networkStatus);
      console.log('we got a ' + this.network.type + ' connection, woohoo!');
    }
    console.log("component1:",this.networkStatus);
    this.storage.set('networkStatus',this.networkStatus);
    this.storage.get('networkStatus').then((val) => {
      if (val != null) {
        this.cookie = val;
        console.log("networkStatus不为空", this.cookie);
      }else{
        console.log("networkStatus为空")
      }
    });
    
    console.log("component2:",this.networkStatus);
  }

}
