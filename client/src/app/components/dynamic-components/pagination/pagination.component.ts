// pagination.component.ts
import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges } from '@angular/core';
import { PaginationService } from 'src/app/services/pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() currentPage: number;
  @Input() totalPages: number;
  @Output() pageChanged = new EventEmitter<number>();

  constructor(private paginationService: PaginationService) {}
  ngOnInit(): void {
    this.paginationService.setCurrentPagination(this.currentPage);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentPage']) {
      this.paginationService.setCurrentPagination(this.currentPage);
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChanged.emit(page);
    }
  }
}
