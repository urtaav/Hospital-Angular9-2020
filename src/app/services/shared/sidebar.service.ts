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

      ]
    }
  ]
  constructor() { }
}
