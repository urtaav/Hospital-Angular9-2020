import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { PipesModule } from '../pipes/pipes.module';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';



@NgModule({
  imports:[
    RouterModule,
    CommonModule,
    PipesModule
  ],
  declarations: [
     BreadcrumbsComponent,
     HeaderComponent, 
     NotFoundComponent,
     SidebarComponent,
     ModalUploadComponent
  ],
  exports: [
    BreadcrumbsComponent,
     HeaderComponent, 
     NotFoundComponent,
     SidebarComponent,
     ModalUploadComponent
  ]
})
export class SharedModule { }
