import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class SettingsService {

  constructor(private http: HttpClient) { }

  public getIndexCarouselItems(): Promise<any> {
    return this.http.get(`${environment.apiUrl}/api/carousel`).toPromise();
  }

  public storeIndexCarouselItem(data: any): Promise<any> {
    return this.http.post(`${environment.apiUrl}/api/carousel`, data).toPromise();
  }

  public destroyIndexCarouselItem(id: number): Promise<any> {
    return this.http.delete(`${environment.apiUrl}/api/carousel/${id}`).toPromise();
  }

  public getSetting(key: string): Promise<any> {
    let params = new HttpParams();
    params = params.set('key', key);
    return this.http.get(`${environment.apiUrl}/api/setting/get`, { params }).toPromise();
  }

  public setSetting(key: string, value: string): Promise<any> {
    return this.http.post(`${environment.apiUrl}/api/setting/set`, {
      key, value
    }).toPromise();
  }

  public forgetSetting(key: string): Promise<any> {
    return this.http.delete(`${environment.apiUrl}/api/setting/forget`, {
      params: {key}
    }).toPromise();
  }

}
