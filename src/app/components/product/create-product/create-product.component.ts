import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';
import { MatDialog, MatChipInputEvent } from '@angular/material';
import { CreateCategoryComponent } from '../../category/create-category/create-category.component';
import { CreateBrandComponent } from '../create-brand/create-brand.component';
import { FormArray } from '@angular/forms/src/model';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  public createForm: FormGroup;
  public emptyOption = {id: 0};
  public categories;
  public lockForm = false;

  constructor(private fb: FormBuilder,
              private cs: CategoryService,
              private ps: ProductService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.populateCategory();
    this.formInit();
  }

  private formInit() {
    this.createForm = this.fb.group({
      name: this.fb.control('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      code: this.fb.control(''),
      description: this.fb.control(''),
      category: this.fb.control(this.emptyOption, [Validators.required]),
      extras: this.fb.control(false),
      brand: this.fb.control(this.emptyOption),
      tags: this.fb.array([])
    });
  }

  get tags(): FormArray {
    return this.createForm.get('tags') as FormArray;
  }

  public addTag(event: MatChipInputEvent) {
    if (event.value !== '') {
      this.tags.push(this.fb.control(event.value));
    }

    if (event.input) {
      event.input.value = '';
    }
  }

  public deleteTag(index: number) {
    this.tags.removeAt(index);
  }

  private async populateCategory() {
    this.categories = await this.cs.getAllCategories();
  }

  public addCategory() {
    this.dialog.open(CreateCategoryComponent);
  }

  public addBrand() {
    this.dialog.open(CreateBrandComponent);
  }

  public async onSubmit() {
    if (this.createForm.invalid) {
      return;
    }

    this.createForm.disable();
    this.lockForm = true;

    const result = await this.ps.storeProduct({
      name: this.createForm.get('name').value,
      description: this.createForm.get('description').value,
      code: this.createForm.get('code').value,
      category: this.createForm.get('category').value.id,
      brand: this.createForm.get('brand').value.id,
      tags: this.tags.value
    });

    this.createForm.enable();
    this.lockForm = false;
  }

}
