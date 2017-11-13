import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  user: any = {
    email: '',
    tokens: {}
  };

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.apiUrl}/oauth/token`, {
        'grant_type': 'password',
        'client_id': environment.apiClientId,
        'client_secret': environment.apiClientSecret,
        'username': username,
        'password': password,
        'scope': ''
      })
      .subscribe(data => {
        this.user.email = username;
        this.user.tokens = data;
        resolve(true);
      },
      err => {
        reject(err);
      });
    });
  }

}
