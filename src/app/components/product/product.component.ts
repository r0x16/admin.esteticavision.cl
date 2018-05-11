import { Component, OnInit, ViewChild, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductService } from '../../services/product.service';
import { ComponentLoaderDirective } from '../../directives/component-loader.directive';
import { ShowProductComponent } from './show-product/show-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public products: any;
  @ViewChild(ComponentLoaderDirective) componentLoader: ComponentLoaderDirective;

  constructor(private dialog: MatDialog,
              private ps: ProductService,
              private factory: ComponentFactoryResolver) { }

  async ngOnInit() {
    this.products = await this.ps.getProducts();
  }

  public create() {
    const createDialog = this.dialog.open(CreateProductComponent);
  }

  public show(product: any) {
    const component = this.loadEditorComponent(ShowProductComponent);
    (<ShowProductComponent>component.instance).product_id = product.id;
  }

  private loadEditorComponent(component): ComponentRef<any> {
    const componentFactory = this.factory.resolveComponentFactory(component);
    const viewContainer = this.componentLoader.viewContainerRef;
    viewContainer.clear();

    const componentRef = viewContainer.createComponent(componentFactory);
    return componentRef;
  }

  public async setPage(event) {
    this.products = await this.ps.getProducts(event.pageIndex + 1);
  }

}
