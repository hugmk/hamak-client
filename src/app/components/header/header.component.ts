import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public searchInput = "";

  constructor(private router: Router) {}

  search() {
    console.log("enter search");
    if(this.searchInput.length >= 3) {
      const state = { searchTerm: this.searchInput };
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/searchResults'], { state });
        window.location.reload();
      });
    }
  }
}
