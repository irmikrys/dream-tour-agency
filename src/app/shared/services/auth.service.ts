import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessageService} from './message.service';
import {Observable, of} from 'rxjs';
import {UserData} from '../models/userData.model';
import {catchError, tap} from 'rxjs/operators';
import {User} from '../models/user.model';
import {AuthData} from '../models/authData.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'api/auth';
  private usersUrl = 'api/users';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private messageService: MessageService, private http: HttpClient) {
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
      });
  }

  loginUser(authData: AuthData) {
    this.http
      .post(this.authUrl, authData, this.httpOptions)
      .pipe(
        tap((data) => this.log(`logged in user`)),
        catchError(this.handleError<any>('loginUser'))
      )
      .subscribe(response => {
        console.log(response);
      });
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
