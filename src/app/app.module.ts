import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { DialogModule } from 'primeng/dialog';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { ErrorComponent } from './pages/error/error.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { RecepcionistaComponent } from './pages/recepcionista/recepcionista.component';
import { EspecialistaComponent } from './pages/especialista/especialista.component';
import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { RegistroAdminComponent } from './pages/registro-admin/registro-admin.component';
import { ReadmeComponent } from './pages/readme/readme.component';
import { TurnosComponent } from './pages/turnos/turnos.component';

import { AngularFireAuth } from '@angular/fire/auth';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ErrorComponent,
    ClienteComponent,
    RecepcionistaComponent,
    EspecialistaComponent,
    AdminComponent,
    HomeComponent,
    LoginComponent,
    RegistroComponent,
    RegistroAdminComponent,
    ReadmeComponent,
    TurnosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    InputTextModule,
    MenubarModule,
    ButtonModule,
    PasswordModule,
    DialogModule,
    AngularFireModule.initializeApp(environment.firebase),
    DropdownModule,
    CardModule,
    CalendarModule,
    TableModule,
    RatingModule,
    InputTextareaModule
  ],
  providers: [
    AngularFireAuth
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
