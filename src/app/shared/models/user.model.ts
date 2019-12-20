import {UserRole} from './userRole.type';

export interface User {
  name: string;
  surname: string;
  email?: string;
  role?: UserRole;
}
