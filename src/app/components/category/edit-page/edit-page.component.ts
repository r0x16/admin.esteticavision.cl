import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {

  @Input() category: any;
  public body: string;
  public enabled;
  private actual;
  public editorConfig = {
    'extraPlugins': 'imagebrowser,divarea',
    'imageBrowser_listUrl': `${environment.apiUrl}/api/media/list`
  };
  public lockForm = false;

  constructor(private cs: CategoryService,
              private snack: MatSnackBar) { }

  async ngOnInit() {
    this.actual = await this.cs.getWebpage(this.category.id);
    if (this.actual) {
      this.enabled = this.actual.active;
      this.body = this.actual.body;
    }
  }

  public async onSubmit() {
    if (this.enabled && !this.body) {
      return;
    }

    this.lockForm = true;
    const data = {
      body: this.body,
      active: this.enabled
    };

    let result;

    if (this.actual) {
      result = await this.cs.updateWebpage(this.category.id, data);
    } else {
      this.actual = result = await this.cs.publishWebpage(this.category.id, data);
    }

    this.lockForm = false;
    this.snack.open('Se han actualizado los datos de la página web para la categoría.', 'Cerrar', {
      duration: 3000
    });
  }

}
