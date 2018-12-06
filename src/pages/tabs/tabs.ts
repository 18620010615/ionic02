import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { HomePage } from '../home/home';
import { WarningPage } from '../warning/warning';
import { MorePage } from '../more/more';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  homeRoot = HomePage;
  warningRoot = WarningPage;
  moreRoot = MorePage;  

  constructor(public navCtrl: NavController, 
              public navParams: NavParams          
              ) {

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
