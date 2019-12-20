import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Trip} from '../models/trip.model';
import {TripDetails} from '../models/tripDetails.model';
import {MessageService} from './message.service';
import {AuthService} from './auth.service';
import {Comment} from '../models/comment.model';
import {Reservation} from '../models/reservation.model';
import {User} from '../models/user.model';
import {Rating} from '../models/rating.model';

interface TripsData {
  trips: Trip[];
  maxTrips: number;
  cheap: string;
  expensive: string;
  taken: number;
}

export interface ConfirmationData {
  tripData: {
    name: string;
    price: number;
    currency: string;
    id: string;
  };
  reservationData: {
    id: string;
    createDate: Date;
    author: User;
    count: number;
  };
}

export interface Purchase {
  reservation: {
    _id: string;
    createDate: Date;
    author: string;
    count: number;
  };
  tripId: string;
  price: number;
  currency: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  private tripsUrl = 'http://localhost:5000/api/trips';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  getTrips(pageSize: number, currentPage: number) {
    const queryParams = `?pagesize=${pageSize}&page=${currentPage}`;
    this.log('fetch trips');
    return this.http
      .get<TripsData>(this.tripsUrl + queryParams)
      .pipe(
        tap(_ => this.log('fetched trips')),
        catchError(this.handleError<TripsData>('getTrips', {
          trips: [],
          maxTrips: 0,
          cheap: null,
          expensive: null,
          taken: 0
        }))
      );
  }

  addTrip(trip: Trip): Observable<Trip> {
    return this.http
      .post<Trip>(this.tripsUrl, trip, this.getOptionsWithToken());
  }

  getTrip(id: string): Observable<TripDetails> {
    return this.http
      .get<TripDetails>(`${this.tripsUrl}/${id}`)
      .pipe(
        tap(_ => this.log(`fetched trip id=${id}`)),
        catchError(this.handleError<TripDetails>(`getTrip id=${id}`, null))
      );
  }

  deleteTrip(id: string): Observable<Trip> {
    const url = `${this.tripsUrl}/${id}`;
    return this.http
      .delete<Trip>(url, this.getOptionsWithToken());
  }

  // TODO: specify more about the functionality of update
  updateTrip(trip: Trip): Observable<Trip> {
    this.log('update trip');
    return this.http
      .put<Trip>(this.tripsUrl, trip, this.getOptionsWithToken())
      .pipe(
        tap(_ => this.log(`updated trip id=${trip.id}`)),
        catchError(this.handleError<any>('updateTrip'))
      );
  }

  confirmReservation(count: number, tripId: string): Observable<Reservation> {
    return this.http
      .post<Reservation>(`${this.tripsUrl}/${tripId}/reservations`, {count}, this.getOptionsWithToken());
  }

  getReservation(tripId: string, confId: string): Observable<ConfirmationData> {
    return this.http
      .get<ConfirmationData>(`${this.tripsUrl}/${tripId}/reservations/${confId}`, this.getOptionsWithToken());
  }

  getPurchases(): Observable<Purchase[]> {
    return this.http
      .get<Purchase[]>(`${this.tripsUrl}/user/reservations`, this.getOptionsWithToken());
  }

  searchTrips(term: string): Observable<Trip[]> {
    if (!term.trim()) {
      // if not search term, return empty trip array.
      return of([]);
    }
    return this.http
      .get<Trip[]>(`${this.tripsUrl}/?name=${term}`)
      .pipe(
        tap(_ => this.log(`found trips matching '${term}'`)),
        catchError(this.handleError<Trip[]>('searchTrips', []))
      );
  }

  getComments(id: string) {
    return this.http
      .get<Comment[]>(`${this.tripsUrl}/${id}/comments`, this.getOptionsWithToken());
  }

  addComment(tripId: string, title: string, content: string): Observable<Comment[]> {
    const commentData = {title, content};
    return this.http
      .post<Comment[]>(`${this.tripsUrl}/${tripId}/comments`, commentData, this.getOptionsWithToken());
  }

  getRatings(id: string) {
    return this.http
      .get<Rating[]>(`${this.tripsUrl}/${id}/ratings`, this.getOptionsWithToken());
  }

  addRating(tripId: string, rating: number): Observable<Rating[]> {
    const ratingData = {rating};
    return this.http
      .post<Rating[]>(`${this.tripsUrl}/${tripId}/ratings`, ratingData, this.getOptionsWithToken());
  }

  private getOptionsWithToken() {
    return {
      headers: this.httpOptions.headers.append('x-auth-token', this.authService.getToken())
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

      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
