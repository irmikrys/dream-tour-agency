import {Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-trip-rating',
  templateUrl: './trip-rating.component.html',
  styleUrls: ['./trip-rating.component.less'],
  encapsulation: ViewEncapsulation.Emulated
})
export class TripRatingComponent implements OnInit {

  @Input() private rating = 3;
  @Input() private starCount = 5;
  @Input() private color = 'accent';
  @Output() private ratingUpdated = new EventEmitter();

  private ratingArr = [];

  constructor() {
  }

  ngOnInit() {
    console.log('a ' + this.starCount);
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }

  onClick(rating: number) {
    this.ratingUpdated.emit(rating);
    return false;
  }

  showIcon(index: number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
    // return 'star_half'
  }

}

export enum TripRatingColor {
  primary = 'primary',
  accent = 'accent',
  warn = 'warn'
}
