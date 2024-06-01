import { Injectable } from '@angular/core';

export const APP_PREFIX = '`test-';

@Injectable()
export class LocalStorageService {
  setItem(key: string, value: any): void {
    sessionStorage.setItem(`${APP_PREFIX}${key}`, JSON.stringify(value));
  }

  getItem(key: string): any {
    return JSON.parse(sessionStorage.getItem(`${APP_PREFIX}${key}`));
  }

  removeItem(key: string): void {
    sessionStorage.removeItem(`${APP_PREFIX}${key}`);
  }
}
