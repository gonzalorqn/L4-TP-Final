import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  user: string;
  label: string;
  icon: string;
  class: string;
  routerLink: string;

  constructor() { }

  ngOnInit(): void {
    localStorage.setItem('token', null);
    try {
      const token = localStorage.getItem('token');
      const helper = new JwtHelperService();
      const payload = helper.decodeToken(token);
      this.label = "Salir";
      this.icon = "pi pi-power-off";
      this.class = "ui-menuitem ui-button-danger";
      let name: string = payload.name;
      let array = name.split("-");
      this.user = array[1] + " " + array[2];
      this.routerLink = "/"
    }
    catch (error) {
      this.user = "not logged in";
      this.label = "Entrar";
      this.icon = "pi pi-sign-in";
      this.class = "ui-menuitem ui-button-success";
      this.routerLink = "/login";
    }
  }

  public log()
  {
    if(this.label === "Salir")
    {
      localStorage.setItem('token', null);
      this.user = "not logged in";
      this.label = "Entrar";
      this.icon = "pi pi-sign-in";
      this.class = "ui-menuitem ui-button-success";
      this.routerLink = "/login";
    }
  }
}
