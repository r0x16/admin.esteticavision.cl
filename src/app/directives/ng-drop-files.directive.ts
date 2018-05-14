import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-items';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() archivos: FileItem[] = [];
  @Output() archivoSobre: EventEmitter<any> = new EventEmitter();
  @Output() fileDrop: EventEmitter<FileItem> = new EventEmitter();

  constructor(public elemento: ElementRef, private santi: DomSanitizer) {}

  @HostListener('dragenter', ['$event'])
  public onDragEnter(event: any) {
    this.archivoSobre.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.archivoSobre.emit(false);
  }

  @HostListener('dragover', ['$event'])
  public onDragOver(event: any) {
    this.archivoSobre.emit(true);
    const transferencia = this._getTransferencia(event);
    transferencia.dropEfect = 'copy';
    this._prevenirYDetener(event);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any) {
    const transferencia = this._getTransferencia(event);

    if (!transferencia) {
      return;
    }

    this._agregarArchivos(transferencia.files);

    this.archivoSobre.emit(false);

    this._prevenirYDetener(event);
  }

  private _getTransferencia(event: any) {
    // console.log(event);
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _agregarArchivos(archivosLista: FileList) {
    // tslint:disable-next-line:forin
    for (const propiedad in Object.getOwnPropertyNames(archivosLista)) {
      const archTemporal = archivosLista[propiedad];
      if (this._archivoPuedeSerCargado(archTemporal)) {
        const nuevoArchivo = new FileItem(archTemporal);
        nuevoArchivo.setUrl(this.santi.bypassSecurityTrustUrl(window.URL.createObjectURL(archTemporal)));
        this.archivos.push(nuevoArchivo);
        this.fileDrop.emit(nuevoArchivo);
      }
    }
  }

  private _prevenirYDetener(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _archivoPuedeSerCargado(archivo: File) {
    if (!this._archivoYaFueDropeado(archivo.name) && this._esImagen(archivo.type)) {
      return true;
    }

    return false;
  }

  private _archivoYaFueDropeado(nombreArchivo: string): boolean {
    // tslint:disable-next-line:forin
    for (const i in this.archivos) {
      const arch = this.archivos[i];
      if (arch.archivo.name === nombreArchivo) {
        return true;
      }
    }

    return false;
  }

  private _esImagen(tipoArchivo: string): boolean {
    return (tipoArchivo === '' || tipoArchivo === undefined) ? false : tipoArchivo.startsWith('image');
  }

}
