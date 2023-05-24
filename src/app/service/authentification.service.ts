import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

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


}
