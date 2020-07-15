import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from "@angular/router";
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  nombre: string = "";
  apellido: string = "";
  pathFoto: string = "";
  email: string = "";
  password: string = "";
  displayModal: boolean = false;
  message: string = "";
  foto: any;

  constructor(public auth: AngularFireAuth, private router: Router, private storage : AngularFireStorage) { }

  ngOnInit(): void {
  }

  public signup()
  {
    if(this.nombre !== "" && this.apellido !== "")
    {
      let usuario = "cliente-" + this.nombre.toLowerCase() + "-" + this.apellido.toLowerCase();
      this.pathFoto = this.nombre + "-" + this.apellido;
      this.pathFoto = this.pathFoto.toLowerCase();

      this.auth.createUserWithEmailAndPassword(this.email, this.password)
      .then(data => {
        var user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: usuario
        });
        try{
          this.storage.upload(this.pathFoto, this.foto);
          user.updateProfile({
            photoURL: this.pathFoto
          });
          setTimeout(() => {
            this.router.navigateByUrl('/login');
          }, 2000);
        }
        catch(e){
          user.delete();
          this.message = "Foto no especificada.";
          this.displayModal = true;
        }
      })
      .catch(e => {
        this.message = e.message;
        this.displayModal = true;
      });
    }
    else
    {
      this.message = "Nombre y/o apellido no especificados.";
      this.displayModal = true;
    }    
  }

  uploadFile(event) {
    this.foto = event.target.files[0];
  }
}
