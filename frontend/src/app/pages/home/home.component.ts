import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { FilterBarComponent, Filters } from '../../components/filter-bar/filter-bar.component';
import { FavoritesService } from '../../services/favorites.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RecipeCardComponent, FilterBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  private service = inject(RecipeService);
  private favorites = inject(FavoritesService);

  filters: Filters = { query: '' };
  all: Recipe[] = [];
  items: Recipe[] = [];

  private subs: Subscription[] = [];

  ngOnInit(): void {
    this.subs.push(
      this.service.getRecipes().subscribe((list) => {
        this.all = list;
        this.apply();
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }

  onFiltersChanged(v: Filters) {
    this.filters = v;
    this.apply();
  }

  apply() {
    // Use search with filters
    this.service.searchRecipes(this.filters.query || '', {
      category: this.filters.category,
      cuisine: this.filters.cuisine,
      tag: this.filters.tag
    }).subscribe((list) => (this.items = list));
  }

  onToggleFav(id: string) {
    this.favorites.toggle(id);
  }
}
