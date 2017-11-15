import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
    const logged = this.auth.isLoggedIn();
    if (logged) {
    return true;
    }

    const refresh_token = this.auth.getRefreshToken();

    if (refresh_token === null) {
      return this.loginRedirect();
    }

    return new Promise((resolve, reject) => {
      try {
        this.auth.tokenRefreshRequest(refresh_token).subscribe(data => {
          const registered = this.auth.registerToken(data.access_token, data.expires_in, data.refresh_token, true);
          if (!registered) {
            resolve(this.loginRedirect());
          }
          resolve(true);
        });
      } catch (error) {
        resolve(this.loginRedirect());
      }
      resolve(this.loginRedirect());
    });
  }

  private loginRedirect(): boolean {
    this.router.navigate(['/login']);
    return false;
  }

}
