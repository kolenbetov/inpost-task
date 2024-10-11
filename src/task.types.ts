export interface Input<T> {
  MetaTagDescription: string;
  Title: string;
  name: string;
  id: number;
  children: T[];
}

export interface CategoryListElement {
  name: string;
  id: number;
  image: string;
  order: number;
  children: CategoryListElement[];
  showOnHome: boolean;
}
