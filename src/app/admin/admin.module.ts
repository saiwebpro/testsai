import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

import {FormsModule} from '@angular/forms'
import { WritearticleComponent } from './writearticle/writearticle.component';
import { ViewarticleComponent } from './viewarticle/viewarticle.component';
import { NewcourseComponent } from './newcourse/newcourse.component';
import { RegisteredStudentsComponent } from './registeredstudents/registeredstudents.component';
import { SearchPipe } from '../search.pipe';
import { NotificationsComponent } from './notifications/notifications.component';


@NgModule({
  declarations: [AdminComponent, RegisteredStudentsComponent, AdminComponent, WritearticleComponent, ViewarticleComponent, NewcourseComponent,SearchPipe, NotificationsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
