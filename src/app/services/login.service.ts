import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environments";

@Injectable({
    providedIn: 'root'
})
export class LoginService{
    public url: string;

    constructor(private httpClient:HttpClient){
        this.url = environment.API_URL;
    }

    async login(data: any){
        const res: any = await this.httpClient.post(this.url+'/login',data).toPromise();
        return res;
    }
}