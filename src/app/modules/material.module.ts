import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatTabsModule,
  MatProgressBarModule,
  MatDialogModule,
  MatSelectModule,
  MatSnackBarModule
} from '@angular/material';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatProgressBarModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatProgressBarModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  declarations: []
})
export class MaterialModule { }
