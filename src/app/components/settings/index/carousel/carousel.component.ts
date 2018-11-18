import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../../services/settings.service';
import { MatDialog } from '@angular/material';
import { CreateCarouselComponent } from '../create-carousel/create-carousel.component';
import { DeleteCarouselComponent } from '../delete-carousel/delete-carousel.component';

@Component({
  selector: 'app-settings-index-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  public items: any;

  constructor(private ss: SettingsService,
              private dialog: MatDialog) { }

  async ngOnInit() {
    this.loadItems();
  }

  private async loadItems() {
    this.items = await this.ss.getIndexCarouselItems();
    console.log(this.items);
  }

  public create() {
    const createDialog = this.dialog.open(CreateCarouselComponent);
    createDialog.afterClosed().subscribe(item => {
      if (item) {
        this.loadItems();
      }
    });
  }

  public removeItem(id: number) {
    const dialog = this.dialog.open(DeleteCarouselComponent, {
      data: id
    });
    dialog.afterClosed().subscribe(item => {
      this.loadItems();
    });
  }

}
