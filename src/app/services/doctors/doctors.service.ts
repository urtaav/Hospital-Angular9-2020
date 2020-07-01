import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { Doctor } from 'src/app/models/doctors.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class DoctorsService {
  constructor(public http: HttpClient, public _userService: UserService) {}

  loadDoctors(desde:number = 0) {
    let url = URL_SERVICES + '/doctor?desde=' + desde;
    return this.http.get(url);
  }

  loadDoctor(id:string){
    let url = URL_SERVICES + '/doctor/' + id;
    return this.http.get(url).pipe(map((resp: any) => resp.doctor));
  }
  searchDoctors(query: string) {
    let url = URL_SERVICES + '/search/collection/doctors/' + query;
    return this.http.get(url).pipe(map((resp: any) => resp.doctors));
  }

  deleteDoctor(id: String) {
    let url = URL_SERVICES + '/doctor/' + id;
    url += '?token=' + this._userService.token;

    return this.http.delete(url);
  }

  saveDoctor(doctor:Doctor){

    let url = URL_SERVICES + '/doctor';

    if(doctor._id){
      //update
      url += '/' + doctor._id;
      url += '?token=' + this._userService.token;

      return this.http.put(url,doctor)    
      .pipe(
        map((resp:any) => {
          console.log("doctor actualizado",resp);
          Swal.fire('Usuario actualizado', resp.doctor.name, 'success');
          return resp;
        }) 
      )
    }else{
      //create
    url += '?token=' + this._userService.token;

    return this.http.post(url, doctor)
    .pipe(
      map((resp:any) => {
        console.log("doctor creado",resp);
        
        Swal.fire('Usuario creado', resp.doctor.name, 'success');
        return resp;
      }) 
    )

    }
  }
}
