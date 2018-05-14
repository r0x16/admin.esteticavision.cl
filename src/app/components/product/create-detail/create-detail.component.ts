import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProductService } from '../../../services/product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-detail',
  templateUrl: './create-detail.component.html',
  styleUrls: ['./create-detail.component.css']
})
export class CreateDetailComponent implements OnInit {

  public formData: FormGroup;
  public lockForm = false;

  constructor(public dialogRef: MatDialogRef<CreateDetailComponent>,
              @Inject(MAT_DIALOG_DATA) public product: any,
              private ps: ProductService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.formData = this.fb.group({
      name: this.fb.control('', [
        Validators.required
      ]),
      description: this.fb.control('', [
        Validators.required
      ])
    });
  }

  public async onSubmit() {
    this.lockForm = true;
    const data = this.formData.value;
    const detail = await this.ps.storeProductDetail(this.product.id, data.name, data.description);
    this.dialogRef.close(detail);
  }

}
