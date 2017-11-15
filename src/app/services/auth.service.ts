import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  user: User;

  constructor(private http: HttpClient) { }

  /*
  | Compueba en el servidor de autenticación si los datos de conexión entregados por el usuario son correctos.
  */
  login(username: string, password: string, remember: boolean): Promise<ConstrainBoolean> {
    return new Promise((resolve, reject) => {
      this.tokenRequest(username, password)
      .subscribe(data => {
        const registered = this.registerToken(data.access_token, data.expires_in, data.refresh_token, remember);
        if (!registered) {
          reject({
            messsage: 'No se pudo registrar la sesión del usuario'
          });
        }
        resolve(true);
      },
      err => {
        reject(err);
      });
    });
  }

  /*
  | Genera el request HTTP para obtener los token OAUTH con la estrategia de usuario y password.
  */
  private tokenRequest(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/oauth/token`, {
      'grant_type': 'password',
      'client_id': environment.apiClientId,
      'client_secret': environment.apiClientSecret,
      'username': username,
      'password': password,
      'scope': '*'
    });
  }

  /*
  | Registra el token y la expiración en el localStorage en caso de estar disponible.
  */
  public registerToken(token: string, seconds: number, remember_token: string, remember: boolean): boolean {
    // No se admite otro tipo de registro de autenticación.
    if (!window.localStorage) {
      return false;
    }

    let expiration = new Date();
    expiration = new Date(expiration.getTime() + seconds * 1000);

    window.localStorage.setItem('oat', JSON.stringify({
      't': token,
      'x': expiration.getTime(),
      'r': remember
    }));

    if (remember) {
      localStorage.setItem('oatr', remember_token);
    }

    return true;
  }

  public isLoggedIn(): boolean {
    if (!window.localStorage) {
      return false;
    }

    const storageData = window.localStorage.getItem('oat');

    if (storageData === null) {
      return false;
    }

    const loginData = JSON.parse(storageData);

    const expired = this.isExpired(loginData);
    if (expired) {
      return false;
    }

    return true;
  }

  /*
  | Comprueba si un token en el almacenamiento local ha caducado.
  */
  private isExpired(loginData): boolean {
    const now = (new Date()).getTime();
    if (now < loginData.x) {
      return false;
    }
    return true;
  }

  public getRefreshToken(): string {
    return localStorage.getItem('oatr');
  }

  /*
  | Obtiene la petición para realizar el refresh del token en el servidor.
  */
  public tokenRefreshRequest(refresh_token: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/oauth/token`, {
      'grant_type': 'refresh_token',
      'refresh_token': refresh_token,
      'client_id': environment.apiClientId,
      'client_secret': environment.apiClientSecret,
      'scope': '*'
    });
  }

  /*
  | Obtiene los datos del usuario conectado desde el servidor
  */
  public getUser(): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      if (this.user !== undefined) {
        resolve(this.user);
      }

      this.getUserRequest()
      .subscribe(data => {
        this.user = data;
        resolve(this.user);
      }, error => {
        reject(error);
      });
    });
  }

  private getUserRequest() {
    return this.http.get<User>(`${environment.apiUrl}/api/user`);
  }

  public getAuthorizationHeader() {
    if (!window.localStorage) {
      return '';
    }

    const token = JSON.parse(window.localStorage.getItem('oat'));
    return `Bearer ${token.t}`;
  }

  public clean() {
    window.localStorage.clear();
  }

}
