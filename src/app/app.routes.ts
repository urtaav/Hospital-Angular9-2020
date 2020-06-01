import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { RegisterComponent } from './login/register.component';

const appRoutes:Routes = [

    { path:'login', component: LoginComponent },
    { path:'register', component: RegisterComponent },
    { path:'**', component:NotFoundComponent },
]

//importar rutas por medio de un modulo
export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true })