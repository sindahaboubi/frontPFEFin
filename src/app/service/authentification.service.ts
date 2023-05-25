import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import jwt_decode from 'jwt-decode';

const URL1 = "http://localhost:9999/authentification-service/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http:HttpClient) { }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  isHasRole(): boolean{
    const role = localStorage.getItem('role');
    return !!role;
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${URL1}/login`, credentials);
  }

  // authenticateMembre(credentials: any): Observable<any> {
  //   return this.http.post(`${URL1}/membre`, credentials);
  // }

  // authenticateChefProjet(credentials: any): Observable<any> {
  //   return this.http.post(`${URL1}/chefProjet`, credentials);
  // }

  extractRolesFromToken(decodedToken: any): string[] {
    const roles = decodedToken.roles || [];
    return roles;
  }

  decodeToken(token: string): any {
    const decodedToken = jwt_decode(token);
    return decodedToken;
  }

  getToken() {
    const token = localStorage.getItem('token');
    const decodedToken = this.decodeToken(token);
    const roles = this.extractRolesFromToken(decodedToken);
    return { roles };
  }


}
