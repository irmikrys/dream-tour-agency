import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserData} from '../models/userData.model';
import {AuthData} from '../models/authData.model';
import {UserRole} from '../models/userRole.type';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  private authStatusListener = new Subject<{isAuthenticated: boolean, isAdmin: boolean}>();
  private isAuthenticated = false;
  private userId: string;
  private userRole: UserRole;
  // @ts-ignore
  private tokenTimer: NodeJS.Timer;

  private authUrl = 'http://localhost:5000/api/auth';
  private usersUrl = 'http://localhost:5000/api/users';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private messageService: MessageService, private http: HttpClient, private router: Router) {
  }

  getToken() {
    return this.token;
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getUserRole(): UserRole {
    return this.userRole;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(userData: UserData) {
    this.http
      .post(this.usersUrl, userData, this.httpOptions)
      .subscribe(() => {
        this.router.navigate(['/login']);
      }, error => {
        console.log(error);
        this.authStatusListener.next({isAuthenticated: false, isAdmin: false});
      });
  }

  loginUser(authData: AuthData) {
    this.http
      .post<{
        token: string,
        expiresIn: number,
        userId: string,
        userRole: UserRole
      }>(this.authUrl, authData, this.httpOptions)
      .subscribe(response => {
        console.log(response);
        const token = response && response.token;
        this.token = token;
        if (token) {
          const {expiresIn: expiresInDuration, userId, userRole} = response;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = userId;
          this.userRole = userRole;
          this.authStatusListener.next({isAuthenticated: true, isAdmin: userRole === 'admin'});
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate, userId, userRole);
          this.router.navigate(['/']);
        }
      }, error => {
        console.log(error);
        this.authStatusListener.next({isAuthenticated: false, isAdmin: false});
      });
  }

  autoAuthUser(): void {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.userRole = authInformation.userRole;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next({isAuthenticated: true, isAdmin: this.userRole === 'admin'});
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.userId = null;
    this.userRole = null;
    this.authStatusListener.next({isAuthenticated: false, isAdmin: false});
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer', duration);
    this.tokenTimer = setTimeout(
      () => {
        this.logout();
      },
      duration * 1000
    );
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string, userRole: UserRole) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('userRole', userRole);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('reservations');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole') as UserRole;
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userId,
      userRole,
    };
  }

}
