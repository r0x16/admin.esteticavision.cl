import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingDependencesModule } from './app-routing-dependences.module';
import { AuthGuardService } from '../services/auth-guard.service';

// Componentes utilizados en el Router
import { AdminComponent } from '../components/admin/admin.component';
import { HeaderComponent } from '../components/layout/header/header.component';
import { SidenavComponent } from '../components/layout/sidenav/sidenav.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';

const appRoutes = [{
  path: 'admin',
  component: AdminComponent,
  canActivate: [AuthGuardService],
  children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent }
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
    DashboardComponent
  ],
  providers: [
    AuthGuardService
  ]
})
export class AdminRoutingModule { }
