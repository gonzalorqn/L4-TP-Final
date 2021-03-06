import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthLoginGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      try {
        const token = localStorage.getItem('token');
        const helper = new JwtHelperService();
        const payload = helper.decodeToken(token);
        
        if(payload.name !== undefined)
        {
          this.router.navigateByUrl("/");

          return false;
        }
        else
        {
          return true;
        }
      }
      catch (error) {
        return true;
      }
  }  
}
