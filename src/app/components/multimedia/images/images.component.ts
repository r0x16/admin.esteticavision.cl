import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { FileItem } from '../../../models/file-items';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MultimediaService } from '../../../services/multimedia.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';

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
              private ms: MultimediaService) { }

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

}
