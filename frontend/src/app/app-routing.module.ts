import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { ActivityDetailPageComponent } from './activity-detail-page/activity-detail-page.component';
import { ActivitiesComponent } from './activities/activities.component';
import { StartPageComponent } from './start-page/start-page.component';
import { CityAdminComponent } from './city-admin/city-admin.component';

const routes: Routes = [
 
  { path: '', redirectTo: "start", pathMatch: "full"},
  { path: 'start', component: StartPageComponent},
  { path: 'activities/details/:id', component: ActivityDetailPageComponent},
  { path: 'activities/city/:id', component: ActivitiesComponent},
  { path: 'activities?city=:id', component: ActivitiesComponent},
  { path: 'activities?category=:restaurant', component: ActivitiesComponent},
  { path: 'activities?category=:hotel', component: ActivitiesComponent},
  { path: 'activities?category=:museum', component: ActivitiesComponent},
  { path: 'activities?category=:other', component: ActivitiesComponent},
  { path: 'activities/add', component: AddActivityComponent},
  { path: 'activities', component: ActivitiesComponent},
  { path: 'admin', component: CityAdminComponent},
  
     
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }