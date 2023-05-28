import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import {  Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
     // URI de la requête
     const uri = request.url;
     if (uri.includes('http://localhost:9999/authentification-service') || uri.includes('http://localhost:9999/inscription-service')) {
       return next.handle(request);
     }
     const token = sessionStorage?.getItem('token');
     if (token) {
      
       const authRequest = request.clone({
         setHeaders: {
           Authorization: token
         }
       });
       return next.handle(authRequest);
     }else{
        // this.router.navigateByUrl('/auth')
        console.log("no token");
        
     }
    
   }
  
}
