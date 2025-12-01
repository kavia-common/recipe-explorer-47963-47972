export interface Ingredient {
  name: string;
  quantity?: string;
}

export interface Step {
  order: number;
  instruction: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string; // e.g., "Dessert", "Main", "Vegan"
  cuisine?: string; // e.g., "Italian"
  tags?: string[];
  ingredients: Ingredient[];
  steps: Step[];
  favorite?: boolean;
}
