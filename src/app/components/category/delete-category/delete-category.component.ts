import { Component, OnInit, Inject } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent implements OnInit {

  public removable = false;
  public withProducts = false;
  public withChildrens = false;

  constructor(private cs: CategoryService,
              private snack: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public category: any,
              private dialogRef: MatDialogRef<DeleteCategoryComponent>) { }

  ngOnInit() {
    this.validateRemovable();
  }

  private async validateRemovable() {
    const result = await this.cs.getRemovableSettings(this.category.id);
    this.withProducts = result.with_products;
    this.withChildrens = result.with_childrens;
    if (!result.with_products && !result.with_childrens) {
      this.removable = true;
    }
  }

  public async onSubmit() {
    const result = await this.cs.destroyCategory(this.category.id);
    if (result.error) {
      this.snack.open(result.error, 'Cerrar', {
        duration: 3000
      });
    } else {
      this.snack.open(`Se ha eliminado correctamente la categoría ${this.category.name}`, 'Cerrar', {
        duration: 3000
      });
    }

    this.dialogRef.close(result);
  }

}
