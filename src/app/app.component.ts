import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SpinnerService } from './services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hamak';
  isHomePage: boolean = true;
  showSpinner = false;

  constructor(private router: Router, private spinnerService: SpinnerService) {
    this.isHomePage = false;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isHomePage = this.router.isActive('/', true) || event.urlAfterRedirects === '/';
      }
    });
    this.spinnerService.spinner$.subscribe((data: boolean) => {
      setTimeout(() => {
        this.showSpinner = data ? data : false;
      });
      console.log(this.showSpinner);
    });
  }
}
