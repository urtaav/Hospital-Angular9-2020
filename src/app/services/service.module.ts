import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  SettingsService,
  SidebarService,
  SharedService,
  UserService,
  UploadFileService,
  LoginGuardGuard,
  
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
    ModalUploadService
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ServiceModule { }
