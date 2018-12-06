import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { BaseUI } from '../../../common/baseui'
import { RestProvider } from '../../../providers/rest/rest'
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-equipment-info',
  templateUrl: 'equipment-info.html',
})
export class EquipmentInfoPage extends BaseUI {

  private token: string;

  private registerInfo: any;

  //井盖信息注册
  private deviceIdentifier: any;
  private deviceName: any;
  private department: any;
  private installersName: any;
  private addrerss: any;
  private longitude: any;
  private latitude: any;
  private macAddress: any;
  // public gpsLongitude: any;
  // public gpsLatitude: any;
  // public note: any;

  //井盖参数设置
  private ip: any;
  private port: any;
  private angle: any;
  private defenShakeLevel: any;
  private warningModel: any;
  private sensitivity: any;

  public errorMessage: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public rest: RestProvider,
    public http: HttpClient,
    public storage: Storage) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EquipmentInfoPage');
    this.macAddress = "c8:25:e1:6e:e9:ad";
  }


/**
 * 通过http post请求上传井盖参数设置信息
 *
 * @memberof EquipmentInfoPage
 */
uploadManholecoversInfo() {
    this.storage.get('token').then((val) => {

      if (val != null) {
        this.token = val;
        console.log("token= ", this.token);
        var headers = new HttpHeaders({ 'Token': this.token });

        var params = {
          deviceIdentifier: this.deviceIdentifier,
          deviceName: this.deviceName,
          installersName: this.installersName,
          addrerss: this.addrerss,
          longitude: this.longitude,
          latitude: this.latitude,
          macAddress: this.macAddress
        }
        var loading = super.showLoading(this.loadingCtrl, "保存中..."); //定义loading组件
        this.http.post(this.rest.apiUrlDeviceInfo, this.encodeHttpParams(params), { headers: headers }).subscribe(
          res => {
            this.registerInfo = res;
            console.log("registerInfo=", this.registerInfo);

            if (res["code"] == "200") {
              loading.dismiss();
              super.showToast(this.toastCtrl, "保存成功 ！");
            } else if (res["code"] == "403") {
              //登录失败弹出提醒
              loading.dismiss();
              super.showToast(this.toastCtrl, res["message"]);
            }
          },
          error => this.errorMessage = <any>error);
      } else {
        super.showToast(this.toastCtrl, "token为空");
      }
    })
    // setSensorParam(){
    //   var loading = super.showLoading(this.loadingCtrl,"登录中..."); //定义loading组件
    //   this.rest.setSensorParam(this.ip,this.port,this.angle,this.defenShakeLevel,this.warningModel,this.sensitivity).subscribe(
    //     f=>{
    //       if(f["Status"]== "OK"){

    //         loading.dismiss();
    //         super.showToast(this.toastCtrl,"保存成功 ！");
    //       }else{
    //         //登录失败弹出提醒
    //         loading.dismiss();
    //         super.showToast(this.toastCtrl,"保存失败:"+f["StatusContent"]);
    //       }
    // },
    //   error=>this.errorMessage = <any>error);
    // }



  }

  private encodeHttpParams(params: any): any {
    if (!params) return null;
    return new HttpParams({ fromObject: params });
  }
}