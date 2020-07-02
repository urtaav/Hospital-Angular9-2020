import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//ROUTES
import { APP_ROUTES } from './app.routes';

//Modulos

//temporal
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Services
import { ServiceModule } from './services/service.module';



//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    RegisterComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
