import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';
declare var $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit, AfterViewInit {
  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {}
  gotoViewArticles() {
    this.router.navigateByUrl('articles');
  }

  ngAfterViewInit() {
    $("#menu-toggle").click(function (e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
    
  }

  adminLogout() {
    this.loginService.logout();
  }
  status:boolean=true;
  toggleStatus(){
    this.status=!this.status;
  }
}
