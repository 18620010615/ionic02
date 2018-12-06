import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ManholecoversMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var AMap;

@IonicPage()
@Component({
  selector: 'page-manholecovers-map',
  templateUrl: 'manholecovers-map.html',
})
export class ManholecoversMapPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public zone: NgZone,
            ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManholecoversMapPage');
    // this.loadMap();
  }

//   private loadMap() {
//     var map = new AMap.Map('container', {
//       zoom: 16,
//       center: [this.longitude, this.latitude],
//       viewMode: '2D',  //设置地图模式
//       lang: 'zh_cn',  //设置地图语言类型
//     });


//     // 创建 AMap.Icon 实例：
//     var icon1 = new AMap.Icon({
//       image: '../../assets/imgs/manholecovers.png',  // Icon的图像
//     });

//        // 创建 AMap.Icon 实例：
//        var icon2 = new AMap.Icon({
//         image: '../../assets/imgs/manholecovers-warning.png',  // Icon的图像
//       });

//     // 创建一个 Marker 实例：
    
//     var marker = new AMap.Marker();
//     if(this.status == 0){
//       for(let q of this.message){
//       marker = new AMap.Marker({
//         position: new AMap.LngLat(q.longitude,q.latitude),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
       
//         title: '测试',
//         map: map,
//         // icon: '../../assets/imgs/manholecovers.png',
//           icon: icon1   
//       });
//     }
//     }else{
//       for(let q of this.message){
//        marker = new AMap.Marker({
//         position: new AMap.LngLat(q.longitude, q.latitude),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
//         title: '测试',
//         map: map,
//         // icon: '../../assets/imgs/manholecovers.png',
//           icon: icon2    
//       });
//     }
//     }

//     // this.deviceId = "015";
//     // this.deviceName = "工业园4号盖";
//     // this.address = "天河区建中路22号";

//     // 创建 infoWindow 实例 
//     var infoWindow = new AMap.InfoWindow({

//       content: '编号:' + this.deviceId + '<br/> 名称:' + this.deviceName + '<br/> 位置:' + this.address + "<br/> <div><button style=\"font-size:16px;width:infoWindow.width/2;height:infoWindow.height/4;color:#2828FF;\" onclick=\"window.angularComponent.myFunction()\">导航</button><button style=\"font-size:16px;width:infoWindow.width/2;height:infoWindow.height/4;color:#2828FF;\" onclick=\"window.angularComponent.myFunction()\">详情</button><button style=\"font-size:16px;width:infoWindow.width/2;height:infoWindow.height/4;color:#2828FF;\" onclick=\"window.angularComponent1.recover()\">恢复</button></div>",
//       offset: new AMap.Pixel(0, -30)

//     });

//     //鼠标点击marker弹出自定义的信息窗体
//     AMap.event.addListener(marker, 'click', function () {
//       infoWindow.open(map, marker.getPosition());
//     });
//   }

//   myFunction = () => {
//     this.zone.run(() => {
//       console.log("222");
//       this.navCtrl.push(EquipmentInfoPage);
//     });
//   }

//   recover = () => {
//     this.zone.run(() => {
//       // this.flag = 1;
//       this.status = 0;
//       console.log("111");
//       this.ionViewDidLoad();
//     });
//   }

}
