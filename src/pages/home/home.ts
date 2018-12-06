import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { EquipmentInfoPage } from '../home/equipment-info/equipment-info'
import { BaseUI } from '../../common/baseui'
import { Storage } from '@ionic/storage'
import {  RestProvider } from '../../providers/rest/rest'
import { HttpClient, HttpParams, HttpHeaders} from "@angular/common/http";
import { DatabaseProvider } from '../../providers/database/database';
// import { AppAvailability } from '@ionic-native/app-availability';
// import { MyApp } from '../../app/app.component';


declare var AMap;
declare var device;
declare var appAvailability;
declare var startApp;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage extends BaseUI {

  
  // public content: string[];
  // public deviceId: any;
  // public deviceName: string;
  // public address: any;


  private manholeCoversMapInfo: any=null;
  private token: string;
  private message: any;
  private net:any; 
  private status: any;
  private index: any;
  private device: any;
  private latitude: any;
  private longitude: any;
  private la:string[];
  private ln:string[];

  private data: string[]=[];
  public networkStatus: any;
  

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public rest: RestProvider,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public zone: NgZone,
    public storage: Storage,
    public  databaseProvider: DatabaseProvider,
    public http: HttpClient,
    // public appAvailability: AppAvailability
    // public app: MyApp
  ) {
    super();
    (window as any).angularComponent = { myFunction: this.myFunction };
    (window as any).angularComponent1 = { recover: this.recover };
    (window as any).angularComponent2 = { turnMap: this.turnMap };
  }

  private loadMap() {
    
    var map = new AMap.Map('container', {
      zoom: 16,
      center: [113.3733, 23.12622],
      viewMode: '2D',  //设置地图模式
      lang: 'zh_cn',  //设置地图语言类型
    });


    // 创建 AMap.Icon 实例：
    var icon1 = new AMap.Icon({
      image: '../../assets/imgs/manholecovers.png',  // Icon的图像
    });

    // 创建 AMap.Icon 实例：
    var icon2 = new AMap.Icon({
      image: '../../assets/imgs/manholecovers-warning.png',  // Icon的图像
    });

   

    // 创建 infoWindow 实例 
    var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
    if(this.manholeCoversMapInfo){
       console.log("网络连接正常",this.manholeCoversMapInfo);
       for(let q of this.message){
 
        if(q.status == 0.0){
          var marker = new AMap.Marker({
              position: new AMap.LngLat(q.longitude,q.latitude),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]    
              map: map,
              icon: icon1   
          });
          marker.content = '编号:' + q.deviceId+ '<br/> 名称:' + q.deviceName + '<br/> 位置:' + q.address + "<br/> <div><button style=\"font-size:16px;width:infoWindow.width/2;height:infoWindow.height/4;color:#2828FF;\" onclick=\"window.angularComponent2.turnMap()\">导航</button><button style=\"font-size:16px;width:infoWindow.width/2;height:infoWindow.height/4;color:#2828FF;\" onclick=\"window.angularComponent.myFunction()\">详情</button><button style=\"font-size:16px;width:infoWindow.width/2;height:infoWindow.height/4;color:#2828FF;\" onclick=\"window.angularComponent1.recover()\">恢复</button></div>";
          marker.on('click', markerClick);
          marker.emit('click', {target: marker});
         
          }else{
           marker = new AMap.Marker({
              position: new AMap.LngLat(q.longitude, q.latitude),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
              map: map,
              icon: icon2   
          });
          marker.content = '编号:' + q.deviceId + '<br/> 名称:' + q.deviceName + '<br/> 位置:' + q.address + "<br/> <div><button style=\"font-size:16px;width:infoWindow.width/2;height:infoWindow.height/4;color:#2828FF;\" onclick=\"window.angularComponent2.turnMap()\">导航</button><button style=\"font-size:16px;width:infoWindow.width/2;height:infoWindow.height/4;color:#2828FF;\" onclick=\"window.angularComponent.myFunction()\">详情</button><button style=\"font-size:16px;width:infoWindow.width/2;height:infoWindow.height/4;color:#2828FF;\" onclick=\"window.angularComponent1.recover()\">恢复</button></div>";
          marker.on('click', markerClick);
          marker.emit('click', {target: marker});
          }       
    } 
  }else{
    console.log("网络连接失败",this.data);
    for(let q of this.data){
      console.log("datdatdtata",q["device_id"]);

      if(q["status"] == 0.0){
         marker = new AMap.Marker({
            position: new AMap.LngLat(q["longitude"],q["latitude"]),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]    
            map: map,
            icon: icon1   
        });
        marker.content = '编号:' + q["device_id"] + '<br/> 名称:' + q["device_name"] + '<br/> 位置:' + q["address"] + "<br/> <div><button style=\"font-size:16px;width:infoWindow.width/2;height:infoWindow.height/4;color:#2828FF;\" onclick=\"window.angularComponent2.turnMap()\">导航</button><button style=\"font-size:16px;width:infoWindow.width/2;height:infoWindow.height/4;color:#2828FF;\" onclick=\"window.angularComponent.myFunction()\">详情</button><button style=\"font-size:16px;width:infoWindow.width/2;height:infoWindow.height/4;color:#2828FF;\" onclick=\"window.angularComponent1.recover()\">恢复</button></div>";
        marker.on('click', markerClick);
        marker.emit('click', {target: marker});
       
        }else{
         marker = new AMap.Marker({
            position: new AMap.LngLat(q["longitude"],q["latitude"]),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            map: map,
            icon: icon2   
        });
        marker.content = '编号:' + q["device_id"] + '<br/> 名称:' + q["device_name"] + '<br/> 位置:' + q["address"] + "<br/> <div><button style=\"font-size:16px;width:infoWindow.width/2;height:infoWindow.height/4;color:#2828FF;\" onclick=\"window.angularComponent2.turnMap()\">导航</button><button style=\"font-size:16px;width:infoWindow.width/2;height:infoWindow.height/4;color:#2828FF;\" onclick=\"window.angularComponent.myFunction()\">详情</button><button style=\"font-size:16px;width:infoWindow.width/2;height:infoWindow.height/4;color:#2828FF;\" onclick=\"window.angularComponent1.recover()\">恢复</button></div>";
        marker.on('click', markerClick);
        marker.emit('click', {target: marker});
        }     
     } //for-end
  } //if-end
  

  function markerClick(e) {
    infoWindow.setContent(e.target.content);
    infoWindow.open(map, e.target.getPosition());
   }  
  } //loadMap()-end


/**
 *  详情按钮，跳转到设备设置界面
 *
 * @memberof HomePage
 */
myFunction = () => {
    this.zone.run(() => {     
      this.navCtrl.push(EquipmentInfoPage);
    });
  }


/**
 * 恢复按钮，使设备恢复正常状态
 *
 * @memberof HomePage
 */
recover = () => {
    this.zone.run(() => {     
      this.status = 0;
      this.ionViewDidLoad();
    });
  }


/**
 * 调起外部地图应用 百度地图 高德地图
 *
 * @memberof HomePage
 */
turnMap = () => {
  this.zone.run(() =>{
    let schemeIntent;   // 地图APP Package Name
    if(device.platform === 'iOS') {  
      console.log("IOS平台");
      schemeIntent='baidu://',
      hasIosPackage()
    }else if(device.platform === 'Android') {  
        console.log("Android平台");
        schemeIntent = 'com.baidu.BaiduMap' ,
        hasAndroidPackage()
    } 

  appAvailability.check(schemeIntent,hasAndroidPackage,notAndroidPackage);   //Android  
 

   function hasAndroidPackage() { 
     // 存在对应APP  
     var sApp = startApp.set({  //跳转对应APP 
                "action":"ACTION_VIEW",  
        　　　　"category":"CATEGORY_DEFAULT",  
        　　　　"type":"text/css",  
        　　　　"package":"com.autonavi.minimap",  
        　　　　"uri":"amapuri://route/plan/?sid=BGVIS1&slat=39.92848272&slon=116.39560823&sname=A&did=BGVIS2&dlat=39.98848272&dlon=116.47560823&dname=B&dev=0&t=0",   //我是选择路径规划然后导航的，当然你也可以直接用导航路径或者其他路径  
        　　　　"flags":["FLAG_ACTIVITY_CLEAR_TOP","FLAG_ACTIVITY_CLEAR_TASK"],   
        　　　　"intentstart":"startActivity",  
              }, { /* extras */  
                "EXTRA_STREAM":"extraValue1",  
                "extraKey2":"extraValue2"  
              });  
              sApp.start(function() { //跳转成功  
                alert("OK");  
              }, function(error) { //失败 
                alert(error);  
              });  
        
          } 
    function notAndroidPackage() {  // 不存在对应APP 
              alert('请更换地图APP或下载该地图APP');  
          } 


      appAvailability.check(schemeIntent,hasIosPackage,notIosPackage);   //IOS
      function hasIosPackage() {  // 存在对应APP  
        var sApp = startApp.set("baidumap://map/direction?origin=34.264642646862,108.95108518068&destination=40.007623,116.360582&mode=driving&src=ios.baidu.openAPIdemo");  
         sApp.start(function() {  
           alert("OK");  
        }, function(error) { 
           alert(error);  
         });  
      } 
      function notIosPackage() {  // 不存在对应APP 
        alert('请更换地图APP或下载该地图APP');  
      } 
      

      
    
  });
}


/**
 * 通过http请求获取井盖信息
 *
 * @memberof HomePage
 */
getManholeCoversMapInfo(){  
    this.storage.get('token').then((val) => {     
      if(val != null){     
        var loading = super.showLoading(this.loadingCtrl,"加载中。。。");
        loading = super.showLoading(this.loadingCtrl,"加载中。。。");
        this.token = val;
        var headers = new HttpHeaders({'Token': this.token});
        this.http.get(this.rest.apiUrlManholecoversInfo,{headers:headers})
          .subscribe(   
          manholeCoversMapInfo =>{            
              this.manholeCoversMapInfo = manholeCoversMapInfo;
              console.log("manholeCoversMapInfo=",JSON.stringify(this.manholeCoversMapInfo,null,2));
              this.message = this.manholeCoversMapInfo["message"];
              // console.log("message=：",JSON.stringify(this.message,null,2));
              for(let q of this.message){
              //将获取到的每个井盖的信息存入到sqlite数据库
              this.databaseProvider.executeSql('INSERT INTO manholeCoverMapInfo(device_id ,device_name ,address ,latitude ,longitude,status) VALUES(?,?,?,?,?,?)',[q["deviceId"],q["deviceName"],q["address"],q["latitude"],q["longitude"],q["status"]]);              
              }             
              this.loadMap();
              loading.dismiss();                    
          }, error => {
            // 请求发生错误,从数据库加载数据
            // this.loadWarningInfo();    
            loading.dismiss();
        });             
    }else{
      console.log("toke为空");
    }
  })
}


/**
 * 主方法，程序执行开始地方
 *
 * @memberof HomePage
 */

 
ionViewDidLoad() {   
  
    this.storage.get('networkStatus').then((val) =>{
      this.net = val;
      console.log("HOME:",this.net);
      let loader = this.loadingCtrl.create({
        content: this.net,
        duration:6000
      });
      loader.present();
      if(this.net == 1){
        //无网络连接，从sqlite获取历史数据
        this.loadWarningInfo(); 
      }else{
        //网络连接正常，从后台获取数据
        this.getManholeCoversMapInfo();
      }
    }) 
  }


   /**
   * 无网络连接时，从本地sqlite里取出历史数据显示到warnPage页面
   *
   * @memberof WarningPage
   */
  loadWarningInfo(){
    console.log("loadWarningInfo");
    this.databaseProvider.querySql('SELECT * FROM manholeCoverMapInfo',[]).then(data => {
      var len = data.rows.length;
      if(len>0) {
        for(let i=0;i<len;i++){
          this.data.push(data.rows.item(i));
          console.log("data数组值：",JSON.stringify(data.rows.item(i)));
        }
          console.log("data数组全部值：",JSON.stringify(this.data));
          this.loadMap();          
      }
    })  
  }

  /**
   * 下拉刷新
   *
   * @param {*} refresher
   * @memberof HomePage
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

