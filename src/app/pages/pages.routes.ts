import { RouterModule, Routes } from "@angular/router";

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorComponent } from './doctors/doctor/doctor.component';

const pagesRoutes : Routes = [
    { 
        path:'', 
        component: PagesComponent,
        canActivate:[ LoginGuardGuard],
        children: [
            { path:'dashboard', component: DashboardComponent, data:{ title:'Dashboard'} },
            { path:'progress', component: ProgressComponent, data:{ title:'Progress'}  },
            { path:'graficas1', component: Graficas1Component, data:{ title:'Graficas'}  },
            { path:'account-settings', component: AccountSettingsComponent, data:{ title:'Ajustes cuenta'}  },
            { path:'profile', component: ProfileComponent, data:{ title:'Perfil de usuario'}  },
            
            //Mantenimientos
            { path:'users', component: UsersComponent, data:{ title:'Mantenimiento de usuarios'}  },
            { path:'hospitals', component: HospitalsComponent, data:{ title:'Mantenimiento de hospitales'}  },
            { path:'doctors', component: DoctorsComponent, data:{ title:'Mantenimiento de doctores'}  },
            { path:'doctor/:id', component: DoctorComponent, data:{ title:'Actualizar medico'}  },
            { path:'promesas', component: PromesasComponent, data:{ title:'Promesas'}  },
            { path:'observables', component: RxjsComponent, data:{ title:'Observables'}  },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
];
//RUTAS HIJAS
export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes);