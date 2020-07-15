import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from "@angular/router";
import * as firebase from 'firebase/app';
import { SelectItem } from 'primeng/api';
import { ServicioService } from "../../services/servicio.service";

@Component({
  selector: 'app-registro-admin',
  templateUrl: './registro-admin.component.html',
  styleUrls: ['./registro-admin.component.css']
})
export class RegistroAdminComponent implements OnInit {

  nombre: string = "";
  apellido: string = "";
  tipo: string = "";
  email: string = "";
  password: string = "";
  displayModal: boolean = false;
  message: string = "";

  tiposUsuarios: SelectItem[];

  constructor(public auth: AngularFireAuth, private router: Router, private regService: ServicioService) { }

  ngOnInit(): void {
    this.tiposUsuarios = [
      {label:'Cliente', value: "cliente"},
      {label:'Especialista', value: "espec"},
      {label:'Recepcionista', value: "recep"}
    ]
  }

  public signup()
  {
    if(this.nombre !== "" && this.apellido !== "")
    {
      if(this.tipo !== "")
      {
        let usuario = "";
        
        this.auth.createUserWithEmailAndPassword(this.email, this.password)
        .then(data => {
          if(this.tipo === "cliente")
          {
            usuario = "cliente-" + this.nombre.toLowerCase() + "-" + this.apellido.toLowerCase();
          }
          else if(this.tipo === "recep")
          {
            usuario = "recep-" + this.nombre.toLowerCase() + "-" + this.apellido.toLowerCase();
          }
          else
          {
            usuario = "espec-" + this.nombre.toLowerCase() + "-" + this.apellido.toLowerCase();
            let name = this.nombre + " " + this.apellido;
            let data = {name};
            this.regService.crear("especialistas/", data);
          }
          var user = firebase.auth().currentUser;
          user.updateProfile({
            displayName: usuario
          });
          setTimeout(() => {
            this.router.navigateByUrl('/administrador');
          }, 2000);
        })
        .catch(e => {
          this.message = e.message;
          this.displayModal = true;
        });
      }
      else
      {
        this.message = "Tipo de usuario no especificado.";
        this.displayModal = true;
      }
    }
    else
    {
      this.message = "Nombre y/o apellido no especificados.";
      this.displayModal = true;
    }    
  }
}
