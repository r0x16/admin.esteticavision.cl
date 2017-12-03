import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class YoutubeService {

  private urlPrefix = 'https://www.googleapis.com/youtube/v3';

  constructor(private http: HttpClient) { }

  searchQuery(query: string): Promise<any> {
    return this.getSearchRequest(query).toPromise();
  }

  pageSearch(query: string, pageToken: string): Promise<any> {
    return this.getSearchRequest(query, pageToken).toPromise();
  }

  private getSearchRequest(query: string, pageToken?: string) {
    let params = new HttpParams()
        .set('part', 'snippet') // Indica que queremos obtener los detalles del video.
        .set('type', 'video') // Solo retornar videos, se excluyen canales y playlists.
        .set('q', query) // El término de búsqueda.
        .set('maxResults', '8')
        .set('key', environment.youtubeApiKey);

    if (pageToken) {
      params = params.set('pageToken', pageToken);
    }

    return this.http.get(`${this.urlPrefix}/search`, {
      params: params
    });
  }

}
