import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  public getUsers(page: number = null, filter: string = ''): Promise<any> {
    let params = new HttpParams();
    if (page !== null) {
      params = params.set('page', page.toString());
    }

    if (filter !== '') {
      params = params.set('q', filter);
    }

    return this.http.get(`${environment.apiUrl}/api/users`, { params }).toPromise();
  }

}
