import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { Role } from '../model/role';
import { ChefProjet } from '../model/chef-projet';
import { Membre } from '../model/membre';

const URL1 = "http://localhost:9999/authentification-service/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http:HttpClient) { }
  csrfToken:string

  secure(){
    return this.http.get(`${URL1}/init`,{ withCredentials: true,observe:'response' }).pipe(
      map(response => {
        const header = response.headers
        this.csrfToken = header.get('X-Csrftoken');
        sessionStorage.setItem("X-Csrftoken",this.csrfToken);
      })
    )
  }

  isLoggedIn(): boolean {
    const token = sessionStorage.getItem('token');
    return !!token;
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${URL1}/login`, credentials,{observe:'response' }).pipe(
      map(response => {
        return response.body
      })
    )
  }

  extractRolesFromToken(decodedToken: any): string[] |Role[] {
    const roles = decodedToken.roles || [];
    return roles;
  }

  decodeToken(token: string): any {
    const decodedToken = jwt_decode(token);
    return decodedToken;
  }

  getUserRolesToken(token: string) {
    const decodedToken = this.decodeToken(token);
    const roles = this.extractRolesFromToken(decodedToken);
    if(roles.includes('chefProjet')){
      const { id, email, nom, prenom, adresse, username, telephone, status, dateInscription } = decodedToken;
      const chefProjet: ChefProjet = {
        id:id,
        email:email,
        nom: nom,
        prenom:prenom,
        adresse:adresse,
        username:username,
        telephone:telephone,
        dateInscription:dateInscription
      };
      return {chefProjet, roles};
    }else{
      const { id, email, nom, prenom, adresse, username, telephone, status, dateInscription } = decodedToken;
      const membre: Membre = {
        id,
        email,
        nom: nom,
        prenom: prenom,
        adresse: adresse,
        username: username,
        telephone: telephone,
        status: status,
        dateInscription: dateInscription
      };
      return {membre, roles};
    }
  }

  

}
