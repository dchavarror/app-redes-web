import { Injectable, EventEmitter } from '@angular/core';
import { Detalle } from '../domain/Detalle';
import { environment } from '../../environments/environment';
import { REDES, TYPE_ICON_SNACKBAR, MENSAJE_MODALES, TYPE_IMG } from '../../environments/enviroment.variables';
import { Clipboard } from '@angular/cdk/clipboard';
import { VigenciaService } from '../servicios/vigencia.service';
import { MessageUtilsComponent } from '../componentes/shared/message-utils/message-utils.component';
import { FileDomain } from '../domain/FileDomain';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { DialogImagenComponent } from '../componentes/shared/dialog-imagen/dialog-imagen.component';

/**
 * @author dchavarro & r
 * @version 1.0
 * 
 * Clase que contiene el métodos y variables que son de utilidad general en la app.
 * Ejecuta métodos (funciones) y variables comunes en la app.
 * Reduce los errores y disminuye la cantidad de código utilizado en la app.
 */

@Injectable({
    providedIn: 'root'
})
export class Utils {

    evento = new EventEmitter<any>();
    detalle: Detalle;
    fileDomain: FileDomain;

    /**
     * Método constructor, este se invoca cuando se crea una instancia del componente (clase TS).
     * Usado para inicializar propiedades y dependencias.
     */
    constructor(private clipboard: Clipboard,
        private dialog: MatDialog, private serviceVigencia: VigenciaService, private message: MessageUtilsComponent, private sanitizer: DomSanitizer) {
        this.detalle = new Detalle();
        this.fileDomain = new FileDomain();
    }

    /**
     * Método que emite un evento.
     */
    enviarEvento(data: any) {
        this.evento.emit(data);
    }

    /**
     * Método que permite buscar a qué red social pertenece un usuario,
     * mediante la cadena (url) pasada como parametro.
     * 
     */
    buscarRed(cadena: string) {

        let posicionUser = cadena.indexOf('.com/');
        let facebook = cadena.toUpperCase().indexOf(REDES.FACEBOOK);
        let instagram = cadena.toUpperCase().indexOf(REDES.INSTAGRAM);
        let tiktok = cadena.toUpperCase().indexOf(REDES.TIKTOK);
        let twitter = cadena.toUpperCase().indexOf(REDES.TWITTER);
        this.detalle.red = this.getRedAplica(facebook, instagram, tiktok, twitter);
        if (this.detalle.red == 'NA') {
            this.message.mostrarMessage("Red no valida", TYPE_ICON_SNACKBAR.WARN);
        } else {
            const date = new Date();
            let codigoPromocional = date.toISOString().substring(0, 10).replace('-', '').replace('-', '') + String(date.getHours()) + String(date.getMinutes()) + String(date.getSeconds()) + cadena.substring(posicionUser + 5, cadena.length);
            console.log('codigoPromocional ', codigoPromocional);
            this.detalle.codigoPromocional = codigoPromocional;
            this.detalle.link = environment.webUrl + codigoPromocional;
            this.detalle.persona.usuario = cadena.substring(posicionUser + 5, cadena.length);
        }
        return this.detalle;

    }

    /**
     * Método que valida si la red ingresada es valida.
     */
    getRedAplica(facebook: number, instagram: number, tiktok: number, twitter: number) {
        if (facebook != -1) {
            return REDES.FACEBOOK;
        }
        if (instagram != -1) {
            return REDES.INSTAGRAM;
        }
        if (tiktok != -1) {
            return REDES.TIKTOK;
        }
        if (twitter != -1) {
            return REDES.TWITTER;
        }
        return 'NA';
    }

    /**
     * Método que permite copiar una cadena, en este caso usado para copiar un link.
     * También activa una vigencia cuando se copia el link.
     */
    onCopyLink(link: string, idVigencia: number) {
        console.log('sele ', idVigencia);
        this.clipboard.copy(link);
        if (idVigencia != -1) {
            this.actualizarVigencia(idVigencia);
        }
        this.message.mostrarMessage(MENSAJE_MODALES.LINK_COPIADO, TYPE_ICON_SNACKBAR.SUCCES)
    }

    /**
     * Método que permite activar o actualizar la vigencia de un detalle (premio).
     */
    actualizarVigencia(id: number) {
        console.log('actualizarVigencia ', id)
        this.serviceVigencia.actualizarVigencia(id).subscribe(resp => {
            console.log('resp vigencia ', resp);
        })
    }

    /**
     * Método que permite subir una imagen (atributo) relacionada a un objeto de tipo (Persona).
     */
    onFileSelected(event: any) {
        debugger
        const file: File = event.target.files[0];
        if (file) {
            if (file.type == 'image/jpeg' || file.type == 'image/png') {
                let tamañoFile = file.size / 1000 / 1000;
                if (tamañoFile <= 1) {
                    this.fileDomain.nombre = file.name;
                    const formData = new FormData();
                    console.log('FILE ', file);

                    var reader = new FileReader();
                    reader.onload = (e: any) => {
                        this.fileDomain.base64 = this.validarDocumento(file.type, e.target.result);
                        this.leerImage(this.fileDomain.base64);

                    };
                    reader.readAsDataURL(file);
                } else {
                    this.message.mostrarMessage(MENSAJE_MODALES.PESO_VALIDO_IMAGEN, TYPE_ICON_SNACKBAR.WARN);
                }
            } else {
                this.message.mostrarMessage(MENSAJE_MODALES.POR_VALIDAR_EL_FORMATO, TYPE_ICON_SNACKBAR.WARN);
            }
        }

        return this.fileDomain;
    }

    /**
     * Método que permite leer los metadatos de una imagen.
     */
    leerImage(foto: any) {
        this.fileDomain.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(TYPE_IMG.CADENA_PNG + foto);
        if (this.fileDomain.imageSource == TYPE_IMG.CADENA_PNG) {
            this.fileDomain.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(TYPE_IMG.CADENA_JPG + foto);
        }

        return this.fileDomain.imageSource;
    }

    /**
     * Método que permite validar de que tipo es la imagen ingresada, 
     * dependiendo de que tipo sea se extrae cierta cantidad de carecteres de la cadena de la img.
     */
    validarDocumento(type: string, base: string) {
        switch (type) {
            case 'image/jpeg':
                return base.substring(23);
            case 'image/png':
                return base.substring(22);
            default: {
                console.log('doc no encontrado');
                return ''
            }
        }
    }

    /**
     * Método que permite ver una imagen en un componente, el componente se comporta
     * como un dialog.
     */
    verImagen(img: any) {
        const dialogRef = this.dialog.open(DialogImagenComponent, {
            panelClass: 'custom-dialog-container',
            data: img
        });

    }

}