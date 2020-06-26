import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:User;
  imageUpload: File;
  imageTemp:any;
  loading_spinner:boolean = false;

  constructor( public _userService: UserService) { 
    this.user = _userService.user;
  }

  ngOnInit(): void {
  }

  save(user:User){
    this.loading_spinner = true;
    this.user.name = user.name;

    if(!this.user.google){
      this.user.email = user.email;
    }

    this._userService.updateUser(this.user).subscribe(
      resp => {
        setInterval(() => {
          this.loading_spinner = false;
        },1000);
      },
      err => {
         setInterval(() => {
          this.loading_spinner = false;
        },2000);
      });
  }

  selectImage(file:File){
      if(!file){
        this.imageUpload = null;
        return;
      }

      if(file.type.indexOf('image') < 0){
        Swal.fire('Sólo imagenes', 'El archivo seleccionado no es una imagen', 'error');
        this.imageUpload = null;
        return;
      }

      this.imageUpload = file;

      let reader = new FileReader();
      let urlImageTemp = reader.readAsDataURL(file);

      reader.onloadend = () =>  this.imageTemp = reader.result;
  }
  changeImage(){
    this._userService.changeImage(this.imageUpload,this.user._id);
  }
}
