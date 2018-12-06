import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,ModalController,LoadingController , ToastController } from 'ionic-angular';
import { ManholecoversMapPage } from '../manholecovers-map/manholecovers-map';
import { RestProvider} from '../../../providers/rest/rest';
import { BaseUI } from '../../../common/baseui';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders} from "@angular/common/http";

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage extends BaseUI{

  token:string;
  deviceInfo: {};
  deviceWarningInfo: {};
  id: any;
  deviceId: any;
  name: any;
  status: any;
  address: any;
  warnTime: any;

  params: any;
  public aaa: {name:"张三"};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public modalCtrl: ModalController,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public rest: RestProvider,
              public http: HttpClient,
              public storage: Storage
              ) {
                super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
    
    this.getDeviceInfo();
    this.getDeviceWarningInfo();
  }


/**
 * 通过http get方式获取井盖设备信息 
 *
 * @memberof DetailsPage
 */
getDeviceInfo() {
    this.storage.get('token').then((val) => {
      if (val != null) {
        this.token = val;
        this.params = this.navParams.get('params');
        console.log("params", this.params);
        this.id = this.params["deviceId"];

        this.deviceId = this.params["device_id"];
        this.name = this.params["device_name"];
        this.status = this.params["warnType"];
        this.address = this.params["device_address"];
        this.warnTime = this.params["warnTime"];
        var headers = new HttpHeaders({ 'Token': this.token });
        this.http.get(this.rest.apiUrlDeviceInfo + this.id, { headers: headers })
          .subscribe(
            deviceInfo => {
              this.deviceInfo = deviceInfo;
              console.log("deviceInfo=", JSON.stringify(this.deviceInfo, null, 2));
            }, error => {
              if (!this.deviceInfo) {
                console.log("detailllllllllllllll");
                
              }

            });
      }
    })
  }


/**
 * 通过http get请求获取井盖报警信息
 *
 * @memberof DetailsPage
 */
getDeviceWarningInfo() {

    this.storage.get('token').then((val) => {
      if (val != null) {
        this.token = val;
        var headers = new HttpHeaders({ 'Token': this.token });
        this.http.get(this.rest.apiUrlWarningInfo + "/" + this.id, { headers: headers })
          .subscribe(
            deviceWarningInfo => {
              this.deviceWarningInfo = deviceWarningInfo;
              console.log("deviceWarninfInfo=", JSON.stringify(this.deviceWarningInfo, null, 2));
            }, error => {
              console.log("detaiiiiiiiiiiiii");
            });
      }
      else {
        console.log("token为空");
      }
    })
  }


/**
 * 销毁本页面
 * 
 * @memberof DetailsPage
 */
dismiss() {
    this.viewCtrl.dismiss();
  }


/**
 * 跳转到井盖地图页面
 *
 * @memberof DetailsPage
 */
showLocation() {
    const modal = this.modalCtrl.create(ManholecoversMapPage);
    modal.present();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.ionViewDidLoad();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

}
