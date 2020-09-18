import { ElementColor, SimpleElement } from '../shared/types';

export interface SuggestingData {
  parent1: SimpleElement;
  parent2: SimpleElement;
  childName: string;
  childColor: ElementColor;
}
export interface RecipeResponseData {
  type: 'element' | 'element-no-refresh' | 'suggest';
  element?: SimpleElement;
}
