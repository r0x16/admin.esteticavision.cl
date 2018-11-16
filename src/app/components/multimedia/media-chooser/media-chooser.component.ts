import { Component, OnInit } from '@angular/core';
import { MultimediaService } from '../../../services/multimedia.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-media-chooser',
  templateUrl: './media-chooser.component.html',
  styleUrls: ['./media-chooser.component.css']
})
export class MediaChooserComponent implements OnInit {

  public selectables;
  public selected;
  public query;
  private searchSubject = new Subject<string>();

  constructor(private ms: MultimediaService) { }

  async ngOnInit() {
    this.selectables = await this.ms.getMediaObjects();
    this.searchSubject
      .debounceTime(500)
      .subscribe(query => this.makeSearch(query));
  }

  public selectMedia(element) {
    this.selected = element;
  }

  public async setPage(event) {
    this.selected = null;
    this.selectables = await this.ms.getMediaObjects(event.pageIndex + 1, this.query);
  }

  public onSearch() {
    this.searchSubject.next(this.query);
  }

  private async makeSearch(query: string) {
    this.selectables = await this.ms.getMediaObjects(null, query);
  }

}
