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
            { path:'promesas', component: PromesasComponent, data:{ title:'Promesas'}  },
            { path:'observables', component: RxjsComponent, data:{ title:'Observables'}  },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
];
//RUTAS HIJAS
export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes);