import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DeleteProductComponent } from '../delete-product/delete-product.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-product-danger',
  templateUrl: './product-danger.component.html',
  styleUrls: ['./product-danger.component.css']
})
export class ProductDangerComponent implements OnInit {

  @Input() product: any;
  @Input() deleted: EventEmitter<any>;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  deleteProduct() {
    const dialog = this.dialog.open(DeleteProductComponent, {
      data: [this.product, this.deleted]
    });
  }

}
