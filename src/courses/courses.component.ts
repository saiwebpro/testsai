import { Component, OnInit } from '@angular/core';
import {CourseService} from '../course.service'



@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {


  allCourses:any[]=[];  
  //inject courseservice object
  constructor(private coursesService:CourseService) { }

  ngOnInit(): void {
    this.coursesService.getCourses().subscribe((coursesObject)=>{
        this.allCourses=coursesObject["courses"];

      //save all courses object into local storage to make it available to register and some other components
        localStorage.setItem("allcourses",JSON.stringify(coursesObject))
    })
  }

}
