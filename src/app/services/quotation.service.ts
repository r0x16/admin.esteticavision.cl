import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class QuotationService {

  constructor(private http: HttpClient) { }

  public getQuotations(page: number = null, filter: string = ''): Promise<any> {
    let params = new HttpParams();
    if (page !== null) {
      params = params.set('page', page.toString());
    }

    if (filter !== '') {
      params = params.set('q', filter);
    }

    return this.http.get(`${environment.apiUrl}/api/quotations`, {params}).toPromise();
  }

  public getStatusList(): Promise<any> {
    return this.http.get(`${environment.apiUrl}/api/quotations/status`).toPromise();
  }

  public updateStatus(quotation_id: number, status: number): Promise<any> {
    return this.http.put(`${environment.apiUrl}/api/quotations/${quotation_id}/status`, {status}).toPromise();
  }

  public getDetail(quotation_id: number): Promise<any> {
    return this.http.get(`${environment.apiUrl}/api/quotations/${quotation_id}/detail`).toPromise();
  }

}
