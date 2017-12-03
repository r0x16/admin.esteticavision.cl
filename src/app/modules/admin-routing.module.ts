import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingDependencesModule } from './app-routing-dependences.module';
import { AuthGuardService } from '../services/auth-guard.service';
import { MultimediaService } from '../services/multimedia.service';
import { YoutubeService } from '../services/youtube.service';

// Componentes utilizados en el Router
import { AdminComponent } from '../components/admin/admin.component';
import { HeaderComponent } from '../components/layout/header/header.component';
import { SidenavComponent } from '../components/layout/sidenav/sidenav.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { MultimediaComponent } from '../components/multimedia/multimedia.component';
import { ImagesComponent } from '../components/multimedia/images/images.component';
import { YoutubeComponent } from '../components/multimedia/youtube/youtube.component';
import { NgDropFilesDirective } from '../directives/ng-drop-files.directive';

const appRoutes = [{
  path: 'admin',
  component: AdminComponent,
  canActivate: [AuthGuardService],
  children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'media', component: MultimediaComponent }
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
    NgDropFilesDirective
  ],
  providers: [
    AuthGuardService,
    MultimediaService,
    YoutubeService
  ]
})
export class AdminRoutingModule { }
