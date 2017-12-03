import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { YoutubeService } from '../../../services/youtube.service';
import { MultimediaService } from '../../../services/multimedia.service';

@Component({
  selector: 'app-media-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class YoutubeComponent implements OnInit {

  public searchQuery: string;
  public actualData: any;
  public selectedVideo: any;
  public videoTitle = '';
  public permiteCargar = true;
  public ready = false;
  public loadError = false;
  private actualQuery: string;

  constructor(
    private yt: YoutubeService,
    private ms: MultimediaService
  ) { }

  ngOnInit() {
  }

  async searchVideo() {
    if (this.searchQuery.length > 0) {
      this.actualQuery = this.searchQuery;
      try {
        this.actualData = await this.yt.searchQuery(this.actualQuery);
      }catch (error) {
        alert(error.error.error.message);
      }
      console.log(this.actualData);
    }
  }

  async nextPageSearch() {
    if (this.actualQuery.length > 0 && this.actualData.nextPageToken !== undefined) {
      try {
        this.actualData = await this.yt.pageSearch(this.actualQuery, this.actualData.nextPageToken);
      } catch (error) {
        alert(error.error.error.message);
      }
      console.log(this.actualData);
    }
  }

  async prevPageSearch() {
    if (this.actualQuery.length > 0 && this.actualData.prevPageToken !== undefined) {
      try {
        this.actualData = await this.yt.pageSearch(this.actualQuery, this.actualData.prevPageToken);
      } catch (error) {
        alert(error.error.error.message);
      }
      console.log(this.actualData);
    }
  }

  setVideo(video: any) {
    console.log(video);
    this.selectedVideo = video;
    this.ready = false;
  }

  async onSubmit() {
    this.permiteCargar = false;
    this.ms.uploadYoutubeVideo(this.videoTitle, this.selectedVideo.id.videoId, this.selectedVideo.snippet.thumbnails.high)
    .then(result => {
      this.ready = true;
      this.videoTitle = '';
      this.permiteCargar = true;
      this.selectedVideo = null;
      console.log(result);
    }).catch(error => {
      this.loadError = true;
      console.log(error);
      this.permiteCargar = true;
    });
  }

}
