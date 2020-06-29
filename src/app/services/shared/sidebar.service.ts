import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      title:'Principal',
      icon:'mdi mdi-gauge',
      subMenu:[
        { title: 'Dashboard', url:'/dashboard' },
        { title: 'ProgressBar', url:'/progress' },
        { title: 'Graficas', url:'/graficas1' },
        { title: 'Promesas', url:'/promesas' },
        { title: 'Observables', url:'/observables' }
      ]
    },
    {
      title:'Maintenances',
      icon:'mdi mdi-folder-lock-open',
      subMenu:[
        { title: 'Users', url:'/users' },
        { title: 'Hospitals', url:'/hospitals' },
        { title: 'Doctors', url:'/doctors' },
      ]
    }
  ]
  constructor() { }
}
