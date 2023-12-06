import { Injectable } from '@angular/core';
import { Course } from './models';
import {concatMap, Observable, of} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {User} from "../users/models";
import {environment} from "../../../../environments/environment.local";

@Injectable({ providedIn: 'root' })
export class CoursesService {
  courses: Course[] = [];

  constructor(private httpClient: HttpClient) {}

  getEnrollmentsByCourse(course: string): Observable<any[]> {
    const url = `${environment.baseUrl}/enrollments?course=${course}`;
    return this.httpClient.get<any[]>(url);
  }

  getCourses$(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(`${environment.baseUrl}/courses`);
  }

  createCourse$(payload: Course): Observable<Course[]> {
    return this.httpClient
        .post<User>(`${environment.baseUrl}/courses`, payload)
        .pipe(concatMap(() => this.getCourses$()));
  }

  editCourse$(id: number, payload: Course): Observable<Course[]> {
    return this.httpClient
        .put<Course>(`${environment.baseUrl}/courses/${id}`, payload)
        .pipe(concatMap(() => this.getCourses$()));
  }

  deleteCourse$(id: number): Observable<Course[]> {
    return this.httpClient
        .delete<Object>(`${environment.baseUrl}/courses/${id}`)
        .pipe(
            // map(() =>  this.getUsers())
            concatMap(() => this.getCourses$())
        );
  }

  getCourseById$(id: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseUrl}/courses?id=` + id);
  }
}
