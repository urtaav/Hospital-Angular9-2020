import { NgModule } from '@angular/core';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [
     BreadcrumbsComponent,
     HeaderComponent, 
     NotFoundComponent,
     SidebarComponent
  ],
  exports: [
    BreadcrumbsComponent,
     HeaderComponent, 
     NotFoundComponent,
     SidebarComponent
  ]
})
export class SharedModule { }
