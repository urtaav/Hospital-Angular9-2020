import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';
import { LoginGuardGuard } from './services/guards/login-guard.guard';

const appRoutes:Routes = [

    { path:'login', component: LoginComponent },
    { path:'register', component: RegisterComponent },
    {
        path:'',
        component:PagesComponent,
        canActivate:[LoginGuardGuard],
        // loadChildren:'./pages/pages.module#PagesModule'
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
    },
    { path:'**', component:NotFoundComponent },
];

//importar rutas por medio de un modulo
export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true })