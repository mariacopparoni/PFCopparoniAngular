import { Course } from '../../courses/models';
import { User } from '../../users/models';

export interface Enrollment {
  id: number;
  user: string;
  course: string;
}

export interface CreateEnrollmentPayload {
  course: number | null;
  user: number | null;
}
