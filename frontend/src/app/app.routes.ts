import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { RecipeDetailComponent } from './pages/recipe-detail/recipe-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Recipe Explorer' },
  { path: 'favorites', component: FavoritesComponent, title: 'Favorites - Recipe Explorer' },
  { path: 'recipe/:id', component: RecipeDetailComponent, title: 'Recipe Details - Recipe Explorer' },
  { path: '**', redirectTo: '' }
];
