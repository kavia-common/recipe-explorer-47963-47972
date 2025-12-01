import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private service = inject(RecipeService);
  private favorites = inject(FavoritesService);

  recipe$ = this.service.getRecipeById(this.route.snapshot.paramMap.get('id') || '');

  ngOnInit(): void {
    // No-op for now; data is derived from route snapshot above.
  }

  toggleFav(id: string) {
    this.favorites.toggle(id);
  }

  isFav(id: string) {
    return this.favorites.isFavorite(id);
  }
}
