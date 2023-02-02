import { Injectable } from '@angular/core';
import { Detalle } from '../domain/Detalle';
import { environment } from '../../environments/environment';
import { REDES } from '../../environments/enviroment.variables';
import { Clipboard } from '@angular/cdk/clipboard';
import { VigenciaService } from '../servicios/vigencia.service';

@Injectable({
    providedIn: 'root'
})
export class Utils {
    detalle: Detalle;
    constructor(private clipboard: Clipboard, private serviceVigencia: VigenciaService) {
        this.detalle = new Detalle();
    }

    buscarRed(cadena: string) {

        let posicionUser = cadena.indexOf('.com/');
        let facebook = cadena.toUpperCase().indexOf(REDES.FACEBOOK);
        let instagram = cadena.toUpperCase().indexOf(REDES.INSTAGRAM);
        let tiktok = cadena.toUpperCase().indexOf(REDES.TIKTOK);
        let twitter = cadena.toUpperCase().indexOf(REDES.TWITTER);
        this.detalle.red = this.getRedAplica(facebook, instagram, tiktok, twitter);
        const date = new Date();
        let codigoPromocional = date.toISOString().substring(0, 10).replace('-', '').replace('-', '') + String(date.getHours()) + String(date.getMinutes()) + String(date.getSeconds()) + cadena.substring(posicionUser + 5, cadena.length);
        console.log('codigoPromocional ', codigoPromocional);
        this.detalle.codigoPromocional = codigoPromocional;
        this.detalle.link = environment.webUrl + codigoPromocional;
        this.detalle.persona.usuario = cadena.substring(posicionUser + 5, cadena.length);

        return this.detalle;
    }

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
        return 'N/A';
    }

    onCopyLink(link: string, idVigencia: number) {
        console.log('sele ', idVigencia);
        this.clipboard.copy(link);
        this.actualizarVigencia(idVigencia);
    }

    actualizarVigencia(id: number) {
        console.log('actualizarVigencia ', id)
        this.serviceVigencia.actualizarVigencia(id).subscribe(resp => {
            console.log('resp vigencia ', resp);
        })
    }
}