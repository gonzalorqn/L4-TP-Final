import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthRecepGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      try {
        const token = localStorage.getItem('token');
        const helper = new JwtHelperService();
        const payload = helper.decodeToken(token);
        let name: string = payload.name;
        let array = name.split("-");

        if(array[0] === "recep")
        {
          return true
        }
        else
        {
          this.router.navigateByUrl("/");
          return false;
        }
      }
      catch (error) {
        this.router.navigateByUrl("/login");
        return false;
      }
  }  
}
