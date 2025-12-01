import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';

export interface Filters {
  query: string;
  category?: string;
  cuisine?: string;
  tag?: string;
}

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.css'
})
export class FilterBarComponent implements OnInit {
  @Input() value: Filters = { query: '' };
  @Output() valueChange = new EventEmitter<Filters>();

  categories: string[] = [];
  cuisines: string[] = [];
  tags: string[] = [];

  private service = inject(RecipeService);

  ngOnInit(): void {
    this.service.getAllCategories().subscribe((c) => (this.categories = c));
    this.service.getAllCuisines().subscribe((c) => (this.cuisines = c));
    this.service.getAllTags().subscribe((t) => (this.tags = t));
  }

  onChange() {
    this.valueChange.emit({ ...this.value });
  }

  clearFilters() {
    this.value = { query: '' };
    this.onChange();
  }
}
