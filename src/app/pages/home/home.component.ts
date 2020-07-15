import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public entrar()
  {
    try {
      const token = localStorage.getItem('token');
      const helper = new JwtHelperService();
      const payload = helper.decodeToken(token);
      let name: string = payload.name;
      let array = name.split("-");

      if(array[0] === "cliente")
      {
        this.router.navigateByUrl("/cliente");
      }
      else if(array[0] === "recep")
      {
        this.router.navigateByUrl("/recepcionista");
      }
      else if(array[0] === "admin")
      {
        this.router.navigateByUrl("/administrador");
      }
      else if(array[0] === "espec")
      {
        this.router.navigateByUrl("/especialista");
      }
      else
      {
        this.router.navigateByUrl("/error");
      }
    }
    catch (error) {
      this.router.navigateByUrl("/login");
    }
  }
}
