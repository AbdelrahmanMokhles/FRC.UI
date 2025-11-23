import { Component } from '@angular/core';
import { ToastService, ToastState } from '../../Services/Common/toast-service';

@Component({
  selector: 'app-toast-component',
  imports: [],
  templateUrl: './toast-component.html',
  styleUrl: './toast-component.scss'
})
export class ToastComponent {

  toastData!: ToastState;

  constructor(private toastService: ToastService) {
    this.toastService.toast$.subscribe(state => {
      this.toastData = state;
    });
  }

  close() {
    this.toastService.hide();
  }

  // toast = false;
  // toggleToast() {
  //   this.toast = !this.toast;
  // }
  // toastTitle = 'Validation Error';
  // toastBody = '';
  // public hideAlert() {
  //   setTimeout(() => {
  //     this.toast = false;
  //   }, 2000);
  // }
}
