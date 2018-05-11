import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { MatDialog } from '@angular/material';
import { CreateFeatureComponent } from '../create-feature/create-feature.component';

@Component({
  selector: 'app-product-features',
  templateUrl: './product-features.component.html',
  styleUrls: ['./product-features.component.css']
})
export class ProductFeaturesComponent implements OnInit {

  @Input() product: any;
  public features = [];

  constructor(private ps: ProductService,
              private dialog: MatDialog) { }

  async ngOnInit() {
    this.features = await this.ps.getProductFeatures(this.product.id);
  }

  public newFeature() {
    const dialogRef = this.dialog.open(CreateFeatureComponent, {
      data: this.product
    });
    dialogRef.afterClosed().subscribe(feature => {
      console.log(feature);
      if (feature) {
        this.features.push(feature);
      }
    });
  }

}
