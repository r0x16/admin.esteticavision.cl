import { Component, OnInit } from '@angular/core';
import { MultimediaService } from '../../../services/multimedia.service';
import { Subject } from 'rxjs/Subject';
import { MatDialog } from '@angular/material';
import { DeleteMediaComponent } from '../delete-media/delete-media.component';

@Component({
  selector: 'app-media-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  public items;
  public query;
  private searchSubject = new Subject<string>();

  constructor(private ms: MultimediaService,
              private dialog: MatDialog) { }

  async ngOnInit() {
    this.loadItems();
    this.searchSubject
      .debounceTime(500)
      .subscribe(query => this.makeSearch(query));
  }

  private async loadItems() {
    this.items = await this.ms.getMediaObjects(null, this.query);
  }

  public async setPage(event) {
    this.items = await this.ms.getMediaObjects(event.pageIndex + 1, this.query);
  }

  public onSearch() {
    this.searchSubject.next(this.query);
  }

  private async makeSearch(query: string) {
    this.items = await this.ms.getMediaObjects(null, query);
  }

  public async deleteMedia(media: any) {
    // const result = await this.ms.deleteMediaObject(id);
    // console.log(result);
    const dialog = this.dialog.open(DeleteMediaComponent, {
      data: media
    });
    dialog.afterClosed().subscribe(() => {
      this.loadItems();
    });
  }

}
