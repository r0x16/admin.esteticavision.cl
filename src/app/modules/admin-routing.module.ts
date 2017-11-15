import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingDependencesModule } from './app-routing-dependences.module';
import { AuthGuardService } from '../services/auth-guard.service';

// Componentes utilizados en el Router
import { AdminComponent } from '../components/admin/admin.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';

const appRoutes = [{
  path: 'admin',
  component: AdminComponent,
  canActivate: [AuthGuardService],
  children: [
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
    DashboardComponent
  ],
  providers: [
    AuthGuardService
  ]
})
export class AdminRoutingModule { }
