import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import Utils from '../utils/Utils';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (Utils.getToken() == null && state.url !== '/login') {
      this.router.navigate(['login']);
      return false;
    }
    if (Utils.getToken() != null && state.url == '/login') {
      this.router.navigate(['/cargos']);
      return false;
    }
    return true;
  }
}
