import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { MediaChooserComponent } from '../../../multimedia/media-chooser/media-chooser.component';
import { SettingsService } from '../../../../services/settings.service';

@Component({
  selector: 'app-create-carousel',
  templateUrl: './create-carousel.component.html',
  styleUrls: ['./create-carousel.component.css']
})
export class CreateCarouselComponent implements OnInit {

  public createForm: FormGroup;
  public mediaObject: any;
  public lockForm = false;

  constructor(private fb: FormBuilder,
              private dialog: MatDialog,
              private ss: SettingsService,
              private dialogRef: MatDialogRef<CreateCarouselComponent>,
              private snack: MatSnackBar) { }

  ngOnInit() {
    this.mediaObject = null;
    this.formInit();
  }

  private formInit() {
    this.createForm = this.fb.group({
      title: this.fb.control(''),
      description: this.fb.control('')
    });
  }

  public pickMedia() {
    const dialogRef = this.dialog.open(MediaChooserComponent);
    dialogRef.afterClosed().subscribe(mediaElement => {
      if (mediaElement && mediaElement.type === 'image') {
        this.mediaObject = mediaElement;
      }
    });
  }

  public async onSubmit() {
    if (this.createForm.invalid || this.mediaObject === null) {
      this.snack.open('Es necesario agregar la imagen al elemento multimedia', 'Cerrar', {
        duration: 3000
      });
      return;
    }

    this.createForm.disable();
    this.lockForm = true;

    const result = await this.ss.storeIndexCarouselItem({
      title: this.createForm.get('title').value,
      description: this.createForm.get('description').value,
      multimedia: this.mediaObject.id
    });

    this.createForm.enable();
    this.lockForm = false;

    this.snack.open('Imagen agregada correctamente', 'Cerrar', {
      duration: 3000
    });
    this.dialogRef.close(result);
  }

}
