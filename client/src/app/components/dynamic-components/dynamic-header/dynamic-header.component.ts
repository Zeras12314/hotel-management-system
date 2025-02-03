import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dynamic-header',
  templateUrl: './dynamic-header.component.html',
  styleUrls: ['./dynamic-header.component.scss'],
})
export class DynamicHeaderComponent implements OnInit {
  constructor(private translate: TranslateService) {
    ; // Set default language to 'en'
  }
  ngOnInit(): void {
    this.translate.setDefaultLang('room')

  }
}
