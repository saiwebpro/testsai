import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private router:Router,private httpClient:HttpClient) {}

  ngOnInit(): void {

    this.getNotifications();
    $(document).scroll(function () {
      var scroll = $(this).scrollTop();
      if (scroll >= 150) {
        $('#popUp').css('margin-left', '-425px');
        $('#plus').css('margin-left', '0px');
      }
    });

    $('#plus').click(function () {
      $('#popUp').css('margin-left', '0px');
      $('#plus').css('margin-left', '-425px');
    });

    $('#close').click(function () {
      $('#popUp').css('margin-left', '-425px');
      $('#plus').css('margin-left', '0px');
    });
  }

  notifications:any[]=[];
  getNotifications(){

    this.httpClient.get("admin/getnotifications").subscribe(
      res=>{
        this.notifications=res["message"];
      },
      err=>{
        alert("Something went wrong..We will fix it soon")
      }
    )
  }
  goToLoginPage(){
    this.router.navigate(["/register"])
  }
}
