import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss']
})
export class InfoModalComponent {
  @Input() item: any = {};

  ngOnInit() {
    console.log(this.item);
  }
}
