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
          'email': username,
          'tokens': data,
          'data': null
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

  /*
  | Refresca el token desde el servidor
  */
  public refreshToken(loginData): Promise<any> {
    return new Promise((resolve, reject) => {
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

    });
  }

  /*
  | Obtiene la petición para realizar el refresh del token en el servidor.
  */
  private tokenRefreshRequest(refresh_token: string) {
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
      if (this.user.data !== null) {
        resolve(this.user);
      }

      this.getUserRequest()
      .subscribe(data => {
        this.user.data = data;
        resolve(this.user);
      }, error => {
        reject(error);
      });
    });
  }

  private getUserRequest() {
    return this.http.get(`${environment.apiUrl}/api/user`);
  }

}
