import { Component,ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, AlertController, Platform, ViewController } from 'ionic-angular';

import { LoginPage } from './login/login';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage extends BaseUI {

  public notLogin: boolean = true;
  public logined: boolean = false;
  public headface: string;
  public userinfo: string[];
  cookie: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
    public cdRef: ChangeDetectorRef,
    public alertCtrl: AlertController,
    public platform: Platform,
    public viewCtrl: ViewController
  ) {
    super();
  }
/**
 * 跳转到登录界面
 *
 * @memberof MorePage
 */
showModal() {
    const modal = this.modalCtrl.create(LoginPage);
    modal.onDidDismiss(data => {
      this.ionViewDidLoad();
      });
    modal.present();
  }

/**
 * 加载用户信息
 *
 * @memberof MorePage
 */
loadUserPage() {
    // 加载用户数据
    var loading = super.showLoading(this.loadingCtrl, "加载中...");
    this.storage.get('token').then((val) => {
      if (val != null) {
        this.cookie = val;
        console.log("token不为空", this.cookie);

        //显示登录界面
        this.logined = true;
        this.notLogin = false;
        this.cdRef.detectChanges();
        loading.dismiss();
      } else {
        console.log("token为空");
        loading.dismiss();
        //显示未登录界面
        this.notLogin = true;
        this.logined = false;
        this.cdRef.detectChanges();
      }
    });
  }


/**
 * 退出登录按钮方法
 *
 * @memberof MorePage
 */
  exitLogin() {
    this.storage.remove('token');
    this.ionViewDidLoad();
  }
 
  /**
   * 主方法 程序执行入口
   *
   * @memberof MorePage
   */
  ionViewDidLoad() {   
    this.loadUserPage();
  }

}
