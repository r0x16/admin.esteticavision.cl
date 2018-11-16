import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }

  public getProducts(page: number = null, filter: string = ''): Promise<any> {
    let params = new HttpParams();
    if (page !== null) {
      params = params.set('page', page.toString());
    }

    if (filter !== '') {
      params = params.set('q', filter);
    }

    return this.http.get(`${environment.apiUrl}/api/products`, { params }).toPromise();
  }

  public getCompleteProduct(id: number): Promise<any> {
    return this.http.get(`${environment.apiUrl}/api/products/${id}`).toPromise();
  }

  public storeProduct(data: any) {
    return this.http.post(`${environment.apiUrl}/api/products`, data).toPromise();
  }

  public updateProduct(product_id: number, data: any) {
    return this.http.put(`${environment.apiUrl}/api/products/${product_id}`, data).toPromise();
  }

  public destroyProduct(product_id: number): Promise<any> {
    return this.http.delete(`${environment.apiUrl}/api/products/${product_id}`).toPromise();
  }

  public storeProductTag(product_id: number, name: string): Promise<any> {
    return this.http.post(`${environment.apiUrl}/api/products/tags`, {
      name,
      product_id
    }).toPromise();
  }

  public updateTag(tag_id: number, name: string) {
    return this.http.put(`${environment.apiUrl}/api/products/tags/${tag_id}`, {
      name
    }).toPromise();
  }

  public destroyTag(product_id: number, tag_id: number): Promise<any> {
    const params = new HttpParams().set('product_id', product_id.toString());
    return this.http.delete(`${environment.apiUrl}/api/products/tags/${tag_id}`, {
      params
    }).toPromise();
  }

  public getProductMedia(id: number): Promise<any> {
    return this.http.get(`${environment.apiUrl}/api/products/${id}/media`).toPromise();
  }

  public storeProductMedia(product_id: number, media_id: number): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/products/${product_id}/media`, { media_id });
  }

  public getProductDetails(product_id: number): Promise<any> {
    const params = new HttpParams().set('product_id', product_id.toString());
    return this.http.get(`${environment.apiUrl}/api/product/details`, { params }).toPromise();
  }

  public getProductDetail(detail_id: number): Promise<any> {
    return this.http.get(`${environment.apiUrl}/api/product/details/${detail_id}`).toPromise();
  }

  public storeProductDetail(product_id: number, name: string, description: string): Promise<any> {
    return this.http.post(`${environment.apiUrl}/api/product/details`, {
      name,
      description,
      product_id
    }).toPromise();
  }

  public updateProductDetail(detail_id: number, name: string, description: string): Promise<any> {
    return this.http.put(`${environment.apiUrl}/api/product/details/${detail_id}`, {
      name,
      description
    }).toPromise();
  }

  public destroyProductDetail(detail_id: number): Promise<any> {
    return this.http.delete(`${environment.apiUrl}/api/product/details/${detail_id}`).toPromise();
  }

  public getProductFeatures(product_id: number): Promise<any> {
    const params = new HttpParams().set('product_id', product_id.toString());
    return this.http.get(`${environment.apiUrl}/api/product/features`, { params }).toPromise();
  }

  public storeProductFeature(product_id: number, title: string, description: string): Promise<any> {
    return this.http.post(`${environment.apiUrl}/api/product/features`, {
      title,
      description,
      product_id
    }).toPromise();
  }

  public updateCategories(old_category_id: number, new_category_id: number): Promise<any> {
    return this.http.put(`${environment.apiUrl}/api/product/category`, {
      old_category_id,
      new_category_id
    }).toPromise();
  }

}
