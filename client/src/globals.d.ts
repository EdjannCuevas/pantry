export interface IngredientsObj {
    id: string;
    uid: string;
    pantry_id: string;
    name: string;
    timestamp: date;
}

export interface User {
    email: string | null;
    uid: string;
}

export interface RecipeObj {
    label: string;
    image: string;
    ingredientLines: string[];
    totalTime: string;
    yield: number;
    calories: number;
    url: string;
}

export interface ResponseObj {
    recipe: RecipeObj;
}

export interface ListObj {
    id: string;
    name: string;
    ingredients_array: string[];
    recipe_source: string;
    image_source: string;
}