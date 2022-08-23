import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  admindata: any = null
  employeedata: any = null

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.admindata = sessionStorage.getItem('admindata');
    this.employeedata = sessionStorage.getItem('employeedata');

    if (this.admindata != null || this.employeedata != null)
      return true;
    else
      this.router.navigate(['/']);
    return false;
  }

}
