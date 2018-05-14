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
  public is_new;
  private needReload;

  @ViewChild(ComponentLoaderDirective) editLoader: ComponentLoaderDirective;

  constructor(
      private dialog: MatDialog,
      private cs: CategoryService,
      private factory: ComponentFactoryResolver
    ) { }

  ngOnInit() {
    this.loadSupercategories();
  }

  private loadSupercategories() {
    this.supercategories = this.cs.getFatherless().map(data => {
      for (const item of data) {
        item.subcategories = null;
      }
      return data;
    });
  }

  public create() {
    const createDialog = this.dialog.open(CreateCategoryComponent);
    createDialog.afterClosed().subscribe(data => {
      this.is_new = data.id;
      if (!data.supercategory_id) {
        this.loadSupercategories();
      } else {
        if (this.superActive && this.superActive.id === data.supercategory_id) {
          this.setSupercategory(this.superActive, true);
        }else if (this.secondActive && this.secondActive.id === data.supercategory_id) {
          this.setSecondCategory(this.secondActive, true);
        } else {
          this.needReload = data.supercategory_id;
        }
      }
    });
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
    (<EditSettingsComponent>component.instance).onDelete.subscribe(result => {
      this.destroyCategory(result);
    });
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

  public setSupercategory(category, refresh: boolean = false) {
    this.secondLevel = this.loadChilds(category, refresh);
    this.thirdLevel = this.secondActive = null;
    this.superActive = this.active = category;
    this.clearEditcontainer();
  }

  public setSecondCategory(category, refresh: boolean = false) {
    this.thirdLevel = this.loadChilds(category, refresh);
    this.secondActive = this.active = category;
    this.clearEditcontainer();
  }

  public setThirdCategory(category) {
    this.active = category;
    this.clearEditcontainer();
  }

  private loadChilds(category, refresh: boolean = false): Observable<any> {
    if (!refresh && category.subcategories !== null && category.id !== this.needReload) {
      return Observable.of(category.subcategories);
    }

    if (this.needReload === category.id) {
      this.needReload = null;
    }

    return this.cs.getChilds(category.id).map(data => {
      for (const item of data) {
        item.subcategories = null;
      }
      category.subcategories = data;
      return data;
    });
  }

  private destroyCategory(category: any) {
    switch (category.id) {
      case this.superActive.id: this.loadSupercategories(); this.superActive = this.active = null; break;
      case this.secondActive.id: this.setSupercategory(this.superActive, true); break;
      default: this.setSecondCategory(this.secondActive, true); break;
    }
  }

}
