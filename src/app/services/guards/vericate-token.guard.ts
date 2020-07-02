import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class VericateTokenGuard implements CanActivate {

  constructor(public _userService:UserService,public router:Router){ }

  canActivate():Promise<boolean> | boolean {
    
    console.log('Token guard');

    let token = this._userService.token;
    let payload = JSON.parse(atob(token.split('.')[1]));

    let expirado = this.expirado(payload.exp);

    if(expirado){
      this.router.navigate(['/login'])
      return false;
    }
    
    console.log("payloadd",payload);
    
    return this.varificaRenueva(payload.exp);
  }
  
  varificaRenueva(fechaExp:number): Promise<boolean> {

    return new Promise((resolve,reject)=>{

      let tokenExp = new Date(fechaExp * 1000);
      let ahora = new Date();

      ahora.setTime(ahora.getTime() + ( 4 * 60 * 60 * 100));//actualizar token cada 4 horas

      console.log( tokenExp );
      console.log( ahora );


      if(tokenExp.getTime() > ahora.getTime()){
        resolve(true);
      }else{

        this._userService.renovarToken()
          .subscribe(() => {
            resolve(true);
          },()=>{
            this.router.navigate(['/login'])
            reject(false);
          })
      }
    });
  }

  expirado(fechaExp:number){
    let ahora = new Date().getTime() / 1000;

    if(fechaExp < ahora){
      return true;
    }else{
      return false;
    }
  }
}
