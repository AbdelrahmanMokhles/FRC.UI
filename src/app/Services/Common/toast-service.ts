import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastState {
  show: boolean;
  title: string;
  body: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})

export class ToastService {
  private toastSubject = new BehaviorSubject<ToastState>({
    show: false,
    title: '',
    body: '',
    duration: 2000
  });

  toast$ = this.toastSubject.asObservable();

  show(title: string, body: string, duration: number = 3000) {
    this.toastSubject.next({ show: true, title, body, duration });

    setTimeout(() => this.hide(), duration);
  }

  hide() {
    this.toastSubject.next({
      ...this.toastSubject.value,
      show: false
    });
  }
}
