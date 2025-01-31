import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { CreateDetailComponent } from '../create-detail/create-detail.component';
import { EditDetailComponent } from '../edit-detail/edit-detail.component';
import { DeleteDetailComponent } from '../delete-detail/delete-detail.component';

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
      if (detail) {
        this.details.push(detail);
        this.tableData.data = this.details;
      }
    });
  }

  public editDetail(detail_id: number) {
    const dialogRef = this.dialog.open(EditDetailComponent, {
      data: detail_id
    });
    dialogRef.afterClosed().subscribe(detail => {
      this.details.forEach((value, index) => {
        if (value.id === detail.id) {
          value.name = detail.name;
          value.description = detail.description;
        }
      });
    });
  }

  public deleteDetail(detail_id: number) {
    const dialogRef = this.dialog.open(DeleteDetailComponent, {
      data: detail_id
    });
    dialogRef.afterClosed().subscribe(detail => {
      this.details.forEach((value, index, object) => {
        if (value.id === detail.id) {
          this.details.splice(index, 1);
          this.tableData.data = this.details;
        }
      });
    });
  }

}
