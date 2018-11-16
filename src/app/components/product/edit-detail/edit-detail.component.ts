import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-edit-detail',
  templateUrl: './edit-detail.component.html',
  styleUrls: ['./edit-detail.component.css']
})
export class EditDetailComponent implements OnInit {

  public formData: FormGroup;
  public lockForm = true;
  private detail: any;

  constructor(public dialogRef: MatDialogRef<EditDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public detail_id: any,
    private ps: ProductService,
    private fb: FormBuilder) { }

  async ngOnInit() {
    this.initForm();

    this.detail = await this.ps.getProductDetail(this.detail_id);
    this.formData.get('name').setValue(this.detail.name);
    this.formData.get('description').setValue(this.detail.description);
    this.lockForm = false;
  }

  private initForm() {
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
    const detail = await this.ps.updateProductDetail(this.detail_id, data.name, data.description);
    this.dialogRef.close(detail);
  }

}
