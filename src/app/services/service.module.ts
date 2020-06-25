import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  SettingsService,
  SidebarService,
  SharedService,
  UserService,
  LoginGuardGuard 
} from './service.index';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  providers:[
    SettingsService,
    SidebarService,
    SharedService,
    UserService,
    LoginGuardGuard
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ServiceModule { }
