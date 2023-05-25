import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/service/authentification.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

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

  // login() {

  //   this.authService.login(this.credentials).subscribe(
  //     (response: any) => {
  //       if (response.userType === 'chooseType') {
  //         this.userType = '';

  //         this.dialogRef = this.dialog.open(ChooseTypeDialogComponent, {
  //           width: '400px',
  //           height:'200px'
  //         });

  //         this.dialogRef.afterClosed().subscribe((result) => {
  //           if (result == 'membre') {

  //             this.authenticateMembre();
  //           } else if (result == 'chefProjet') {
  //             this.authenticateChefProjet();
  //           }
  //         });
  //       } else if (response.userType == 'membre') {
  //         this.authenticateMembre();
  //       } else if (response.userType == 'chefProjet') {
  //         this.authenticateChefProjet();
  //       } else {
  //       }
  //     },
  //     (error: any) => {
  //     }
  //   );
  // }

  login() {
    this.authService.login(this.credentials).subscribe(
      (response) => {
        const token = response.token;
        localStorage.setItem('token', token);

        const { roles } = this.chefProjetService.getToken();
        const { chefProjet } = this.chefProjetService.getToken();
        const { membre } = this.membreService.getToken();
        console.log("Membre = ",membre);
        console.log("Chef projet = ",chefProjet);
        console.log('Role(s) = ',roles);

        if (roles.includes('chefProjet')) {
          this.router.navigate(['liste-projet']);
        } else {
          this.router.navigate(['liste-projet-membre']);
        }
      },
      (error) => {
      }
    )
}


  // authenticateMembre() {
  //   this.authService.authenticateMembre(this.credentials as Membre).subscribe(
  //     (response: any) => {
  //       console.log('Type utilisateur : ', response);
  //       localStorage.setItem('token',response.token);
  //       this.router.navigateByUrl('/liste-projet-membre');
  //       this.membreService.getMembreFromToken();
  //     },
  //     (error: any) => {
  //     }
  //   );
  // }

  // authenticateChefProjet() {
  //   this.authService.authenticateChefProjet(this.credentials as ChefProjet).subscribe(
  //     (response: any) => {
  //       console.log('Token généré :', response.token);
  //       console.log('Type utilisateur : ', response.userType);
  //       localStorage.setItem('token', response.token);
  //       localStorage.setItem('role',response.userType);
  //       this.router.navigateByUrl('/liste-projet');
  //       this.chefProjetService.getChefProjetFromToken();
  //     },
  //     (error: any) => {
  //       // Gestion des erreurs
  //     }
  //   );
  // }

ngOnInit() {
  localStorage.clear();
}

}


