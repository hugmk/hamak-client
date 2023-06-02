import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hamak';
  isHomePage: boolean = true;

  constructor(private router: Router) {
    this.isHomePage = false;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isHomePage = this.router.isActive('/', true) || event.urlAfterRedirects === '/';
      }
    });
  }
}
