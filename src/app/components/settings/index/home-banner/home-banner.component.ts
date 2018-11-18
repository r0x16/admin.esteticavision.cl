import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../../services/settings.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { MediaChooserComponent } from '../../../multimedia/media-chooser/media-chooser.component';

@Component({
  selector: 'app-settings-index-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.css']
})
export class HomeBannerComponent implements OnInit {

  public bannerUrl: string;
  public actual: string;
  private settingName = 'homebanner';
  public lockForm = false;

  constructor(private ss: SettingsService,
              private dialog: MatDialog,
              private snack: MatSnackBar) { }

  ngOnInit() {
    this.setActual();
  }

  private async setActual() {
    const data = await this.ss.getSetting(this.settingName);
    if (data !== null) {
      this.actual = data;
      this.bannerUrl = data;
    }
  }

  public async onSubmit() {
    this.lockForm = true;
    await this.ss.setSetting(this.settingName, this.bannerUrl);
    this.setActual();
    this.snack.open('Se ha guardado el banner de la página principal correctamente', 'Cerrar', {
      duration: 3000
    });
    this.lockForm = false;
  }

  public loadFromGallery() {
    const dialogRef = this.dialog.open(MediaChooserComponent);
    dialogRef.afterClosed().subscribe(mediaElement => {
      this.bannerUrl = mediaElement.src;
    });
  }

  public async forgetBanner() {
    this.lockForm = true;
    await this.ss.forgetSetting(this.settingName);
    this.snack.open('El Banner ha sido quitado de la página principal', 'Cerrar', {
      duration: 3000
    });
    this.bannerUrl = '';
    this.actual = null;
    this.lockForm = false;
  }

}
