import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject} from '@ionic-native/sqlite';
import { Platform, Events } from 'ionic-angular'

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()


export class DatabaseProvider {

  database:SQLiteObject;
  win_db: any; //H5数据库对象
  win: any = window; //win对象
  public data: any;

  constructor(private platform: Platform,
              private sqlite: SQLite,
              private events: Events) {
    console.log('Hello DatabaseProvider Provider');
  }

  createDb(){
    if(this.isMobile()){
       this.sqlite.create({
         name: 'alex.db',
         location: 'default'
       })
       .then((db:SQLiteObject) => {
         this.database = db;
         //创建表
         this.createTable();
         this.events.publish('db:create');
       })
       .catch(e => {
        //  this.showAlert();
         this.events.publish('db:create');
       });
    }else {
      //H5数据库存储
      this.win_db = this.win.openDatabase("alex.db",'1.0','warningInfo',5* 1024 *1024);   
     
      this.createTable();
      this.events.publish('db:create');
    }
    }

  /**
   * 创建表
   *
   * @memberof DatabaseProvider
   */
  async createTable() {
    
    this.executeSql('CREATE TABLE IF NOT EXISTS manholeCoverMapInfo(device_id INTEGER PRIMARY KEY AUTOINCREMENT,device_name CHAR(10),address VARCHAR(20),latitude CHAR(10),longitude CHAR(10),status CHAR(2))',[]);
    this.executeSql('CREATE TABLE IF NOT EXISTS warningInfo(device_id INTEGER PRIMARY KEY AUTOINCREMENT,device_name VARCHAR(20),device_address VARCHAR(100),warnTime VARCHAR(20),warnType VARCHAR(10))',[]);
  }

  /**
   * 执行语句
   *
   * @param {string} sql
   * @param {Array<any>} array
   * @returns {Promise<any>}
   * @memberof DatabaseProvider
   */
  executeSql(sql: string, array:Array<any>): Promise<any> {
     return new Promise((resolve, reject) => {
       if(this.isMobile()){
         if(!!!!this.database){
           this.database.executeSql(sql, array).then((data) => {
             console.log("数据库存放成功11111"),
             resolve(data);
           },(err) => {
             reject(err);
             console.log('Unable to execute sql: ' + err);
           });
         }else {
           return new Promise((resolve) => {
             resolve([]);
           });
         }
       }else {
         if(this.win_db) {
           return this.queryWebSql(sql,array).then(data => {
             resolve(data);
           }).catch(err => {
             console.log(err);
           });
         }
       }
     });
  }

  queryWebSql(sql: string, params: Array<any>): Promise<any> {
      return new Promise((resolve,reject) => {
        try {
          this.win_db.transaction((tx) => {
              tx.executeSql(sql, params,
                (tx,res) => resolve(res),
                (tx,err) => reject(err)
                );
          },
            (err) => reject(err))
          
        } catch (err){
          reject(err);
        }
        
      });
  }



  querySql(sql:string,params:Array<any>): Promise<any> {
      return new Promise((resolve,reject) => {
        if(!!!!this.database){
          this.database.executeSql(sql, params).then((data) => {
            // this.data = data;
            resolve(data);
          },(err) => {
            reject(err);
            console.log('Unable to execute sql: ' + err);
          });
        }else {
          return new Promise((resolve) => {
            resolve([]);
          });
        }
      })
  }



  /**
   * 判断是否为真机环境
   *
   * @returns {boolean}
   * @memberof DatabaseProvider
   */
  isMobile(): boolean {
    return this.platform.is('mobile') && !this.platform.is('mobileweb');
  }

}
