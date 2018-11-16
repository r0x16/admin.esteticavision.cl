import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-detail',
  templateUrl: './delete-detail.component.html',
  styleUrls: ['./delete-detail.component.css']
})
export class DeleteDetailComponent implements OnInit {

  public lockForm = true;
  public detail: any;

  constructor(private ps: ProductService,
              @Inject(MAT_DIALOG_DATA) public detail_id: any,
              private dialogRef: MatDialogRef<DeleteDetailComponent>) { }

  async ngOnInit() {
    this.detail = await this.ps.getProductDetail(this.detail_id);
    this.lockForm = false;
  }

  async onSubmit() {
    this.lockForm = true;
    const result = await this.ps.destroyProductDetail(this.detail.id);
    this.dialogRef.close(this.detail);
  }

}
