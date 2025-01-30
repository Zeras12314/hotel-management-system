import { Injectable } from '@angular/core';
import { FunctionService } from './function.service';
import { FunctionServiceRoom } from './function-services/function.service-room';
import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root',
})
export class FunctionServiceFactory {
  instanceFunctionServiceRoom = null;
  private currentPage: string = null;

  constructor(
    private functionService: FunctionService,
    private storeService: StoreService
  ) {

  }
  getFunctionService(): FunctionService {
   const currentPage = this.storeService.value
    switch (currentPage) {
      case 'ROOM':
        this.instanceFunctionServiceRoom =
          this.instanceFunctionServiceRoom ?? new FunctionServiceRoom();
        return this.instanceFunctionServiceRoom;
      default:
        return this.functionService;
    }
  }
}
