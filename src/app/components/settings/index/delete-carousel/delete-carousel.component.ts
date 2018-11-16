import { Component, OnInit, Inject } from '@angular/core';
import { SettingsService } from '../../../../services/settings.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-delete-carousel',
  templateUrl: './delete-carousel.component.html',
  styleUrls: ['./delete-carousel.component.css']
})
export class DeleteCarouselComponent implements OnInit {

  public lockForm = false;

  constructor(private ss: SettingsService,
              @Inject(MAT_DIALOG_DATA) public item_id: any,
              private dialogRef: MatDialogRef<DeleteCarouselComponent>,
              private snack: MatSnackBar) { }

  ngOnInit() {
  }

  public async onSubmit() {
    this.lockForm = true;
    const result = await this.ss.destroyIndexCarouselItem(this.item_id);
    if (result.error) {
      this.snack.open(result.error, 'Cerrar', {
        duration: 3000
      });
    } else {
      this.snack.open(`Se ha eliminado correctamente el elemento multimedia`, 'Cerrar', {
        duration: 3000
      });
    }

    this.dialogRef.close(result);
  }

}
