import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { BaseUI } from '../../../common/baseui';
import { RestProvider } from '../../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { RegisterPage } from '../register/register';


@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage extends BaseUI {

    mobile: any;
    password: any;
    errorMessage: any;
    message: any;
    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        public loadingCtrl: LoadingController,
        public rest: RestProvider,
        public toastCtrl: ToastController,
        public storage: Storage) {
        super(); //调用父类的构造函数 constructor
    }


/**
 * 主方法 程序执行入坑
 *
 * @memberof LoginPage
 */
ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

/**
 * 通过http post请求登录账户 
 *
 * @memberof LoginPage
 */
login() {
        var loading = super.showLoading(this.loadingCtrl, "登录中...");
        console.log("qqqqqqqqqq");
        this.rest.login(this.mobile, this.password)
            .subscribe(res => {
                console.log("wwwwwwwww");
                // 成功收到response
                if (res["code"] == "200") {
                    //处理登录成功的页面跳转,存储接口返回的 token                    
                    this.storage.set('token', res["token"]);
                    this.message = res;
                    console.log("message=", JSON.stringify(this.message, null, 2));
                    loading.dismiss();
                    this.dismiss();
                    super.showToast(this.toastCtrl, "登录成功");
                } else {
                    loading.dismiss();
                    super.showToast(this.toastCtrl, "账号或密码错误");
                }
            }, error => {
                // 请求发生错误
                loading.dismiss();
                console.log("eeeeeeee");
                super.showToast(this.toastCtrl, "网络连接错误，请检查您的网络");
        });
}


/**
* 关闭当前页面的方法
* 
* @memberof LoginPage
*/
dismiss() {
    this.viewCtrl.dismiss();
}


/**
 * 跳转到注册界面
 *
 * @memberof LoginPage
 */
pushRegisterPage() {
        this.navCtrl.push(RegisterPage);
    }

}
