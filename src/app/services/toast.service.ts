import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private position = 'bottom-left';
  private lifeTime: number = 5000; // 5 seconds

  constructor(private messageService: MessageService) {}

  /**
   * Show a success message
   * @param summary The summary/title of the message
   * @param detail The detailed message
   * @param life Optional lifetime in milliseconds
   */
  success(summary: string, detail: string, life?: number): void {
    this.messageService.add({
      severity: 'success',
      summary,
      detail,
      life: life || this.lifeTime,
      key: 'global'
    });
  }

  /**
   * Show an error message
   * @param summary The summary/title of the message
   * @param detail The detailed message
   * @param life Optional lifetime in milliseconds
   */
  error(summary: string, detail: string, life?: number): void {
    this.messageService.add({
      severity: 'error',
      summary,
      detail,
      life: life || this.lifeTime,
      key: 'global'
    });
  }

  /**
   * Show an info message
   * @param summary The summary/title of the message
   * @param detail The detailed message
   * @param life Optional lifetime in milliseconds
   */
  info(summary: string, detail: string, life?: number): void {
    this.messageService.add({
      severity: 'info',
      summary,
      detail,
      life: life || this.lifeTime,
      key: 'global'
    });
  }

  /**
   * Show a warning message
   * @param summary The summary/title of the message
   * @param detail The detailed message
   * @param life Optional lifetime in milliseconds
   */
  warn(summary: string, detail: string, life?: number): void {
    this.messageService.add({
      severity: 'warn',
      summary,
      detail,
      life: life || this.lifeTime,
      key: 'global'
    });
  }

  /**
   * Clear all toast messages
   */
  clear(): void {
    this.messageService.clear();
  }
}
