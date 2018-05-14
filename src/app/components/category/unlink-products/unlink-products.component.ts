import { Component, OnInit, Inject } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-unlink-products',
  templateUrl: './unlink-products.component.html',
  styleUrls: ['./unlink-products.component.css']
})
export class UnlinkProductsComponent implements OnInit {

  public unlinkForm: FormGroup;
  public lockForm = false;
  public categories;
  public emptyOption = {id: 0};

  constructor(private cs: CategoryService,
              private ps: ProductService,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public category: any,
              private dialogRef: MatDialogRef<UnlinkProductsComponent>,
              private snack: MatSnackBar) { }

  ngOnInit() {
    this.populateCategory();
    this.initForm();
  }

  private initForm() {
    this.unlinkForm = this.fb.group({
      category: this.fb.control(this.category, [
        Validators.required
      ])
    });
  }

  private async populateCategory() {
    this.categories = await this.cs.getAllCategories();
  }

  public async onSubmit() {
    if (this.unlinkForm.invalid) {
      return;
    }

    this.lockForm = true;
    this.unlinkForm.disable();

    const result = await this.ps.updateCategories(
      this.category.id,
      this.unlinkForm.get('category').value.id);

    this.lockForm = false;
    this.unlinkForm.enable();

    this.snack.open(`Se ha modificado la categoría de ${result.affected} productos.`, 'Cerrar', {
      duration: 3000
    });
    this.dialogRef.close(result);
  }

}
