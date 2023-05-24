import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from "@angular/common/http";

import { DragDropModule } from '@angular/cdk/drag-drop';
import { AuthLayoutRoutes } from './auth-layout.routing';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    DragDropModule
  ],
  declarations: [
  ]
})
export class AuthLayoutModule { }
