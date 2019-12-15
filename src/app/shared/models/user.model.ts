export interface User {
  name: string;
  surname: string;
  email: string;
  role: 'admin' | 'user';
}
