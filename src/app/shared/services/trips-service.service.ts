import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Trip} from '../models/trip.model';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  private tripsUrl = 'api/trips';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private messageService: MessageService, private http: HttpClient) {
  }

  getTrips(): Observable<Trip[]> {
    this.log('fetch trips');
    return this.http
      .get<Trip[]>(this.tripsUrl)
      .pipe(
        tap(_ => this.log('fetched trips')),
        catchError(this.handleError<Trip[]>('getTrips', []))
      );
  }

  getTrip(id: number): Observable<Trip> {
    this.log('fetch trip');
    return this.http
      .get<Trip>(`${this.tripsUrl}/${id}`)
      .pipe(
        tap(_ => this.log(`fetched trip id=${id}`)),
        catchError(this.handleError<Trip>(`getTrip id=${id}`, null))
      );
  }

  addTrip(trip: Trip): Observable<Trip> {
    return this.http
      .post<Trip>(this.tripsUrl, trip, this.httpOptions)
      .pipe(
        tap((newTrip: Trip) => this.log(`added a trip w/ id=${newTrip.id}`)),
        catchError(this.handleError<Trip>('addTrip'))
      );
  }

  deleteTrip(id: number): Observable<Trip> {
    const url = `${this.tripsUrl}/${id}`;
    return this.http
      .delete<Trip>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted trip id=${id}`)),
        catchError(this.handleError<Trip>('deleteTrip'))
      );
  }

  updateTrip(trip: Trip): Observable<any> {
    this.log('update trip');
    return this.http
      .put(this.tripsUrl, trip, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated trip id=${trip.id}`)),
        catchError(this.handleError<any>('updateTrip'))
      );
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
