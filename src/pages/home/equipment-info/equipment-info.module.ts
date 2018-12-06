import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EquipmentInfoPage } from './equipment-info';

@NgModule({
  declarations: [
    EquipmentInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(EquipmentInfoPage),
  ],
})
export class EquipmentInfoPageModule {}
