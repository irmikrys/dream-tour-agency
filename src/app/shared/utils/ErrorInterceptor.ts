import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ErrorComponent} from '../../components/message/error/error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next
      .handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          let errorMessage = 'An unknown error occurred';
          if (error.error && error.error.errors && error.error.errors[0].msg) {
            errorMessage = error.error.errors[0].msg;
          } else if (error.message) {
            errorMessage = error.message;
          }
          this.dialog.open(ErrorComponent, {data: {message: errorMessage}});
          return throwError(error);
        })
      );
  }
}
