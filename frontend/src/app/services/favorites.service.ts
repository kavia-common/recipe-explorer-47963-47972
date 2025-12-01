import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const LS_KEY = 'recipe_favorites';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private state$ = new BehaviorSubject<Set<string>>(this.load());

  // PUBLIC_INTERFACE
  get favorites$() {
    /** Observable stream of favorite recipe IDs. */
    return this.state$.asObservable();
  }

  // PUBLIC_INTERFACE
  isFavorite(id: string): boolean {
    /** Check if a recipe is currently favorited. */
    return this.state$.getValue().has(id);
  }

  // PUBLIC_INTERFACE
  toggle(id: string): void {
    /** Toggle favorite status and persist to localStorage. */
    const set = new Set(this.state$.getValue());
    if (set.has(id)) set.delete(id);
    else set.add(id);
    this.state$.next(set);
    this.save(set);
  }

  private load(): Set<string> {
    try {
      const g: any = typeof globalThis !== 'undefined' ? globalThis : {};
      if (!g.localStorage) return new Set();
      const raw = g.localStorage.getItem(LS_KEY);
      if (!raw) return new Set();
      return new Set(JSON.parse(raw));
    } catch {
      return new Set();
    }
  }

  private save(set: Set<string>) {
    try {
      const g: any = typeof globalThis !== 'undefined' ? globalThis : {};
      if (!g.localStorage) return;
      g.localStorage.setItem(LS_KEY, JSON.stringify(Array.from(set)));
    } catch {
      // ignore
    }
  }
}
