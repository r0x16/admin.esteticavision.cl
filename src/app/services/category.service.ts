import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class CategoryService {

  constructor(private http: HttpClient) { }

  public getFathersAble(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/categories`);
  }

  public storeCategory(data: any): Promise<any> {
    return this.http.post(`${environment.apiUrl}/api/categories`, data).toPromise();
  }

  public updateCategory(data: any, id: number): Promise<any> {
    return this.http.put(`${environment.apiUrl}/api/categories/${id}`, data).toPromise();
  }

  public getFatherless(): Observable<any> {
    const params = new HttpParams()
      .set('fatherless', 'true');
    return this.http.get(`${environment.apiUrl}/api/categories`, { params });
  }

  public getChilds(father: number): Observable<any> {
    const params = new HttpParams()
      .set('supercategory_id', father.toString());
    return this.http.get(`${environment.apiUrl}/api/categories`, { params });
  }

  public getWebpage(category_id: number): Promise<any> {
    return this.http.get(`${environment.apiUrl}/api/categories/${category_id}/webpage`).toPromise();
  }

  public publishWebpage(category_id: number, data: any): Promise<any> {
    return this.http.post(`${environment.apiUrl}/api/categories/${category_id}/webpage`, data).toPromise();
  }

  public updateWebpage(category_id: number, data: any): Promise<any> {
    return this.http.put(`${environment.apiUrl}/api/categories/${category_id}/webpage`, data).toPromise();
  }

  public getSettings(category_id: number): Promise<any>{
    return this.http.get(`${environment.apiUrl}/api/categories/${category_id}/settings`).toPromise();
  }

  public createSettings(category_id: number, data: any): Promise<any> {
    return this.http.post(`${environment.apiUrl}/api/categories/${category_id}/settings`, data).toPromise();
  }

  public updateSettings(category_id: number, data: any): Promise<any> {
    return this.http.put(`${environment.apiUrl}/api/categories/${category_id}/settings`, data).toPromise();
  }

}
