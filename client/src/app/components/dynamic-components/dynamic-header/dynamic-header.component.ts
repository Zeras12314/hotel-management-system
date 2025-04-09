import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-dynamic-header',
  templateUrl: './dynamic-header.component.html',
  styleUrls: ['./dynamic-header.component.scss'],
})
export class DynamicHeaderComponent implements OnInit {
  constructor(
    private translate: TranslateService,
    private modalService: ModalService
  ) {
    this.translate.addLangs(['en', 'es']); // Define available languages
  }
  ngOnInit(): void {
    // Force 'en' as the active language
    this.setLanguage('en');
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
  }

  // Method to trigger modal open
  openModal() {
    // Just call openDialog - service handles registration
    this.modalService.openDialog('exampleModal', { data: 'example' });
  }
}
