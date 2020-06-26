import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  SettingsService,
  SidebarService,
  SharedService,
  UserService,
  UploadFileService,
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
    UploadFileService,
    LoginGuardGuard
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ServiceModule { }
