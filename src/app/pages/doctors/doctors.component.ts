import { Component, OnInit } from '@angular/core';
import { DoctorsService } from '../../services/service.index';
import { Doctor } from 'src/app/models/doctors.model';

import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  doctors:Doctor[] = [];
  totalRecords:number = 0;
  loading = false;
  desde: number = 0;

  constructor(public _doctorService:DoctorsService) { }

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(){
    this._doctorService.loadDoctors(this.desde)
      .subscribe((resp:any) =>{
        console.log("cargar doctors",resp);
        
         this.doctors = resp.doctors;
         this.totalRecords = resp.total;
      })
  }

  changeDesde(numPage:number){

    console.log("page",numPage);
    
    let desde = this.desde + numPage;
    if(desde >= this.totalRecords){
      return;
    }
    if(desde < 0){
      return;
    }

    this.desde += numPage;
    this.loadDoctors();
  }

  searchDoctors(query:string){

    if(query.length <= 0){
      this.loadDoctors();
      return;
    }
    this.loading = true;
    this._doctorService.searchDoctors(query)
      .subscribe((doctors:Doctor[] ) => {
        this.doctors = doctors;
        this.loading = false;
      });
  }

  deleteDoctor(doctor:Doctor){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Esta seguro?',
      text: 'Esta apunto de eliminar a el doctor ' + doctor.name,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {

      if (result.value) {

        this._doctorService.deleteDoctor(doctor._id)
          .subscribe( (resp:any) =>{

            swalWithBootstrapButtons.fire(
              'Eliminado!',
              'Doctor  eliminado correctamente',
              'success'
            )
            this.desde = 0;
            this.loadDoctors();
          });

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          ':|',
          'error'
        )
      }
    })
  }


}
