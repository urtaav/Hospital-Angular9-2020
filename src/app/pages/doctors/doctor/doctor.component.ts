import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { DoctorsService,HospitalService} from '../../../services/service.index';
import { Doctor } from 'src/app/models/doctors.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  hospitals:Hospital[]=[]; 
  doctor:Doctor = new Doctor('','','','');//Aqui se inicializa el objeto para que en el select haga match automaticamente veremos el valor --seleccione--
  hospital: Hospital = new Hospital('');

  constructor(
    public _doctorService:DoctorsService,
    public _hospitalService:HospitalService,
    public router:Router,
    public activatedRoute:ActivatedRoute,
    public _modalUploadService:ModalUploadService) { 
      activatedRoute.params.subscribe(params => {

        let id = params['id'];//obtenemos el id que viene en la ruta y se llama id por que en las rutas lo pusimos con ese nombre
        if(id !== 'new'){
          this.loadDoctor(id);
        }
      })
    }

  ngOnInit(): void {

    this._hospitalService.loadHospitals()
      .subscribe((resp:any) =>{
        this.hospitals = resp.hospitals;
      });

      this._modalUploadService.notification.subscribe( resp => {
        console.log("Resp notification",resp);
        this.doctor.img = resp.doctor.img;
        
      })
  }

  loadDoctor(id:string){

    this._doctorService.loadDoctor(id)
      .subscribe( doctor => {
        this.doctor = doctor;
        this.doctor.hospital = doctor.hospital._id;
        this.changeHospital(this.doctor.hospital);
      });
  }

  saveDoctor(f: NgForm){
    console.log("save",f.value);
    console.log("save",f.valid);
    if(f.invalid){
      return;
    }
    this._doctorService.saveDoctor(this.doctor)
      .subscribe( resp => {

        this.doctor._id = resp.doctor._id;
        this.router.navigate(['/doctor',this.doctor._id]);
      })
  }

  changeHospital(id:string){
    console.log("event",id);

    this._hospitalService.getHospitalById(id)
      .subscribe((resp:any) => {
        console.log("resp",resp);
        this.hospital = resp.hospital;
      });
  }
  changeImage(){
    this._modalUploadService.showModal('doctors',this.doctor._id);
  }
}
