import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { NavBarComponent } from './navBar/navBar.component';
import { MainComponent } from './main/main.component';
import { StartPageComponent } from './start-page/start-page.component';
import { FilterComponent } from './filter/filter.component';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { OneActivityInListComponent } from './one-activity-in-list/one-activity-in-list.component';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { AddRatingComponent } from './add-rating/add-rating.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { ActivityDetailPageComponent } from './activity-detail-page/activity-detail-page.component';
import { ActivitiesComponent } from './activities/activities.component';
import { RatingListComponent } from './rating-list/rating-list.component';
import { ActivityFormComponent } from './activity-form/activity-form.component';
import { CityAdminComponent } from './city-admin/city-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MainComponent,
    StartPageComponent,
    FilterComponent,
    ActivityDetailPageComponent,
    ActivityListComponent,
    OneActivityInListComponent,
    AddActivityComponent,
    AddRatingComponent,
    SearchBarComponent,
    ActivitiesComponent,
    RatingListComponent,
    ActivityFormComponent,
    CityAdminComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
