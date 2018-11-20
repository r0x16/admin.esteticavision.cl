import { Component, OnInit, Inject } from '@angular/core';
import { QuotationService } from '../../../services/quotation.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-show-quotation',
  templateUrl: './show-quotation.component.html',
  styleUrls: ['./show-quotation.component.css']
})
export class ShowQuotationComponent implements OnInit {

  public status: any;
  public detail: any;

  constructor(private qs: QuotationService,
              @Inject(MAT_DIALOG_DATA) public quotation: any) { }

  ngOnInit() {
    this.initStatus();
    this.initDetails();
  }

  private async initStatus() {
    this.status = await this.qs.getStatusList();
  }

  private async initDetails() {
    this.detail = await this.qs.getDetail(this.quotation.id);
    console.log(this.detail);
  }

}
