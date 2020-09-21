import { SimpleElement } from '../shared/types';

export interface RecipeResponseData {
  type: 'element' | 'element-no-refresh' | 'suggest';
  element?: SimpleElement;
}
