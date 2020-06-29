import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http'
import { URL_SERVICES } from 'src/app/config/config';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
// import * as swal from 'sweetalert';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UploadFileService } from '../upload-file/upload-file.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user:User;
  token:string;

  constructor(public http:HttpClient,public router:Router,public _uploadFileService: UploadFileService) { 
    this.loadStorage();
  }

  isLogueado(){
    return (this.token.length > 5)? true:false;
  }

  loadStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
    }else{
      this.token ='';
      this.user = null;
    }
  }
  
  saveInfoUserStorage(id:string,token:string,user:User){
    localStorage.setItem('id',id);
    localStorage.setItem('token',token);
    localStorage.setItem('user',JSON.stringify(user));

    this.user = user;
    this.token = token;

  }

  logOut(){
    this.user = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.router.navigate(['/login']);
  }
  loginWithGoogle(token:string){

    let url = URL_SERVICES+'/login/google';

    return this.http.post(url, { token })
    .pipe(
      map((resp:any) =>{
        this.saveInfoUserStorage(resp.id,resp.token,resp.user);
        return true;
      })
    )
  }

  login(user:User,rememberMe:boolean = false){

    if(rememberMe){
      localStorage.setItem('email',user.email);
    }else{
      localStorage.removeItem('email');
    }

    let url = URL_SERVICES + '/login';
    return this.http.post(url,user)
    .pipe(
      map( (resp:any) => {
        this.saveInfoUserStorage(resp.id,resp.token,resp.user);
        return true;
      })
    )
  }

  createUser(user:User){
    
    let url = URL_SERVICES + '/user';

    return this.http.post(url, user).pipe(
      map((resp:any) => {
        // swal("Usuario creado", user.email, "success");
        Swal.fire('Usuario creado', user.email, 'success');
        return resp.user;
      }) 
    )
  }

  updateUser(user:User){

    let url = URL_SERVICES + '/user/' + user._id;
    url += '?token=' + this.token;

    return this.http.put(url, user).pipe(
      map( (resp: any) => {

        if(user._id === this.user._id){

          this.saveInfoUserStorage(resp.user._id,this.token,resp.user);
        }
        Swal.fire('Usuario actualizado', user.name, 'success');
        return true;
      })
    )
  }

  changeImage(file:File,id:string){
    
    this._uploadFileService.uploadFile(file,'users',id)
      .then( (resp:any) =>{
        console.log("resp changeImage",resp);
        this.user.img = resp.user.img;
        console.log("changeImage",this.user.img);
        
        Swal.fire('Imagen cambiada', this.user.name, 'success');
        this.saveInfoUserStorage(id,this.token,this.user);
      })
      .catch( resp=>{
        console.log("error",resp);
      })
  }

  loadUsers(desde:number = 0){

    let url = URL_SERVICES + '/user?desde=' + desde;
    return this.http.get(url);
  }

  searchUsers(query:string){
    let url = URL_SERVICES + '/search/collection/users/' + query;
    return this.http.get(url).pipe(
      map( (resp:any) => resp.users)
    )
  }

  deleteUser(id:string){
    let url = URL_SERVICES + '/user/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url);
  }
}
