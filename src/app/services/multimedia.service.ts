import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { FileItem } from '../models/file-items';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';

@Injectable()
export class MultimediaService {

  constructor(private http: HttpClient) { }

  /**
   * Sube las imagenes al servidor a través de un forkJoin,
   * por lo tanto, se resolverá una promesa una vez todos los archivos estén listos.
   *
   * @param files FileItems que serán subidos al servidor
   * @returns Una promesa que responderá una vez todas las imágenes sean súbidas al servidor
   */
  public uploadImages(files: FileItem[]): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      Observable.forkJoin(this.getAllImageUploadRequests(files)).subscribe(event => {
        resolve(true);
      });
    });
  }

  /**
   * Genera un listado de peticiones POST que serán ejecutadas en el servidor.
   * Asigna a el FileItem el progreso de subida a través de un mapeo del observable.
   *
   * @param files Los archivos que serán agregados a las peticiones.
   * @returns Un arreglo conteniendo todas las peticiones de subida de imagen, una por imagen.
   */
  private getAllImageUploadRequests(files: FileItem[]): Observable<any>[] {
    const reqs: Observable<any>[] = [];

    for (const item of files) {
      item.estaSubiendo = true;
      reqs.push(
        this.getImageUploadRequest(item.archivo, item.extraData)
          .map(event => {
            if (event.type === HttpEventType.UploadProgress) {
              item.progreso = Math.round(100 * event.loaded / event.total);
            }
            return event;
          })
      );
    }

    return reqs;
  }

  /**
   * Genera una petición POST al servidor en la ruta /api/media/image
   * La petición reportará el progreso de subida lo que permitirá hacer seguimiento
   * por cada archivo del porcentaje de procesamiento.
   *
   * @param file El archivo involucrado en la petición.
   * @param extraData Los datos adicionales relacionados al archivo.
   * @returns Una petición con reporte de progreso de la imagen recibida por parámetro.
   */
  private getImageUploadRequest(file: File, extraData: any): Observable<any> {
    const jData = new FormData();
    jData.append('file', file);
    jData.append('data', extraData);
    const req = new HttpRequest('POST', `${environment.apiUrl}/api/media/image`, jData, {
      reportProgress: true
    });
    return this.http.request(req);
  }

  /**
   * Agrega un video de youtube a la galería multimedia.
   *
   * @param name Nombre identificador del video en la galería
   * @param videoId Identificador del video en youtube
   * @param thumbnail Enlace a la miniatura del video en youtube
   */
  public uploadYoutubeVideo(name: string, videoId: string, thumbnail: string): Promise<any> {
    return this.http.post(`${environment.apiUrl}/api/media/youtube`, {
      name: name,
      src: videoId,
      thumbnail: thumbnail
    }).toPromise();
  }

}
