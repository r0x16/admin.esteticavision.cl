import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { BrandService } from '../../../services/brand.service';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef, MatDialog } from '@angular/material';
import { ProductService } from '../../../services/product.service';
import { CreateCategoryComponent } from '../../category/create-category/create-category.component';
import { CreateBrandComponent } from '../create-brand/create-brand.component';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  public editForm: FormGroup;
  public lockForm = true;
  public categories;
  public brands;
  public emptyOption = {id: 0};

  constructor(private fb: FormBuilder,
              private cs: CategoryService,
              private bs: BrandService,
              private ps: ProductService,
              @Inject(MAT_DIALOG_DATA) public product: any,
              private dialogRef: MatDialogRef<EditProductComponent>,
              private snack: MatSnackBar,
              private dialog: MatDialog) { }

  async ngOnInit() {
    this.formInit();
    await this.populateCategory();
    await this.populateBrand();
    this.setSelects();
    this.lockForm = false;
  }

  private formInit() {
    console.log(this.product.category);
    this.editForm = this.fb.group({
      name: this.fb.control(this.product.name, [
        Validators.required,
        Validators.minLength(3)
      ]),
      code: this.fb.control(this.product.code),
      description: this.fb.control(this.product.description),
      category: this.fb.control(this.emptyOption, [Validators.required]),
      extras: this.fb.control(false),
      brand: this.fb.control(this.emptyOption)
    });
  }

  private async populateCategory() {
    this.categories = await this.cs.getAllCategories();
  }

  private async populateBrand() {
    this.brands = await this.bs.getAllBrands();
  }

  private setSelects() {
    console.log(this.categories);
    if (this.product.brand != null) {
      this.editForm.get('brand').patchValue(this.product.brand);
    }
    this.editForm.get('category').patchValue(this.product.category);
  }

  public compareIds(o1: any, o2: any) {
    return o1.id === o2.id;
  }

  public async onSubmit() {
    if (this.editForm.invalid) {
      return;
    }

    this.editForm.disable();
    this.lockForm = true;

    const result = await this.ps.updateProduct(this.product.id, {
      name: this.editForm.get('name').value,
      description: this.editForm.get('description').value,
      code: this.editForm.get('code').value,
      category: this.editForm.get('category').value.id,
      brand: this.editForm.get('brand').value.id
    });

    this.editForm.enable();
    this.lockForm = false;

    this.snack.open('Producto modificado correctamente', 'Cerrar', {
      duration: 3000
    });
    this.dialogRef.close(result);
  }

  public addCategory() {
    this.dialog.open(CreateCategoryComponent).afterClosed().subscribe(category => {
      if (category) {
        this.categories.push(category);
        this.editForm.get('category').setValue(category);
      }
    });
  }

  public addBrand() {
    this.dialog.open(CreateBrandComponent).afterClosed().subscribe(brand => {
      if (brand) {
        this.brands.push(brand);
        this.editForm.get('brand').setValue(brand);
      }
    });
  }

}
