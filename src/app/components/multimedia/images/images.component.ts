import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { FileItem } from '../../../models/file-items';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MultimediaService } from '../../../services/multimedia.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-media-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ImagesComponent implements OnInit {

  imagesForm: FormGroup;

  @ViewChild('mediaImagesFiles') fileInput: ElementRef;
  files: FileItem[] = [];
  dropZoneHover = false;
  permiteCargar = true;

  constructor(private fb: FormBuilder,
              private ms: MultimediaService,
              private santi: DomSanitizer) { }

  ngOnInit() {
    this.imagesForm = this.fb.group({
      images: this.fb.array([], Validators.required)
    });
  }

  openFileDialog() {
    this.fileInput.nativeElement.click();
  }

  fileOnZone(e: boolean) {
    this.dropZoneHover = e;
  }

  get imagesArray(): FormArray {
    return this.imagesForm.get('images') as FormArray;
  }

  fileDropped(f: FileItem) {
    this.imagesArray.push(this.fb.group({
      name: new FormControl('', [
        Validators.required
      ])
    }));
  }

  mediaDeleteImage(index: number) {
    this.imagesArray.removeAt(index);
    this.files.splice(index, 1);
  }

  async onSubmit() {
    if (this.imagesForm.invalid === true) {
      return;
    }

    this.permiteCargar = false;

    for (let i = 0; i < this.imagesArray.length; i++) {
      this.files[i].extraData = this.imagesArray.value[i];
    }

    const result: boolean = await this.ms.uploadImages(this.files);

    Observable.timer(1000).subscribe(data => {
      this.cleanFiles();
      this.permiteCargar = true;
    });
  }

  cleanFiles() {
    const length = this.imagesArray.length;
    for (let i = 0; i < length; i++) {
      this.mediaDeleteImage(0);
    }
  }

  public getInputFiles(event) {
    this._agregarArchivos(event.target.files);
  }

  private _agregarArchivos(archivosLista: FileList) {
    // tslint:disable-next-line:forin
    for (const propiedad in Object.getOwnPropertyNames(archivosLista)) {
      const archTemporal = archivosLista[propiedad];
      if (this.canToBeLoaded(archTemporal)) {
        const nuevoArchivo = new FileItem(archTemporal);
        nuevoArchivo.setUrl(this.santi.bypassSecurityTrustUrl(window.URL.createObjectURL(archTemporal)));
        this.files.push(nuevoArchivo);
        this.fileDropped(nuevoArchivo);
      }
    }
  }

  private canToBeLoaded(file: File) {
    if (!this.fileInList(file.name) && this.isImage(file.type)) {
      return true;
    }

    return false;
  }

  private fileInList(filename: string) {
    // tslint:disable-next-line:forin
    for (const i in this.files) {
      const arch = this.files[i];
      if (arch.archivo.name === filename) {
        return true;
      }
    }

    return false;
  }

  private isImage(filetype: string) {
    return (filetype === '' || filetype === undefined) ? false : filetype.startsWith('image');
  }

}
