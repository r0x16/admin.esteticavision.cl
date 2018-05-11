import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { CreateDetailComponent } from '../create-detail/create-detail.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  @Input() product: any;
  public details = [];
  public tableData;

  constructor(private ps: ProductService,
              private dialog: MatDialog) { }

  async ngOnInit() {
    this.tableData = new MatTableDataSource();
    this.details = await this.ps.getProductDetails(this.product.id);
    this.tableData.data = this.details;
  }

  public newDetail() {
    const dialogRef = this.dialog.open(CreateDetailComponent, {
      data: this.product
    });
    dialogRef.afterClosed().subscribe(detail => {
      console.log(detail);
      if (detail) {
        this.details.push(detail);
        this.tableData.data = this.details;
      }
    });
  }

}
