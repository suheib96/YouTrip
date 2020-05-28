import { Component, OnInit } from '@angular/core';
import { RatingService } from '../rating.service';
import { Rating } from '../main/Rating/rating';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Activity } from '../Activity/activity';
import { ActivityService } from '../activity.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-rating',
  templateUrl: './add-rating.component.html',
  styleUrls: ['./add-rating.component.css']
})

export class AddRatingComponent implements OnInit {

  constructor(private ratingService: RatingService,
              private activityService: ActivityService,
              private fb: FormBuilder,
              private route: ActivatedRoute) { 
  }
  
  showAdd = false;
  form: FormGroup;
  ratings: Rating[];
  activities: Activity[];
  activityId: number;
  addRatingButton: string = "Bewertung hinzufügen";

  ngOnInit() {

    this.activityService.findAllActivities()
    .subscribe(activitiesFromBackend => this.activities = activitiesFromBackend);

    this.loadAllRatings();

    this.route.paramMap.subscribe(paramMap => this.activityId = +paramMap.get('id'));

    this.form = this.fb.group({
      score: ['', [Validators.required, Validators.max(5), Validators.min(1)]],
      comment: ['', [Validators.required]]
    })
  }

  loadAllRatings() {
    this.ratingService.findAllRatings()
    .subscribe(ratingsFromBackend => this.ratings = ratingsFromBackend);
  }

  createNewRating() {
    if (this.form.valid) {
      let rating: Rating = {
        score: this.form.value.score,
        comment: this.form.value.comment,
        activity: {
          id: this.activityId
        }
      }
      this.ratingService.addRating(rating).subscribe(newAddedRating => {
        this.ratings.push(newAddedRating)
      })
    } else {
        alert("Eingabe ungültig")
    }
    this.form.reset();
    this.changeButtonTitle();
    this.showAdd = !this.showAdd;
  }

  showAddInputFields() {
    if (this.showAdd) {
      this.changeButtonTitle();
      this.showAdd = !this.showAdd;
    } else {
      this.changeButtonTitle();
        this.showAdd = !this.showAdd;
    }
  }

  changeButtonTitle(){
    if (this.showAdd){
      this.addRatingButton = "Bewertung hinzufügen";
    } else {
      this.addRatingButton = "Abbrechen";
    }
  }
}
