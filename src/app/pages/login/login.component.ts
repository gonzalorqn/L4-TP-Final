import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";
  displayModal: boolean = false;
  message: string = "";

  constructor(public auth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  public login()
  {
    this.auth.signInWithEmailAndPassword(this.email, this.password)
    .then((data) => {
      data.user.getIdToken()
      .then(d => {
        localStorage.setItem('token', d);
      });
      window.location.reload();
    })
    .catch(e => {
      this.message = e.message;
      this.displayModal = true;
    });
  }
}
