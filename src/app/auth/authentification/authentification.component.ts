import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/service/authentification.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ChooseTypeDialogComponent } from 'src/app/pages/dialogs/choose-type-dialog/choose-type-dialog.component';
import { Membre } from 'src/app/model/membre';
import { ChefProjet } from 'src/app/model/chef-projet';
import { Router } from '@angular/router';
import { ChefProjetServiceService } from 'src/app/service/chef-projet-service.service';
import { MembreService } from 'src/app/service/membre.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit {


  userType: string;
  credentials: any = {};

  constructor(private authService: AuthentificationService, private dialog: MatDialog,
    private router:Router, private chefProjetService:ChefProjetServiceService,
    private membreService:MembreService) {}

  dialogRef: MatDialogRef<any>;

//   login() {
//     this.authService.login(this.credentials).subscribe(
//       (response) => {
//         const token = response.token;
//         localStorage.setItem('token', token);

//         const { roles } = this.chefProjetService.getToken();
//         const { chefProjet } = this.chefProjetService.getToken();
//         const { membre } = this.membreService.getToken();
//         console.log("Membre = ",membre);
//         console.log("Chef projet = ",chefProjet);
//         console.log('Role(s) = ',roles);

//         if (roles.includes('chefProjet')) {
//           this.router.navigate(['liste-projet']);
//         } else {
//           this.router.navigate(['liste-projet-membre']);
//         }
//       },
//       (error) => {
//       }
//     )
// }

login() {
  this.authService.login(this.credentials).subscribe(
    (response: any) => {
      const token = response.token;
      sessionStorage.setItem('token', token);
      const { chefProjet, membre, roles } = this.authService.getUserRolesToken(token);

      if (roles.includes('chefProjet')) {
        this.router.navigate(['liste-projet']);
        console.log("chef projet = ",chefProjet);
        console.log("roles = ",roles);
      } else {
        this.router.navigate(['liste-projet-membre']);
        console.log("membre", membre);
        console.log("roles = ",roles);
      }
    },
    (error: any) => {
      console.error('Erreur de connexion', error);
    }
  );
}

ngOnInit() {
  sessionStorage.clear();
  localStorage.clear();
}

}


