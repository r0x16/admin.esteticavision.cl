import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { MatDialog } from '@angular/material';
import { CreateTagComponent } from '../create-tag/create-tag.component';
import { EditProductComponent } from '../edit-product/edit-product.component';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {

  @Input() product_id: number;
  public product: any;
  public onDelete: EventEmitter<any> = new EventEmitter();

  constructor(private ps: ProductService,
              private dialog: MatDialog) { }

  async ngOnInit() {
    this.product = await this.ps.getCompleteProduct(this.product_id);
  }

  public newTag() {
    const dialogRef = this.dialog.open(CreateTagComponent, {
      data: this.product_id
    });
    dialogRef.afterClosed().subscribe(tag => {
      this.product.data.tags.push(tag);
    });
  }

  public async removeTag(tag: any) {
    await this.ps.destroyTag(this.product_id, tag.id);
    this.product.data.tags.forEach((item, index) => {
      if (tag.id === item.id) {
        this.product.data.tags.splice(index, 1);
      }
    });
  }

  public editProduct() {
    const dialogRef = this.dialog.open(EditProductComponent, {
      data: this.product.data
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ps.getCompleteProduct(this.product_id).then(product => {
        this.product = product;
      });
    });
  }

}
