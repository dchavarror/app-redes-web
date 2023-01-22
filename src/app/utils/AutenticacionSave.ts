import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AutenticacionSave implements CanActivate {


    constructor(private router : Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url: string = state.url; 
        return this.verifyLogin(url);
    }

    verifyLogin(url:string): boolean{
        if (!this.isLoggedIn()) {
            this.router.navigate(['/menu']);
            return false;
        } else if (this.isLoggedIn()) {
            return true;
        }else{
            return false;
        }
    }
    public isLoggedIn(): boolean{
        let status = false;
        if ( localStorage.getItem('indLogeado') === 'true'){
          status = true;
        } else {
          status = false;
        }
        return status;
    }
}