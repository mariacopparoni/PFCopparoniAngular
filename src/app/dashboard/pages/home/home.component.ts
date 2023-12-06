import { Component, OnDestroy } from '@angular/core';
import { User } from '../users/models';
import { Observable, Subscription } from 'rxjs';
import { CommonService } from 'src/app/core/common.service';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  {
  loading = false;


  constructor() {
    this.getUsers();




  }





  async getUsers(): Promise<void> {
    this.loading = true;
    const getUsersPromise = new Promise((resolve, reject) => {
      const users: User[] = [];
      setTimeout(() => {
        resolve(users);
      }, 5000);
    });

    // DETENTE AQUI HASTA QUE SE RESUELVA
    await getUsersPromise
      // SALIO TODO OK
      .then((result) => console.log(result))
      // ATRAPAMOS UN ERROR
      .catch((err) => {
        alert('Ocurrio un error inesperado'), console.log(err);
      })
      .finally(() => {
        this.loading = false;
      });

  }
}
