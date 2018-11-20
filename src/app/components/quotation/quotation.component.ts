import { Component, OnInit } from '@angular/core';
import { QuotationService } from '../../services/quotation.service';
import { MatDialog } from '@angular/material';
import { EditStatusComponent } from './edit-status/edit-status.component';
import { ShowQuotationComponent } from './show-quotation/show-quotation.component';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.css']
})
export class QuotationComponent implements OnInit {

  public status: any;
  public quotations: any;

  constructor(private qs: QuotationService,
              private dialog: MatDialog) { }

  async ngOnInit() {
    this.initStatus();
    this.initQuotations();
  }

  private async initStatus() {
    this.status = await this.qs.getStatusList();
    console.log(this.status);
  }

  private async initQuotations() {
    this.quotations = await this.qs.getQuotations();
    console.log(this.quotations);
  }

  public async setPage(page) {
    this.quotations = await this.qs.getQuotations(page.pageIndex + 1);
  }

  public editState(quotation: any) {
    const dialog = this.dialog.open(EditStatusComponent, {
      data: quotation
    });
    dialog.afterClosed().subscribe(status => {
      if (status != null) {
        quotation.status = status;
      }
    });
  }

  public show(quotation: any) {
    this.dialog.open(ShowQuotationComponent, {
      data: quotation
    });
  }

}
