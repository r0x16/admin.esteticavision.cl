import { Component, OnInit } from '@angular/core';
import { MultimediaService } from '../../../services/multimedia.service';

@Component({
  selector: 'app-media-chooser',
  templateUrl: './media-chooser.component.html',
  styleUrls: ['./media-chooser.component.css']
})
export class MediaChooserComponent implements OnInit {

  public selectables;
  public selected;

  constructor(private ms: MultimediaService) { }

  async ngOnInit() {
    this.selectables = await this.ms.getMediaObjects();
  }

  public selectMedia(element) {
    this.selected = element;
  }

  public async setPage(event) {
    this.selected = null;
    this.selectables = await this.ms.getMediaObjects(event.pageIndex + 1);
  }

}
