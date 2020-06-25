import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { User } from '../models/user.model';
import { element } from 'protractor';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  rememberMe:boolean = false;
  loading_spinner:boolean =false;
  auth2:any;

  constructor(public router: Router,public _userService:UserService) { }

  ngOnInit(): void {
    init_plugins();  //iniciar librerias templete app 
    this.googleInit();
    this.email = localStorage.getItem('email') || '';

    if(this.email.length > 1){
      this.rememberMe = true;
    }
  }

  googleInit(){
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id:'244343582950-5q393aa6njfjlua26085p7pibla9to3d.apps.googleusercontent.com',
        cookiepolicy:'single_host_origin',
        scope:'profile email'
      });
      this.attachSignIn(document.getElementById('btnLoginGoogle'));
    })
  }

  attachSignIn(element){
    this.auth2.attachClickHandler( element,{}, ( googleUser) =>{
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;

      this._userService.loginWithGoogle(token)
        .subscribe(resp => window.location.href ='#/dashboard');
    });
  }
  //Login function
  login(loginForm:NgForm){

    if(loginForm.invalid){
      return;
    }

    this.loading_spinner = true;
    let user = new User(null,loginForm.value.email,loginForm.value.password);

    this._userService.login(user,loginForm.value.rememberMe)
      .subscribe( 
      success => this.router.navigate(['/dashboard']),
      err => {
        console.log("error",err);
         setInterval(() => {
          this.loading_spinner = false;
        },2000);
      });
  }
}
