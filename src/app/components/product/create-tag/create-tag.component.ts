import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProductService } from '../../../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-tag',
  templateUrl: './create-tag.component.html',
  styleUrls: ['./create-tag.component.css']
})
export class CreateTagComponent implements OnInit {
  public createForm: FormGroup;
  public lockForm = false;

  constructor(private dialogRef: MatDialogRef<CreateTagComponent>,
              private ps: ProductService,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public product_id: any) { }

  ngOnInit() {
    this.createForm = this.fb.group({
      name: this.fb.control('', [
        Validators.required
      ])
    });
  }

  public async onSubmit() {
    if (this.createForm.invalid === true) {
      return;
    }

    this.lockForm = true;
    this.createForm.disable();

    const name = this.createForm.get('name').value;
    const result = await this.ps.storeProductTag(this.product_id, name);

    this.lockForm = false;
    this.dialogRef.close(result);
  }

}
