import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { BaseUI } from '../../../common/baseui';
import { RestProvider } from '../../../providers/rest/rest';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage extends BaseUI {

  mobile: any;
  nickname: any;
  password: any;
  confirmPassword: any;
  errorMessage: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public rest: RestProvider
  ) {
    super();
  }

  dissmiss(){
    this.viewCtrl.dismiss();
  }

  returnLoginPage() {
    this.navCtrl.pop();
  }

  // doRegister() {
  //   if (this.password != this.confirmPassword) {
  //     super.showToast(this.toastCtrl, "两次密码输入不一致")
  //   } else {
  //     var loading = super.showLoading(this.loadingCtrl, "注册中...");
  //     this.rest.register(this.mobile, this.nickname, this.password).subscribe(
  //         f => {
  //           if (f["Status"] == "OK") {
  //             loading.dismiss();
  //             super.showToast(this.toastCtrl,"注册成功 ！");              
  //             this.dissmiss();
  //           }
  //           else {
  //             loading.dismiss();
  //             super.showToast(this.toastCtrl, f["StatusContent"])
  //           }
  //         },
  //         error => this.errorMessage = <any>error);
  //   }

  // }

  ionViewDidLoad() {

  }
}
