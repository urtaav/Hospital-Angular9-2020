import { Component, OnInit } from '@angular/core';
import { SidebarService,UserService } from '../../services/service.index';
import { User } from '../../models/user.model';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user:User;

  constructor(public sidebarService:SidebarService,public _userService:UserService) { }

  ngOnInit(): void {
    this.user = this._userService.user;
    this.sidebarService.loadMenu();
  }

}
