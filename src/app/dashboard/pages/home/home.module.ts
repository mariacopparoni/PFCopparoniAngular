import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {RouterLink, RouterLinkActive} from "@angular/router";

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatListModule, RouterLink, RouterLinkActive],
  exports: [HomeComponent],
})
export class HomeModule {}
