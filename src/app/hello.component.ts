import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-hello',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class HelloComponent {
  surname = 'Kowalski';
  tabliczka = (tab1: string[], tab2: number[]) => {
    const zlozenia = [];
    for (const str of tab1) {
      for (const num of tab2) {
        zlozenia.push(str + num);
      }
    }
    return zlozenia;
  }
}
