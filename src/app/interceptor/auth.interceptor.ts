import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';

import { AuthService } from '../services/auth.service';
import { HttpEventType } from '@angular/common/http/src/response';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    auth: AuthService;

    constructor(private injector: Injector,
                private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.auth = this.injector.get(AuthService);
        if (this.auth.isLoggedIn()) {
            const authHeader = this.auth.getAuthorizationHeader();
            const authReq = req.clone({setHeaders: {Authorization: authHeader}});
            return next.handle(authReq);
        }
        return next.handle(req)
        .catch(err => {
            if ((err.status === 401 || err.status === 403) && err.error.error !== 'invalid_request') {
                return this.auth.tokenRefreshRequest(this.auth.getRefreshToken()).mergeMap(data => {
                    const registered = this.auth.registerToken(data.access_token, data.expires_in, data.refresh_token, true);
                    if (!registered) {
                        return Observable.throw(err);
                    }
                    const authHeader = this.auth.getAuthorizationHeader();
                    const authReq = req.clone({setHeaders: {Authorization: authHeader}});
                    return next.handle(authReq);
                });
            }else {
                this.auth.clean();
                this.router.navigate(['/login']);
                return Observable.throw(err);
            }
        });
    }
}
