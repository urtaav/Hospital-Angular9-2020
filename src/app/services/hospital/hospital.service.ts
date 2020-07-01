import { Injectable } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { URL_SERVICES } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  hospital: Hospital;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _userService: UserService
  ) {}

  loadHospitals(desde: number = 0) {
    console.log('load Hospitals');
    let url = URL_SERVICES + '/hospital?desde=' + desde;
    return this.http.get(url);
  }
  
  getHospitalById(id: string) {
    let url = URL_SERVICES + '/hospital/' + id;
    return this.http.get(url);
  }

  createHospital(name: string) {
    let url = URL_SERVICES + '/hospital/';

    url += '?token=' + this._userService.token;
    return this.http.post(url, { name }).pipe(
      map((resp: any) => {
        return resp.hospital;
      })
    );
  }

  updateHospital(hospital: Hospital) {
    let url = URL_SERVICES + '/hospital/' + hospital._id;
    url += '?token=' + this._userService.token;
    return this.http.put(url,hospital).pipe(
      map( (resp:any) => {
        Swal.fire('Hospital actualizado', hospital.name ,'success');
        return resp.hospital;
      })
    )
  }

  deleteHospital(id: string) {
    let url = URL_SERVICES + '/hospital/' + id;
    url += '?token=' + this._userService.token;
    return this.http.delete(url);
  }

  searchHospital(query: string) {
    let url = URL_SERVICES + '/search/collection/hospitals/' + query;
    return this.http.get(url).pipe(map((resp: any) => resp.hospitals));
  }
}
