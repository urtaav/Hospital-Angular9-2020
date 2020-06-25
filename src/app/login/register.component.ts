import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import * as swal from 'sweetalert';
import Swal from 'sweetalert2';

import { UserService } from '../services/service.index';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister:FormGroup;

  constructor(public _userService: UserService,public router:Router) { }

  isEquals(field1:string,field2:string){

    return (group:FormGroup) => {

      let password1 = group.controls[field1].value;
      let password2 = group.controls[field2].value;

      if(password1 === password2){
        return null;
      }
      return {
        isEquals:true
      }
    }
  }

  ngOnInit(): void {
    init_plugins();

    this.formRegister = new FormGroup({
      name:new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required,Validators.email]),
      password:new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    },{ validators:this.isEquals('password','password2')});

    this.formRegister.setValue({
      name:"uriel",
      email: "test@test.com",
      password:'12345',
      password2: '12345',
      condiciones: true
    });
  }

  registerUser(){

    if(this.formRegister.invalid){
      return;
    }
    if(!this.formRegister.value.condiciones){
      console.log('Debe de aceptar los terminos y condiciones');
      // swal("", "Debe de aceptar los terminos y condiciones", "warning");
      Swal.fire('Oops...', 'Debe de aceptar los terminos y condiciones', 'warning');
      return;
    }

    let user = new User(
      this.formRegister.value.name,
      this.formRegister.value.email,
      this.formRegister.value.password
    );

    this._userService.createUser(user)
      .subscribe( resp =>  this.router.navigate(['/login']));
  }
}
