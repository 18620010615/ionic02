import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WarningPage } from './warning';
import { DetailsPageModule } from './details/details.module';
import { ManholecoversMapPageModule } from './manholecovers-map/manholecovers-map.module'

@NgModule({
  declarations: [
    WarningPage,
  ],
  imports: [
    IonicPageModule.forChild(WarningPage),
    DetailsPageModule,
    ManholecoversMapPageModule
  ],
  entryComponents: [
    WarningPage
  ],
})
export class WarningPageModule {}
