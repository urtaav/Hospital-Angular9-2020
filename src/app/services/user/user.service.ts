import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { URL_SERVICES } from 'src/app/config/config';
// import 'rxjs/add/operator/map';
import { map,catchError } from 'rxjs/operators';
import { throwError, Observable, of } from 'rxjs';

// import * as swal from 'sweetalert';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UploadFileService } from '../upload-file/upload-file.service';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user:User;
  token:string;
  menu: any =[];

  constructor(public http:HttpClient,public router:Router,public _uploadFileService: UploadFileService,public _settingsService:SettingsService) { 
    this.loadStorage();
  }

  renovarToken(){

    let url = URL_SERVICES + '/login/renovarToken';
    url += '?token=' + this.token;

    return this.http.get(url)
      .pipe(
        map((resp:any) => {
          this.token = resp.token;
          localStorage.setItem('token',this.token);
          console.log("token renovado");
          
          return true;
        }),
        catchError(err => {
          console.error('HTTP ERROR: ', err);
          this.router.navigate(['/login']);
          Swal.fire('No se pudo renovar token', 'No fue posible renovar el token', 'error');
          return throwError(err);
        })
      )
  }

  isLogueado(){
    return (this.token.length > 5) ? true:false;
  }

  loadStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
      this.menu = JSON.parse(localStorage.getItem('menu'));

    }else{
      this.token = '';
      this.user = null;
      this.menu = [];
    }
  }
  
  saveInfoUserStorage(id:string,token:string,user:User,menu:any){
    localStorage.setItem('id',id);
    localStorage.setItem('token',token);
    localStorage.setItem('user',JSON.stringify(user));
    localStorage.setItem('menu',JSON.stringify(menu))

    this.user = user;
    this.token = token;
    this.menu = menu;

  }

  logOut(){
    this.user = null;
    this.token = '';
    this.menu =[];

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }
  loginWithGoogle(token:string){

    let url = URL_SERVICES+'/login/google';

    return this.http.post(url, { token })
    .pipe(
      map((resp:any) =>{
        this.saveInfoUserStorage(resp.id,resp.token,resp.user,resp.menu);
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
      map( (resp:any) => { this.saveInfoUserStorage(resp.id,resp.token,resp.user,resp.menu);
        return true;
      }),

      catchError(err => {
        console.error('HTTP ERROR: ', err);
        return throwError(err);
      })
    )
  }



  createUser(user:User){
    
    let url = URL_SERVICES + '/user';

    return this.http.post(url, user)
    .pipe(
      map((resp:any) => {
        // swal("Usuario creado", user.email, "success");
        Swal.fire('Usuario creado', user.email, 'success');
        return resp.user;
      }),
      catchError(err => {
        console.error('HTTP ERROR: ', err);
        return throwError(err);
      })
    )
  }

  updateUser(user:User){

    let url = URL_SERVICES + '/user/' + user._id;
    url += '?token=' + this.token;

    return this.http.put(url, user).pipe(
      map( (resp: any) => {

        if(user._id === this.user._id){

          this.saveInfoUserStorage(resp.user._id,this.token,resp.user,this.menu);
        }
        Swal.fire('Usuario actualizado', user.name, 'success');
        return true;
      })
    )
  }

  changeImage(file:File,id:string){
    
    this._uploadFileService.uploadFile(file,'users',id)
      .then( (resp:any) =>{
        this.user.img = resp.user.img;
        
        Swal.fire('Imagen cambiada', this.user.name, 'success');
        this.saveInfoUserStorage(id,this.token,this.user,this.menu);
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

  // private handleError(error: HttpErrorResponse) {
  //   // if (error.error instanceof ErrorEvent) {
  //   //   // A client-side or network error occurred. Handle it accordingly.
  //   //   console.error('An error occurred:', error.error.message);
  //   // } else {
  //   //   // The backend returned an unsuccessful response code.
  //   //   // The response body may contain clues as to what went wrong,
  //   //   console.error(  `Backend returned code ${error.status}, `);
  //   //   console.error( `body was:`,error.error);
      
  //   // }
  //   // // return an observable with a user-facing error message
  //   return throwError(error);
  // };

  // private handleError<T> (operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  
  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead
  
  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }

}
