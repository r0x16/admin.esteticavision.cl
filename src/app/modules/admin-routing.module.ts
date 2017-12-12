import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingDependencesModule } from './app-routing-dependences.module';
import { AuthGuardService } from '../services/auth-guard.service';
import { MultimediaService } from '../services/multimedia.service';
import { YoutubeService } from '../services/youtube.service';
import { CategoryService } from '../services/category.service';

// Directivas
import { NgDropFilesDirective } from '../directives/ng-drop-files.directive';
import { ComponentLoaderDirective } from '../directives/component-loader.directive';

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

const appRoutes = [{
  path: 'admin',
  component: AdminComponent,
  canActivate: [AuthGuardService],
  children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'media', component: MultimediaComponent },
    { path: 'categories', component: CategoryComponent }
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
    EditSettingsComponent
  ],
  entryComponents: [
    CreateCategoryComponent,
    EditCategoryComponent,
    EditPageComponent,
    EditSettingsComponent
  ],
  providers: [
    AuthGuardService,
    MultimediaService,
    YoutubeService,
    CategoryService
  ]
})
export class AdminRoutingModule { }
