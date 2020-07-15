import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './pages/error/error.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { RecepcionistaComponent } from './pages/recepcionista/recepcionista.component';
import { EspecialistaComponent } from './pages/especialista/especialista.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { RegistroAdminComponent } from './pages/registro-admin/registro-admin.component';
import { ReadmeComponent } from './pages/readme/readme.component';
import { TurnosComponent } from './pages/turnos/turnos.component';
import { AuthLoginGuard } from './guards/auth-login.guard';
import { AuthAdminGuard } from './guards/auth-admin.guard';
import { AuthClienteGuard } from './guards/auth-cliente.guard';
import { AuthEspecGuard } from './guards/auth-espec.guard';
import { AuthRecepGuard } from './guards/auth-recep.guard';


const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'cliente', component: ClienteComponent, canActivate: [AuthClienteGuard]
  },
  {
    path: 'turnos', component: TurnosComponent, canActivate: [AuthClienteGuard]
  },
  {
    path: 'recepcionista', component: RecepcionistaComponent, canActivate: [AuthRecepGuard]
  },
  {
    path: 'especialista', component: EspecialistaComponent, canActivate: [AuthEspecGuard]
  },
  {
    path: 'administrador', component: AdminComponent, canActivate: [AuthAdminGuard]
  },
  {
    path: 'registroAdmin', component: RegistroAdminComponent, canActivate: [AuthAdminGuard]
  },
  {
    path: 'login', component: LoginComponent, canActivate: [AuthLoginGuard]
  },
  {
    path: 'registro', component: RegistroComponent, canActivate: [AuthLoginGuard]
  },
  {
    path: 'readme', component: ReadmeComponent
  },
  {
    path: '**', component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
