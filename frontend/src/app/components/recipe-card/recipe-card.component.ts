import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../models/recipe.model';
import { RouterLink } from '@angular/router';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css'
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe;
  @Output() toggleFav = new EventEmitter<string>();

  private favorites = inject(FavoritesService);

  isFav(): boolean {
    return this.favorites.isFavorite(this.recipe.id);
  }

  onToggleFav() {
    this.toggleFav.emit(this.recipe.id);
  }
}
