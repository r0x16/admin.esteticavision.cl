import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BrandService {

  constructor(private http: HttpClient) { }

  public getAllBrands(): Promise<any> {
    return this.http.get(`${environment.apiUrl}/api/brands`).toPromise();
  }

  public storeBrand(name: string): Promise<any> {
    return this.http.post(`${environment.apiUrl}/api/brands`, {
      name
    }).toPromise();
  }

}
