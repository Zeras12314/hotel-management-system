import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class PaginationService {
    private currentPage = new BehaviorSubject<number>(1);
    currentPage$ = this.currentPage.asObservable();
    private pageSize = new BehaviorSubject<number>(10);
    pageSize$ = this.pageSize.asObservable();
    private totalPages = new BehaviorSubject<number>(1);
    totalPages$ = this.totalPages.asObservable()

    getCurrentPagination(){
        return this.currentPage.getValue();
    }

    getPageSize(){
        return this.pageSize.getValue()
    }

    getTotalPages(){
        return this.totalPages.getValue()
    }

    setCurrentPagination(page: number){
        this.currentPage.next(page)
    }

    setPageSize(size: number){
        this.pageSize.next(size);
    }

    setTotalPages(total: number){
        this.totalPages.next(total);
    }

    resetPagination(){
        this.currentPage.next(1);
        this.totalPages.next(1)
    }
}