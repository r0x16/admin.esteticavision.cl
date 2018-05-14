import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingDependencesModule } from './app-routing-dependences.module';
import { AuthGuardService } from '../services/auth-guard.service';
import { MultimediaService } from '../services/multimedia.service';
import { YoutubeService } from '../services/youtube.service';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';

// Directivas
import { NgDropFilesDirective } from '../directives/ng-drop-files.directive';
import { ComponentLoaderDirective } from '../directives/component-loader.directive';

// Pipes
import { SafePipe } from '../pipes/safe.pipe';

// Componentes utilizados en el Router
import { AdminComponent } from '../components/admin/admin.component';
import { HeaderComponent } from '../components/layout/header/header.component';
import { SidenavComponent } from '../components/layout/sidenav/sidenav.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { MultimediaComponent } from '../components/multimedia/multimedia.component';
import { ImagesComponent } from '../components/multimedia/images/images.component';
import { YoutubeComponent } from '../components/multimedia/youtube/youtube.component';
import { CategoryComponent } from '../components/category/category.component';
import { CreateCategoryComponent } from '../components/category/create-category/create-category.component';
import { EditCategoryComponent } from '../components/category/edit-category/edit-category.component';
import { EditPageComponent } from '../components/category/edit-page/edit-page.component';
import { EditSettingsComponent } from '../components/category/edit-settings/edit-settings.component';
import { ProductComponent } from '../components/product/product.component';
import { CreateProductComponent } from '../components/product/create-product/create-product.component';
import { CreateBrandComponent } from '../components/product/create-brand/create-brand.component';
import { ShowProductComponent } from '../components/product/show-product/show-product.component';
import { ProductMediaComponent } from '../components/product/product-media/product-media.component';
import { ProductDetailsComponent } from '../components/product/product-details/product-details.component';
import { ProductFeaturesComponent } from '../components/product/product-features/product-features.component';
import { MediaChooserComponent } from '../components/multimedia/media-chooser/media-chooser.component';
import { CreateDetailComponent } from '../components/product/create-detail/create-detail.component';
import { CreateFeatureComponent } from '../components/product/create-feature/create-feature.component';
import { UnlinkProductsComponent } from '../components/category/unlink-products/unlink-products.component';
import { DeleteCategoryComponent } from '../components/category/delete-category/delete-category.component';

const appRoutes = [{
  path: 'admin',
  component: AdminComponent,
  canActivate: [AuthGuardService],
  children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'media', component: MultimediaComponent },
    { path: 'categories', component: CategoryComponent },
    { path: 'products', component: ProductComponent }
  ]
}];

@NgModule({
  imports: [
    AppRoutingDependencesModule,
    RouterModule.forChild(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    AdminComponent,
    HeaderComponent,
    SidenavComponent,
    DashboardComponent,
    MultimediaComponent,
    ImagesComponent,
    YoutubeComponent,
    NgDropFilesDirective,
    CategoryComponent,
    CreateCategoryComponent,
    ComponentLoaderDirective,
    EditCategoryComponent,
    EditPageComponent,
    EditSettingsComponent,
    ProductComponent,
    CreateProductComponent,
    CreateBrandComponent,
    ShowProductComponent,
    ProductMediaComponent,
    ProductDetailsComponent,
    ProductFeaturesComponent,
    MediaChooserComponent,
    CreateDetailComponent,
    CreateFeatureComponent,
    UnlinkProductsComponent,
    SafePipe,
    DeleteCategoryComponent
  ],
  entryComponents: [
    CreateCategoryComponent,
    EditCategoryComponent,
    EditPageComponent,
    EditSettingsComponent,
    CreateProductComponent,
    CreateBrandComponent,
    ShowProductComponent,
    MediaChooserComponent,
    CreateDetailComponent,
    CreateFeatureComponent,
    UnlinkProductsComponent,
    DeleteCategoryComponent
  ],
  providers: [
    AuthGuardService,
    MultimediaService,
    YoutubeService,
    CategoryService,
    ProductService
  ]
})
export class AdminRoutingModule { }
