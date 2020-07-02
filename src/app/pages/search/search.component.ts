import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { User } from 'src/app/models/user.model';
import { Doctor } from 'src/app/models/doctors.model';
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  users:User[] = [];
  doctors:Doctor[]=[];
  hospitals:Hospital[]=[];

  query:string = '';


  constructor(public activatedRoute:ActivatedRoute,
    public http:HttpClient) { 
    this.activatedRoute.params.subscribe(params => {
      console.log("parametros",params);
      let termino = params['termino']
      console.log("termino",termino);

      this.search(termino);
    })
  }

  ngOnInit(): void {
  }

  search(query:string){
    let url = URL_SERVICES + '/search/all/' + query;

    this.query = query;
    this.http.get(url)
      .subscribe((resp:any) => {
        console.log("resp search all",resp);
        this.hospitals = resp.hospitals;
        this.doctors = resp.doctors;
        this.users = resp.users;
      })
  }
}
