import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController ,Tabs, Toast, ToastController} from 'ionic-angular';
import { BaseUI } from '../../common/baseui';
import { DetailsPage } from './details/details';
import { HomePage } from '../home/home';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders} from "@angular/common/http";
import { DatabaseProvider } from '../../providers/database/database';
// import { MyApp } from '../../app/app.component';

@IonicPage()
@Component({
  selector: 'page-warning',
  templateUrl: 'warning.html',
})
export class WarningPage extends BaseUI{

  private token:string;

  private warningInfo: {};
  private status: any;
  private deviceId: any;
  private deviceName: string;
  private address: any;
  private warnTime: any;
  private warnType: any;
  private message: any;
  private openWarning: string[] =[];
  private waterWarning: string[]=[];
  private index: any;
  private device: any;
  private latitude: any;
  private longitude: any;

  private data: string[]=[];
  public networkStatus: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public modalCtrl: ModalController,
              public storage: Storage,
              public toastCtrl: ToastController,
              public http: HttpClient,
              public rest: RestProvider,
              private databaseProvider: DatabaseProvider,
              // private app: MyApp
            ) {
              super();
  }



/**
 * 通过网络请求，获取报警信息记录
 *
 * @memberof WarningPage
 */
getWarningMessage(){
    this.storage.get('token').then((val) => {
      
      if(val != null){       
        this.token = val;
        console.log("token= ",this.token);
        var headers = new HttpHeaders({'Token': this.token});
        this.http.get(this.rest.apiUrlWarningInfo,{headers:headers})
        .subscribe(
          warningInfo =>{             
              this.warningInfo = warningInfo;
              // console.log("warningInfo1111=",JSON.stringify(this.warningInfo,null,2));
              this.message = this.warningInfo["message"];
              // console.log("message=：",JSON.stringify(this.message,null,2));
              for(let i of this.message){
                if(i["warnType"] == 1){

                   this.openWarning.push(i);                
                }else{

                   this.waterWarning.push(i);               
                }
                var device = i["device"];
                this.databaseProvider.executeSql('INSERT INTO warningInfo(device_id ,device_name ,device_address ,warnTime ,warnType) VALUES(?,?,?,?,?)',[i["deviceId"],device["deviceName"],device["address"],i["warnTime"],i["warnType"]]);
                console.log("数据库存放成功222");
              }
              super.showToast(this.toastCtrl,warningInfo["result"]);  
          },error => {
            if(!this.warningInfo){
              console.log("kkkkk",this.warningInfo);
            // this.loadWarningInfo();
            }    
        });         
      }else{
        console.log("toke为空");
      }
    })  
  }


/**
 * 主方法 程序执行入坑
 *
 * @memberof WarningPage
 */
ionViewDidLoad() {   
    console.log("ionViewDidLoad-Warning:",this.networkStatus);
    // if(this.app.networkStatus == 0){
      //没有网络连接，从sqlite取出数据
      this.loadWarningInfo();
    // }else{
      //网络连接正常，从后台取出数据
      // this.getWarningMessage(); 
    // }
    
  }


/**
* 无网络连接时，从本地sqlite里取出历史数据显示到warnPage页面
*
* @memberof WarningPage
*/
loadWarningInfo() {
    console.log("loadWarningInfo");
    // this.databaseProvider.executeSql('INSERT INTO warningInfo(device_id,device_name ,device_address ,warnTime ,warnType)  VALUES (?,?,?,?,?)',['9527','工业园三号井','天河区建中路165号','2018-9-29 10:26:23','水位报警']);
    this.databaseProvider.querySql('SELECT * FROM warningInfo', []).then((data) => {
      var len = data.rows.length;
      if (len > 0) {
        for (let i = 0; i < len; i++) {
          this.data.push(data.rows.item(i));
          console.log("data数组值：", JSON.stringify(data.rows.item(i)));
        }
        console.log("data数组全部值：", JSON.stringify(this.data));
      }
    })
}


/**
 * 弹出详细报警信息页面
 *
 * @param {*} deviceId
 * @memberof WarningPage
 */
showModal(data){
    const modal = this.modalCtrl.create(DetailsPage,{params:data});
    modal.present();
  }


showLocation(){
  this.selectTab();
}


/**
 *  底部Tab切换
 *
 * @param {number} index
 * @memberof DetailsPage
 */
selectTab(){
    var t: Tabs  = this.navCtrl.parent;
    t.select(0);
  }


/**
 * 下拉刷新
 *
 * @param {*} refresher
 * @memberof WarningPage
 */
doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.ionViewDidLoad();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
}





