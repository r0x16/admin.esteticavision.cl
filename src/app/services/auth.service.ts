import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

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
        this.user = {
          email: username,
          tokens: data
        };
        this.registerToken(data.access_token, data.expires_in, data.refresh_token, remember, reject);
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
  private registerToken(token: string, seconds: number, remember_token: string, remember: boolean, reject) {
    // No se admite otro tipo de registro de autenticación.
    if (!window.localStorage) {
      reject({
        message: 'No se pudo registrar la sesión del usuario'
      });
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
  }

  public isLoggedIn(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (!window.localStorage) {
        reject({
          'message': 'No se puede acceder a datos de sesión'
        });
      }

      const storageData = window.localStorage.getItem('oat');

      if (storageData === null) {
        resolve(false);
      }

      const loginData = JSON.parse(storageData);

      const expired = this.isExpired(loginData);
      if (!expired) {
        resolve(true);
      }

      if (!loginData.r) {
        resolve(false);
      }

      this.refreshToken(loginData, resolve, reject);

    });
  }

  private isExpired(loginData): boolean {
    const now = (new Date()).getTime();
    if (now < loginData.x) {
      return true;
    }
    return false;
  }

  private refreshToken(loginData, resolve, reject) {
    const refresh_token = localStorage.getItem('oatr');
    if (refresh_token === null) {
      resolve(false);
    }

    this.tokenRefreshRequest(refresh_token)
    .subscribe(data => {
      this.user.tokens = data;
      this.registerToken(data.access_token, data.expires_in, data.refresh_token, true, reject);
      resolve(true);
    }, error => {
      resolve(false);
    });
  }

  private tokenRefreshRequest(refresh_token: string) {
    return this.http.post<any>(`${environment.apiUrl}/oauth/token`, {
      'grant_type': 'refresh_token',
      'refresh_token': refresh_token,
      'client_id': environment.apiClientId,
      'client_secret': environment.apiClientSecret,
      'scope': '*'
    });
  }

}
