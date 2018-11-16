import { Component, OnInit, ViewChild, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductService } from '../../services/product.service';
import { ComponentLoaderDirective } from '../../directives/component-loader.directive';
import { ShowProductComponent } from './show-product/show-product.component';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public products: any;
  @ViewChild(ComponentLoaderDirective) componentLoader: ComponentLoaderDirective;
  public query;
  private searchSubject = new Subject<string>();

  constructor(private dialog: MatDialog,
              private ps: ProductService,
              private factory: ComponentFactoryResolver) { }

  ngOnInit() {
    this.loadProducts();
    this.searchSubject
      .debounceTime(500)
      .subscribe(query => this.makeSearch(query));
  }

  private async loadProducts() {
    this.products = await this.ps.getProducts(null, this.query);
  }

  public create() {
    const createDialog = this.dialog.open(CreateProductComponent);
    createDialog.afterClosed().subscribe(product => {
      if (product) {
        this.loadProducts();
        this.show(product);
      }
    });
  }

  public show(product: any) {
    const component = this.loadEditorComponent(ShowProductComponent);
    (<ShowProductComponent>component.instance).product_id = product.id;
    (<ShowProductComponent>component.instance).onDelete.subscribe(result => {
      component.destroy();
      this.loadProducts();
    });
  }

  private loadEditorComponent(component): ComponentRef<any> {
    const componentFactory = this.factory.resolveComponentFactory(component);
    const viewContainer = this.componentLoader.viewContainerRef;
    viewContainer.clear();

    const componentRef = viewContainer.createComponent(componentFactory);
    return componentRef;
  }

  public async setPage(event) {
    this.products = await this.ps.getProducts(event.pageIndex + 1, this.query);
  }

  public onSearch() {
    this.searchSubject.next(this.query);
  }

  private async makeSearch(query: string) {
    this.products = await this.ps.getProducts(null, query);
  }

}
