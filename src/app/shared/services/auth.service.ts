import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessageService} from './message.service';
import {Observable, of, Subject} from 'rxjs';
import {UserData} from '../models/userData.model';
import {catchError, tap} from 'rxjs/operators';
import {User} from '../models/user.model';
import {AuthData} from '../models/authData.model';
import {Router} from '@angular/router';
import {UserRole} from '../models/userRole.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  private userId: string;
  private userRole: UserRole;
  // @ts-ignore
  private tokenTimer: NodeJS.Timer;

  private authUrl = 'api/auth';
  private usersUrl = 'api/users';
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
      .pipe(
        tap((newUser: User) => this.log(`added a user w/ email=${newUser.email}`)),
        catchError(this.handleError<User>('addUser'))
      )
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/login']);
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
      .pipe(
        tap(_ => this.log(`logged in user`)),
        catchError(this.handleError<any>('loginUser'))
      )
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
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate, userId, userRole);
          this.router.navigate(['/']);
        }
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
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.userId = null;
    this.userRole = null;
    this.authStatusListener.next(false);
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

  private log(message: string) {
    this.messageService.add(`TripsService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
