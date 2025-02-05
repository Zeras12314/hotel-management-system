import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dynamic-header',
  templateUrl: './dynamic-header.component.html',
  styleUrls: ['./dynamic-header.component.scss'],
})
export class DynamicHeaderComponent implements OnInit {
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'es']); // Define available languages
    this.translate.setDefaultLang('en'); // Default language
    ; // Set default language to 'en'
  }
  ngOnInit(): void {
    // this.translate.setDefaultLang('room')
     // Force 'en' as the active language
     this.setLanguage('es');

  }
  setLanguage(lang: string) {
    console.log(`Setting language to: ${lang}`); // Log the language being set
    this.translate.use(lang);
  }
}
