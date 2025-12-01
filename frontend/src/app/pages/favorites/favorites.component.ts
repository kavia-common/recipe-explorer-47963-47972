import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../services/recipe.service';
import { FavoritesService } from '../../services/favorites.service';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RecipeCardComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit {
  private service = inject(RecipeService);
  private favorites = inject(FavoritesService);

  items: Recipe[] = [];

  ngOnInit(): void {
    this.service.getRecipes().subscribe((list) => {
      const favIds = new Set<string>();
      this.favorites.favorites$.subscribe((s) => {
        favIds.clear();
        s.forEach((id) => favIds.add(id));
        this.items = list.filter((r) => favIds.has(r.id));
      });
    });
  }

  onToggleFav(id: string) {
    this.favorites.toggle(id);
  }
}
