import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.local';
@Injectable({
  providedIn: 'root',
})
export class EnrollmentsService {
  constructor(private httpClient: HttpClient) {}





  deleteEnrollments(id: number ) {
    return this.httpClient
      .delete<Object>(`${environment.baseUrl}/enrollments/${id}`);
  }

  updateEnrollments(id: number, enrollment: any) {
    return this.httpClient
      .put<Object>(`${environment.baseUrl}/enrollments/${id}`, enrollment);
  }







}
