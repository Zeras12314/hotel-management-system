import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})

export class StoreService {
    value: string;
    
    setValue(value: string): void {
        this.value = value
        console.log('FROM store service', this.value)
    }

    getCurrentPage():string {
        return this.value
    }

}