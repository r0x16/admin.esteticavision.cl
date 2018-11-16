import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {

  public product: any;
  public event_deleted: EventEmitter<any>;
  public lockForm = false;

  constructor(private ps: ProductService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<DeleteProductComponent>,
              private snack: MatSnackBar) { }

  ngOnInit() {
    this.product = this.data[0];
    this.event_deleted = this.data[1];
  }

  public async onSubmit() {
    this.lockForm = true;
    const result = await this.ps.destroyProduct(this.product.id);
    if (result.error) {
      this.snack.open(result.error, 'Cerrar', {
        duration: 3000
      });
    } else {
      this.event_deleted.emit(result);
      this.snack.open(`Se ha eliminado correctamente el producto ${this.product.name}`, 'Cerrar', {
        duration: 3000
      });
    }

    this.dialogRef.close(result);
  }

}
