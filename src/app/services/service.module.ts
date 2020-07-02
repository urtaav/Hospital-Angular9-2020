import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
   //Services
  SettingsService,
  SidebarService,
  SharedService,
  UserService,
  UploadFileService,
  HospitalService,
  DoctorsService,
  //Guards
  LoginGuardGuard,
  AdminGuard,
  VericateTokenGuard
} from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

@NgModule({
  declarations: [],
  providers:[
    SettingsService,
    SidebarService,
    SharedService,
    UserService,
    UploadFileService,
    LoginGuardGuard,
    AdminGuard,
    VericateTokenGuard,
    ModalUploadService,
    HospitalService,
    DoctorsService
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ServiceModule { }
