import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
import { HttpClient,HttpParams, HttpHeaders} from "@angular/common/http";
import { Storage } from '@ionic/storage';

@Injectable()
export class RestProvider {

  constructor(public http: HttpClient,
              
              public storage:Storage) {
    console.log('Hello RestProvider Provider');
  }

  
  
  private apiUrlLogin = 'http://192.168.0.102:8080/login';
  public apiUrlManholecoversInfo = "http://192.168.0.102:8080/devices/";
  public apiUrlDeviceInfo = "http://192.168.0.102:8080/devices/";
  public apiUrlWarningInfo = "http://192.168.0.102:8080/warningMessages"

  token: any;
  request: any;


  /**
   * 根据用户的手机号和密码进行登录 并获取token
   * 
   * @prama { any } mobile
   * @param { any } password
   * @returns { Observable<string[]> }
   * memberof RestProvider
   */
  login(username,password) {
    var params = {
      phoneNumber: username,
      password: password
    };
    console.log("rrrrrr");
    return this.postUrlReturn(this.apiUrlLogin,this.encodeHttpParams(params));
  }

 
/**
 * post请求路径及请求体
 *
 * @private
 * @param {string} url
 * @param {*} body
 * @returns
 * @memberof RestProvider
 */
private postUrlReturn(url: string,body: any){
    
    return this.http.post(url,body);
    
  }
  
  /**
   * post请求体携带的参数
   * 
   * @private
   * @param {*} params
   * @returns {*}
   * @memberof RestProvider
   */
  private encodeHttpParams(params: any): any {
  if (!params) return null;
  return new HttpParams({fromObject: params});
  }


    
   
  

  // register(mobile, nickname, password): Observable<string[]> {
  //   return this.getUrlReturn(this.apiUrlRegister + "?mobile=" + mobile + "&nickname=" + nickname + "&password=" + password);
  // }

// setSensorParam(ip,port,angle,defenShakeLevel,warningModel,sensitivity){
//   var params = {
//     ip: ip,
//     port: port,
//     angle: angle,
//     defenShakeLevel: defenShakeLevel,
//     warningModel: warningModel,
//     sensitivity: sensitivity
//   }
//     return this.postUrlReturn(this.apiUrlSetSensorParam,this.encodeHttpParams(params));
//   }


  /**
   * 处理接口返回的数据，处理成 json 格式
   * 
   * @private
   * @prama { Response } res
   * @returns 
   * memberof RestProvider
 
  // private extractData(res: Response) {
  //   let body = res.json();
  //   return JSON.parse(body) || {};
  // }



  /**
   * 处理请求中的错误，考虑各种情况的处理并在 console 中显示 error
   * 
   * @private
   * @prama { Response | any } toastCtrl
   * @returns 
   * memberof RestProvider
   */
  // private handleError(error: Response | any) {
  //   let errMsg: string;
  //   //判断的到的值是否为Response类型
  //   if (error instanceof Response) {
  //     const body = error.json() || '';
  //     const err = body.error || JSON.stringify(body);
  //     errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  //   } else {
  //     errMsg = error.message ? error.message : error.toString();
  //   }
  //   console.error(errMsg);
  //   return Observable.throw(errMsg);
  // }

  
}
