import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Recipe } from '../models/recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private recipes$ = new BehaviorSubject<Recipe[]>(this.loadInitialMockData());

  // PUBLIC_INTERFACE
  getRecipes(): Observable<Recipe[]> {
    /** Get all recipes. In future, switch to HTTP GET using NG_APP_API_BASE/NG_APP_BACKEND_URL env vars. */
    return this.recipes$.asObservable();
  }

  // PUBLIC_INTERFACE
  searchRecipes(query: string, filters?: { category?: string; cuisine?: string; tag?: string }): Observable<Recipe[]> {
    /** Search recipes by query and optional filters. */
    const q = (query || '').toLowerCase().trim();
    return this.recipes$.pipe(
      map((list) => {
        let filtered = list;
        if (q) {
          filtered = filtered.filter((r) =>
            r.title.toLowerCase().includes(q) ||
            r.description.toLowerCase().includes(q) ||
            (r.tags || []).some((t) => t.toLowerCase().includes(q))
          );
        }
        if (filters?.category) {
          filtered = filtered.filter((r) => r.category === filters.category);
        }
        if (filters?.cuisine) {
          filtered = filtered.filter((r) => (r.cuisine || '').toLowerCase() === filters.cuisine!.toLowerCase());
        }
        if (filters?.tag) {
          filtered = filtered.filter((r) => (r.tags || []).includes(filters.tag!));
        }
        return filtered;
      }),
      delay(100) // subtle async feel
    );
  }

  // PUBLIC_INTERFACE
  getRecipeById(id: string): Observable<Recipe | undefined> {
    /** Fetch recipe detail by id. */
    return this.recipes$.pipe(map((list) => list.find((r) => r.id === id)));
  }

  // PUBLIC_INTERFACE
  toggleFavorite(id: string): void {
    /** Toggle favorite status for recipe and emit updated list. */
    const list = this.recipes$.getValue().map((r) => (r.id === id ? { ...r, favorite: !r.favorite } : r));
    this.recipes$.next(list);
  }

  // PUBLIC_INTERFACE
  getAllCategories(): Observable<string[]> {
    /** Return distinct categories. */
    return this.recipes$.pipe(map((list) => Array.from(new Set(list.map((r) => r.category))).sort()));
  }

  // PUBLIC_INTERFACE
  getAllCuisines(): Observable<string[]> {
    /** Return distinct cuisines. */
    return this.recipes$.pipe(
      map((list) =>
        Array.from(new Set(list.map((r) => (r.cuisine || '').trim()).filter(Boolean))).sort()
      )
    );
  }

  // PUBLIC_INTERFACE
  getAllTags(): Observable<string[]> {
    /** Return distinct tags. */
    return this.recipes$.pipe(
      map((list) =>
        Array.from(new Set(list.flatMap((r) => r.tags || []))).sort()
      )
    );
  }

  // TODO(API): Switch to HttpClient and use NG_APP_API_BASE or NG_APP_BACKEND_URL for endpoints.
  // Use: const base = this.getApiBase(); then this.http.get<Recipe[]>(`${base}/recipes`)
  // Respect env: NG_APP_API_BASE, NG_APP_BACKEND_URL

  private getApiBase(): string | undefined {
    const base = (globalThis as any)?.NG_APP_API_BASE || (globalThis as any)?.NG_APP_BACKEND_URL;
    return base;
  }

  private loadInitialMockData(): Recipe[] {
    // Try to restore favorites state later via FavoritesService; initial dataset is static
    return [
      {
        id: '1',
        title: 'Lemon Garlic Salmon',
        description: 'Tender salmon fillets with zesty lemon and garlic butter.',
        imageUrl: 'https://images.unsplash.com/photo-1604908554007-3f4d83f9c5f2?q=80&w=1600&auto=format&fit=crop',
        category: 'Main',
        cuisine: 'American',
        tags: ['seafood', 'healthy', 'quick'],
        ingredients: [
          { name: 'Salmon fillets', quantity: '2 pieces' },
          { name: 'Garlic', quantity: '3 cloves' },
          { name: 'Lemon', quantity: '1' },
          { name: 'Butter', quantity: '2 tbsp' },
          { name: 'Parsley', quantity: '1 tbsp' }
        ],
        steps: [
          { order: 1, instruction: 'Preheat oven to 400°F (200°C).' },
          { order: 2, instruction: 'Place salmon on tray, top with garlic, butter, and lemon slices.' },
          { order: 3, instruction: 'Bake 10–12 minutes until flaky. Garnish with parsley.' }
        ]
      },
      {
        id: '2',
        title: 'Classic Margherita Pizza',
        description: 'Crispy crust topped with tomato sauce, mozzarella, and fresh basil.',
        imageUrl: 'https://images.unsplash.com/photo-1542282811-943ef1a977c3?q=80&w=1600&auto=format&fit=crop',
        category: 'Main',
        cuisine: 'Italian',
        tags: ['vegetarian', 'comfort', 'basil'],
        ingredients: [
          { name: 'Pizza dough', quantity: '1 ball' },
          { name: 'Tomato sauce', quantity: '1/2 cup' },
          { name: 'Mozzarella', quantity: '150 g' },
          { name: 'Fresh basil', quantity: 'Handful' }
        ],
        steps: [
          { order: 1, instruction: 'Preheat oven with stone to 500°F (260°C).' },
          { order: 2, instruction: 'Stretch dough, spread sauce, add mozzarella.' },
          { order: 3, instruction: 'Bake 8–10 minutes; top with basil and olive oil.' }
        ]
      },
      {
        id: '3',
        title: 'Avocado Chocolate Mousse',
        description: 'Silky dairy-free dessert with rich cocoa and ripe avocado.',
        imageUrl: 'https://images.unsplash.com/photo-1495197359483-d092478c170a?q=80&w=1600&auto=format&fit=crop',
        category: 'Dessert',
        cuisine: 'Fusion',
        tags: ['vegan', 'gluten-free', 'no-bake'],
        ingredients: [
          { name: 'Ripe avocados', quantity: '2' },
          { name: 'Cocoa powder', quantity: '3 tbsp' },
          { name: 'Maple syrup', quantity: '2–3 tbsp' },
          { name: 'Vanilla extract', quantity: '1 tsp' }
        ],
        steps: [
          { order: 1, instruction: 'Blend all ingredients until smooth.' },
          { order: 2, instruction: 'Chill for 30 minutes before serving.' }
        ]
      }
    ];
  }
}
