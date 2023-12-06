import { Injectable } from '@angular/core';
import {Role, User} from './models';
import { HttpClient } from '@angular/common/http';
import {Observable, concatMap, map, of} from 'rxjs';
import { environment } from 'src/environments/environment.local';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  getUsers(student = false): Observable<User[]> {
    const url = !student? `${environment.baseUrl}/users` : `${environment.baseUrl}/users?role=STUDENT`;
    return this.httpClient.get<User[]>(url);
  }


  getEnrollmentsByUser(usermail: string): Observable<any[]> {
    const url = `${environment.baseUrl}/enrollments?user=${usermail}`;
    return this.httpClient.get<any[]>(url);
  }

  createUser(payload: User, student = false): Observable<User[]> {
    return this.httpClient
      .post<User>(`${environment.baseUrl}/users`, payload)
      .pipe(concatMap(() => this.getUsers(student)));
  }

  updateUser(userId: number, payload: User, student = false): Observable<User[]> {
    return this.httpClient
      .put<User>(`${environment.baseUrl}/users/${userId}`, payload)
      .pipe(concatMap(() => this.getUsers(student)));
  }

  deleteUser(id: number, student = false): Observable<User[]> {
    return this.httpClient
      .delete<Object>(`${environment.baseUrl}/users/${id}`)
      .pipe(
        // map(() =>  this.getUsers())
        concatMap(() => this.getUsers(student))
      );
  }




  getRoles$(): Observable<Role[]> {
    const roles: Role[] = [
      {
        name: 'ADMIN',
      },
      {
        name: 'STUDENT'
      },
      {
        name: 'PROFESSIONAL',
      },

    ];
    return of(roles);
  }
}
