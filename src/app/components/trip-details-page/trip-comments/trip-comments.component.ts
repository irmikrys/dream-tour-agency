import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TripsService} from '../../../shared/services/trips-service.service';
import {Comment} from '../../../shared/models/comment.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-trip-comments',
  templateUrl: './trip-comments.component.html',
  styleUrls: ['./trip-comments.component.less']
})
export class TripCommentsComponent implements OnInit {

  @Input() editable = false;
  @Input() private tripId = '';

  comments: Comment[] = [];

  isLoading = false;
  isCommentLoading = false;
  commentForm: FormGroup;

  constructor(
    private tripsService: TripsService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.getComments();
    this.commentForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  getComments(): void {
    this.isLoading = true;
    this.route.paramMap.subscribe((paramsMap) => {
      this.tripsService
        .getComments(String((paramsMap as any).params.id))
        .subscribe(comments => {
          comments.forEach(c => c.createDate = new Date(c.createDate));
          this.comments = comments;
          this.isLoading = false;
        });
    });
  }

  onAddComment(): void {
    if (this.commentForm.invalid === true) {
      return;
    } else {
      this.isCommentLoading = true;

      const title = this.commentForm.get('title').value;
      const content = this.commentForm.get('content').value;
      this.tripsService
        .addComment(this.tripId, title, content)
        .subscribe(comments => {
          comments.forEach(c => c.createDate = new Date(c.createDate));
          this.comments = comments;
            this.isCommentLoading = false;
            this.commentForm.reset();
            this.commentForm.setErrors(null);
          }
        );
    }
  }

}
