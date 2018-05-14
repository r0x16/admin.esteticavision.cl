import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  @Input() category: any;
  public editForm: FormGroup;
  public fathers = [];
  public lockForm = false;
  public onEdit: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private cs: CategoryService,
    private snack: MatSnackBar
  ) { }

  ngOnInit() {
    this.editForm = this.fb.group({
      name: this.fb.control(this.category.name, [
        Validators.required,
        Validators.minLength(3)
      ]),
      father: this.fb.control(this.category.supercategory_id)
    });
    this.fathersPopulate();
  }

  private fathersPopulate() {
    this.cs.getFathersAble().subscribe(data => {
      this.fathers = data;
    });
  }

  public async onSubmit() {
    if (this.editForm.invalid === true) {
      return;
    }
    this.lockForm = true;
    this.editForm.disable();
    const result = await this.cs.updateCategory(this.editForm.value, this.category.id);
    this.lockForm = false;
    this.snack.open('Categoría modificada correctamente', 'Cerrar', {
      duration: 3000
    });
    this.onEdit.emit(result);
  }

}
