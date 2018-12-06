import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MorePage } from './more';
import { LoginPageModule } from './login/login.module';
@NgModule({
  declarations: [
    MorePage,
  ],
  imports: [
    IonicPageModule.forChild(MorePage),
    LoginPageModule
  ],
  entryComponents: [
    MorePage,
  ],
  providers: []
})
export class MorePageModule {}
