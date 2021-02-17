import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent} from '../admin/admin.component';

import { NewcourseComponent } from './newcourse/newcourse.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { RegisteredStudentsComponent } from './registeredstudents/registeredstudents.component';

import { ViewarticleComponent } from './viewarticle/viewarticle.component';
import { WritearticleComponent } from './writearticle/writearticle.component';


const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'writearticle', component: WritearticleComponent },
      { path: 'registered-students', component: RegisteredStudentsComponent },
      { path: 'viewarticle', component: ViewarticleComponent },
      {path:"newcourse",component:NewcourseComponent},
      {path:"notifications",component:NotificationsComponent},
      {path:"",redirectTo:"registered-students",pathMatch:"full"}
     
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
