import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Módulos y rutas
import { InterceptorModule } from './modules/interceptor.module';
import { AppRoutingModule } from './modules/app-routing.module';
import { AdminRoutingModule } from './modules/admin-routing.module';

// Servicios
import { AuthService } from './services/auth.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InterceptorModule,
    AdminRoutingModule,
    AppRoutingModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
