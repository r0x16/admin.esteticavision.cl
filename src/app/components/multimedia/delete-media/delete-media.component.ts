import { Component, OnInit, Inject } from '@angular/core';
import { MultimediaService } from '../../../services/multimedia.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-delete-media',
  templateUrl: './delete-media.component.html',
  styleUrls: ['./delete-media.component.css']
})
export class DeleteMediaComponent implements OnInit {

  public lockForm = false;

  constructor(private ms: MultimediaService,
    @Inject(MAT_DIALOG_DATA) public media: any,
    private dialogRef: MatDialogRef<DeleteMediaComponent>,
    private snack: MatSnackBar) { }

  ngOnInit() {
  }

  public async onSubmit() {
    this.lockForm = true;
    const result = await this.ms.deleteMediaObject(this.media.id);
    if (result.error) {
      this.snack.open(result.error, 'Cerrar', {
        duration: 3000
      });
    } else {
      this.snack.open(`Se ha eliminado correctamente el elemento multimedia ${this.media.name}`, 'Cerrar', {
        duration: 3000
      });
    }

    this.dialogRef.close(result);
  }

}
