import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CacheService {
  private storageKeyPrefix = 'football_cache_'

  get<T>(key: string): T | null {
    const cachedItem = localStorage.getItem(this.storageKeyPrefix + key)
    if (cachedItem) {
      const { data, expiration } = JSON.parse(cachedItem)
      if (expiration && Date.now() < expiration) {
        return data
      }
    }
    return null
  }

  set<T>(key: string, data: T, minutes: number): void {
    const expiration = minutes > 0 ? Date.now() + minutes * 60 * 1000 : 0
    localStorage.setItem(this.storageKeyPrefix + key, JSON.stringify({ data, expiration }))
  }
}
