import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MediaChooserComponent } from '../../multimedia/media-chooser/media-chooser.component';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-media',
  templateUrl: './product-media.component.html',
  styleUrls: ['./product-media.component.css']
})
export class ProductMediaComponent implements OnInit {

  @Input() product: any;
  public medias = { data: [] };

  constructor(private dialog: MatDialog,
              private ps: ProductService) { }

  async ngOnInit() {
    this.medias = await this.ps.getProductMedia(this.product.id);
  }

  pickMedia () {
    const dialogRef = this.dialog.open(MediaChooserComponent);
    dialogRef.afterClosed().subscribe(mediaElement => {
      if (mediaElement) {
        this.ps.storeProductMedia(this.product.id, mediaElement.id).subscribe(data => {
          this.medias.data.push(data);
        });
      }
    });
  }

}
