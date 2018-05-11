import { Component, OnInit, Inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ProductService } from '../../../services/product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-create-feature',
  templateUrl: './create-feature.component.html',
  styleUrls: ['./create-feature.component.css']
})
export class CreateFeatureComponent implements OnInit {

  formData = {
    title: '',
    description: ''
  };

  public editorConfig = {
    'extraPlugins': 'imagebrowser,divarea',
    'imageBrowser_listUrl': `${environment.apiUrl}/api/media/list`
  };

  public lockForm = false;

  constructor(public dialogRef: MatDialogRef<CreateFeatureComponent>,
              @Inject(MAT_DIALOG_DATA) public product: any,
              private ps: ProductService) { }

  ngOnInit() {
  }

  async onSubmit() {
    this.lockForm = true;
    const feature = await this.ps.storeProductFeature(this.product.id, this.formData.title, this.formData.description);
    this.dialogRef.close(feature);
  }

}
