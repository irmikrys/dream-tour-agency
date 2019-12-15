import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  message: string | null = null;

  constructor() {
  }

  add(message: string) {
    this.message = message;
    setTimeout(() => {
      this.clear();
    }, 5000);
  }

  private clear() {
    this.message = null;
  }

}
