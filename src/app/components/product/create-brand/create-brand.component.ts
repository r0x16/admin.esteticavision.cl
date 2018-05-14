import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { BrandService } from '../../../services/brand.service';

@Component({
  selector: 'app-create-brand',
  templateUrl: './create-brand.component.html',
  styleUrls: ['./create-brand.component.css']
})
export class CreateBrandComponent implements OnInit {

  public lockForm = false;
  public createForm: FormGroup;

  constructor(private bs: BrandService,
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<CreateBrandComponent>) { }

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

    const result = await this.bs.storeBrand(this.createForm.get('name').value);

    this.lockForm = false;
    this.dialogRef.close(result);
  }

}
