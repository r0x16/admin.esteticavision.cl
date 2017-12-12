import { Component, OnInit, ViewEncapsulation, ViewChild, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CategoryService } from '../../services/category.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ComponentLoaderDirective } from '../../directives/component-loader.directive';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { EditSettingsComponent } from './edit-settings/edit-settings.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryComponent implements OnInit {

  public supercategories;
  public secondLevel;
  public thirdLevel;
  public active;
  public superActive;
  public secondActive;

  @ViewChild(ComponentLoaderDirective) editLoader: ComponentLoaderDirective;

  constructor(
      private dialog: MatDialog,
      private cs: CategoryService,
      private factory: ComponentFactoryResolver
    ) { }

  ngOnInit() {
    this.supercategories = this.cs.getFatherless().map(data => {
      for (const item of data) {
        item.subcategories = null;
      }
      return data;
    });
  }

  public create() {
    const createDialog = this.dialog.open(CreateCategoryComponent);
  }

  public edit(category) {
    const component = this.loadEditorComponent(EditCategoryComponent);
    (<EditCategoryComponent>component.instance).category = category;
  }

  public webpage(category) {
    const component = this.loadEditorComponent(EditPageComponent);
    (<EditPageComponent>component.instance).category = category;
  }

  public settings(category) {
    const component = this.loadEditorComponent(EditSettingsComponent);
    (<EditSettingsComponent>component.instance).category = category;
  }

  private loadEditorComponent(component): ComponentRef<any> {
    const componentFactory = this.factory.resolveComponentFactory(component);
    const viewContainer = this.editLoader.viewContainerRef;
    viewContainer.clear();

    const componentRef = viewContainer.createComponent(componentFactory);
    return componentRef;
  }

  private clearEditcontainer() {
    if (this.editLoader) {
      this.editLoader.viewContainerRef.clear();
    }
  }

  public setSupercategory(category) {
    this.secondLevel = this.loadChilds(category);
    this.thirdLevel = this.secondActive = null;
    this.superActive = this.active = category;
    this.clearEditcontainer();
  }

  public setSecondCategory(category) {
    this.thirdLevel = this.loadChilds(category);
    this.secondActive = this.active = category;
    this.clearEditcontainer();
  }

  public setThirdCategory(category) {
    this.active = category;
    this.clearEditcontainer();
  }

  private loadChilds(category): Observable<any> {
    if (category.subcategories !== null) {
      return Observable.of(category.subcategories);
    }

    return this.cs.getChilds(category.id).map(data => {
      for (const item of data) {
        item.subcategories = null;
      }
      category.subcategories = data;
      return data;
    });
  }

}
