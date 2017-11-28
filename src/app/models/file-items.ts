import { SafeUrl } from '@angular/platform-browser';

export class FileItem {
    public archivo: File;
    public extraData: any[];
    public nombreArchivo: string;
    public url: SafeUrl;
    public estaSubiendo = false;
    public progreso = 0;

    constructor(archivo: File) {
        this.archivo = archivo;
        this.nombreArchivo = archivo.name;
    }

    setUrl(url: SafeUrl) {
        this.url = url;
    }
}
