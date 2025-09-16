import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private _error = signal('');

  error = this._error.asReadonly(); // for displaying error of put method and accesed in app.ts

  showError(message: string) { //private errorService = inject(ErrorService);
    console.log(message);
    this._error.set(message);
  }

  clearError() {
    this._error.set('');
  }
}
