import { Component, OnInit, Inject } from '@angular/core';
import { QuotationService } from '../../../services/quotation.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-status',
  templateUrl: './edit-status.component.html',
  styleUrls: ['./edit-status.component.css']
})
export class EditStatusComponent implements OnInit {

  public status;
  public lockForm = false;
  public selected;

  constructor(private qs: QuotationService,
              @Inject(MAT_DIALOG_DATA) public quotation: any,
              private dialogRef: MatDialogRef<EditStatusComponent>,
              private snack: MatSnackBar) { }

  ngOnInit() {
    this.initStatus();
    this.selected = this.quotation.status;
  }

  private async initStatus() {
    this.status = await this.qs.getStatusList();
  }

  public async onSubmit() {
    this.lockForm = true;
    const result = await this.qs.updateStatus(this.quotation.id, this.selected);
    if (result.error) {
      this.snack.open(result.error, 'Cerrar', {
        duration: 3000
      });
    } else {
      this.snack.open(`Se ha modificado correctamente el estado de la cotización`, 'Cerrar', {
        duration: 3000
      });
    }

    this.dialogRef.close(this.selected);
  }

}
