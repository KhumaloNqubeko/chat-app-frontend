import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()

export class LoginService {
    private value = new BehaviorSubject<any>(undefined);
    value$ = this.value.asObservable();

    constructor() { }

    emitValue(value) {
      this.value.next(value);
    }
}
