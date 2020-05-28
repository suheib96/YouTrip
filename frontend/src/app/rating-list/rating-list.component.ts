import { Component, OnInit, Input } from '@angular/core';
import { RatingService } from '../rating.service';
import { Rating } from '../main/Rating/rating';
import { Activity } from '../Activity/activity';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-rating-list',
  templateUrl: './rating-list.component.html',
  styleUrls: ['./rating-list.component.css']
})

export class RatingListComponent implements OnInit {
  form: FormGroup;
  activity: Activity = {};
  activityId: number;
  ratings: Rating[];
  ratingId: number;

  @Input('parentData') public showAdminFunction;

  

  constructor(private ratingService: RatingService,
              private route: ActivatedRoute,
              private  fb:FormBuilder) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => this.activityId = +paramMap.get('id'));

    this.ratingService.findListOfRatingsByActivityID(this.activityId)
    .subscribe(ratingsFromBackend => this.ratings = ratingsFromBackend);

    this.ratingService.change$.subscribe(() => {
      this.ratingService.findListOfRatingsByActivityID(this.activityId)
      .subscribe(ratingsFromBackend => this.ratings = ratingsFromBackend)
    });

    this.form = this.fb.group({
      score: ['', [Validators.required, Validators.max(5), Validators.min(1)]],
      comment: ['', [Validators.required]]
    });
  }

  handleDeleteRating(ratingId) {
    this.ratingService.deleteByRating(ratingId).subscribe(() => this.loadRatings());
  }

  loadRatings() {
    this.ratingService.findListOfRatingsByActivityID(this.activityId).subscribe(ratingsFromBackend => this.ratings = ratingsFromBackend);
  }

  handleEditRating(id: number, activityId:number) {
    if (this.form.valid) {
      let rating: Rating = {
        id: id,
        score: this.form.value.score,
        comment: this.form.value.comment,
        activity: {
          id: activityId
        }
      }
      this.ratingService.updateRatingById(id, rating).subscribe(() => this.loadRatings);
    } else {
      alert("Eingabe ungültig, bitte überprüfe nochmal die Eingabe")
    }
    this.form.reset();
  }
}
