import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { EquipmentInfoPageModule } from '../home/equipment-info/equipment-info.module';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    EquipmentInfoPageModule
  ],
  entryComponents: [
    HomePage
  ],
})
export class HomePageModule {}
