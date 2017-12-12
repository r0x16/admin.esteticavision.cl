import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  public fathers = [];
  public emptyFather = {
    id: 0
  };
  public createForm: FormGroup;
  public lockForm = false;

  constructor(private cs: CategoryService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.fathersPopulate();
    this.formInit();
  }

  private fathersPopulate() {
    this.cs.getFathersAble().subscribe(data => {
      this.fathers = data;
    });
  }

  private formInit() {
    this.createForm = this.fb.group({
      name: this.fb.control('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      father: this.fb.control(this.emptyFather)
    });
  }

  async onSubmit() {
    if (this.createForm.invalid === true) {
      return;
    }

    this.lockForm = true;

    const result = await this.cs.storeCategory({
      name: this.createForm.get('name').value,
      father: this.createForm.get('father').value.id
    });

    this.lockForm = false;
  }

}
