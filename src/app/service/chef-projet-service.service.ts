import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ChefProjet } from '../model/chef-projet';
import jwt_decode from 'jwt-decode';


const url1 = "http://localhost:9999/gestion-chefProjet-service/chef-projets"
const URL2 = "http://localhost:9999/inscription-service/auth"
const URL3 = "http://localhost:9999/inscription-service/inscription"


@Injectable({
  providedIn: 'root'
})
export class ChefProjetServiceService {

  constructor(private http: HttpClient) { }

  public getChefProjetById(idChef:number){
    return this.http.get<ChefProjet>(`${url1}/`+idChef,{ observe: 'response' })
    .pipe(
      map(response => {

        const chef: ChefProjet = response.body;
        if(response.status ===404)
          return null;
        return chef;
      }));
  }

  inscription(chef:ChefProjet){
    return this.http.post<ChefProjet>(`${URL3}/chef-projet`,chef,{observe:'response'})
    .pipe(
      map(
        response =>{
          const chefInscris: ChefProjet = response.body;
          if(response.status == 400)
            return null
          return chefInscris;
        }
      )
    )
  }

  decodeToken(token: string): any {
    const decodedToken = jwt_decode(token);
    return decodedToken;
  }

  getChefProjetFromToken(){
    const token = localStorage.getItem('token');
    const decodedToken = this.decodeToken(token);
    const { id, email, nom, prenom, adresse, username, telephone, dateInscription } = decodedToken;
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
    return chefProjet;
  }

  getToken() {
    const token = localStorage.getItem('token');
    const decodedToken = this.decodeToken(token);
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

    const roles = this.extractRolesFromToken(decodedToken);

    return { chefProjet, roles };
  }

  extractRolesFromToken(decodedToken: any): string[] {
    const roles = decodedToken.roles || [];
    return roles;
  }
}
