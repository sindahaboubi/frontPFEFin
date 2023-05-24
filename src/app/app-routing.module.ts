import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { SelectProjetComponent } from "./pages/select-projet/select-projet.component";
import { DecisionComponent } from "./pages/decision/decision.component";
import { InscriptionComponent } from "./auth/inscription/inscription.component";
import { AuthentificationComponent } from "./auth/authentification/authentification.component";
import { SelectProjetMembreComponent } from "./pages/select-projet-membre/select-projet-membre.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "liste-projet",
    pathMatch: "full"
  },
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () => import ("./layouts/admin-layout/admin-layout.module").then(m => m.AdminLayoutModule)
      }
    ]
  }, {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () => import ("./layouts/auth-layout/auth-layout.module").then(m => m.AuthLayoutModule)
      }
    ]
  },
  {
    path:"liste-projet",
    component:SelectProjetComponent
  },
  {
    path:"liste-projet-membre",
    component:SelectProjetMembreComponent
  },
  {
    path:"inscription",
    component:InscriptionComponent
  },
  {
    path:"auth",
    component:AuthentificationComponent
  },
  {
    path:"decision/:idProjet/membres/:idMembre/:token",
    component:DecisionComponent
  },
  {
    path: "**",
    redirectTo: "dashboard"
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
