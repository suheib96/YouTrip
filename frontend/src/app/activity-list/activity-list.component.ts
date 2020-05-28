import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})

export class ActivityListComponent implements OnInit {

  @Input() inputActivities;

  constructor() {  }

  ngOnInit() {  }

  sortByAsc(prop: string) {
    return this.inputActivities.sort((a, b) => a[prop].toLowerCase() > b[prop].toLowerCase() ? 1 : a[prop].toLowerCase() === b[prop].toLowerCase() ? 0 : -1);
  }
  sortByDesc(prop: string) {
    return this.inputActivities.sort((a, b) => a[prop].toLowerCase() > b[prop].toLowerCase() ? -1 : a[prop].toLowerCase() === b[prop].toLowerCase() ? 0 : 1);
  }
  sortByRatingAsc(prop: number) {
    return this.inputActivities.sort((a, b) => a[prop] > b[prop] ? -1 : a[prop] === b[prop] ? 0 : 1);
  }
  sortByRatingDesc(prop: number) {
    return this.inputActivities.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
  }

}









