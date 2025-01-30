import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

@Injectable({
    providedIn: 'root',
})

export class FunctionService {
    currentPage = '';
    constructor(protected store: Store){}
}