import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css'],
})
export class HospitalsComponent implements OnInit {
  hospitals: Hospital[] = [];
  desde: number = 0;
  totalRecords: number = 0;
  loading: boolean = true;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit(): void {
    this.loadHospitals();
    this._modalUploadService.notification.subscribe( () => this.loadHospitals());
  }

  loadHospitals() { 

    this.loading = true;

    this._hospitalService.loadHospitals(this.desde)
      .subscribe((resp: any) => {
        console.log("load",resp);
        
        this.totalRecords = resp.total;
        this.hospitals = resp.hospitals;
        this.loading = false;
    });
  }
  changeDesde(numPage: number) {
    let desde = this.desde + numPage;
    if (desde >= this.totalRecords) {
      return;
    }
    if (desde < 0) {
      return;
    }

    this.desde += numPage;
    this.loadHospitals();
  }

  searchHospital(query: string) { 

    if (query.length <= 0) {
      this.loadHospitals();
      return;
    }
    this.loading = true;
    this._hospitalService
      .searchHospital(query)
      .subscribe((hospitals: Hospital[]) => {
        this.hospitals = hospitals;
        this.loading = false;
      });
  }
  saveHospital(hospital: Hospital) {

    this._hospitalService.updateHospital(hospital)
      .subscribe();
  }

  deleteHospital(hospital: Hospital) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Esta seguro?',
      text: 'Esta apunto de eliminar a el hospital ' + hospital.name,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {

      if (result.value) {

        this._hospitalService
      .deleteHospital(hospital._id)
      .subscribe((resp: any) => {
        swalWithBootstrapButtons.fire(
          'Eliminado!',
          'Hospital  eliminado correctamente',
          'success'
        )
        this.desde = 0;
        this.loadHospitals();
      });

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          ':(',
          'error'
        )
      }
    })
  }

  createHospital(){
    Swal.fire({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      input: 'text',
      icon: 'info',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Crear',
      showLoaderOnConfirm: true,
      preConfirm: (value) => {
        console.log("value recived",value);
        
        return this._hospitalService.createHospital(value)
        .subscribe(() => this.loadHospitals());

      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((resp) => {
      console.log("result",resp);
      
      if (resp.value) {
        Swal.fire('Hospital creado', '' , 'success');
      }
    })
  }

  updateImage(hospital:Hospital){
    this._modalUploadService.showModal('hospitals',hospital._id);
  }
}
