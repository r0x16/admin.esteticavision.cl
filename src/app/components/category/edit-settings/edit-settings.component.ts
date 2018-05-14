import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { UnlinkProductsComponent } from '../unlink-products/unlink-products.component';
import { DeleteCategoryComponent } from '../delete-category/delete-category.component';
import { CategoryComponent } from '../category.component';

@Component({
  selector: 'app-edit-settings',
  templateUrl: './edit-settings.component.html',
  styleUrls: ['./edit-settings.component.css']
})
export class EditSettingsComponent implements OnInit {

  @Input() category: any;
  public onDelete: EventEmitter<any> = new EventEmitter();
  public settingsForm: FormGroup;
  public lockForm = false;
  private actual: any;

  constructor(private fb: FormBuilder,
              private cs: CategoryService,
              private snack: MatSnackBar,
              private dialog: MatDialog) { }

  async ngOnInit() {
    this.settingsForm = this.fb.group({
      views: this.fb.group({
        all: this.fb.control(true, Validators.required),
        most_viewed: this.fb.control(false, Validators.required),
        best_rated: this.fb.control(false, Validators.required),
        subcategories: this.fb.control(false, Validators.required)
      })
    });

    this.initCategorySettings();
  }

  private async initCategorySettings() {
    // Esta versión no tendrá estas configuraciones habilitadas
    // this.actual = await this.cs.getSettings(this.category.id);
    // if (this.actual) {
    //   this.settingsForm.setValue({
    //     views: {
    //       all: this.actual.show_all_products,
    //       most_viewed: this.actual.show_most_viewed,
    //       best_rated: this.actual.show_best_rated,
    //       subcategories: this.actual.show_subcategories
    //     }
    //   });
    // }
  }

  public async onSubmit() {
    if (this.settingsForm.invalid) {
      return;
    }

    this.lockForm = true;
    let result;

    if (this.actual) {
      result = await this.cs.updateSettings(this.category.id, this.settingsForm.value);
    } else {
      result = await this.cs.createSettings(this.category.id, this.settingsForm.value);
    }

    this.lockForm = false;
    this.snack.open('Se han actualizado las configuraciones de la categoría.', 'Cerrar', {
      duration: 3000
    });
  }

  public unlinkProducts() {
    this.dialog.open(UnlinkProductsComponent, {
      data: this.category
    });
  }

  public deleteCategory() {
    const dialog = this.dialog.open(DeleteCategoryComponent, {
      data: this.category
    });
    dialog.afterClosed().subscribe(() => {
      this.onDelete.emit(this.category);
    });
  }

}
