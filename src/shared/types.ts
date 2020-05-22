export interface Element {
  id: number;
  parent1: Element;
  parent2: Element;
  pioneer: string;
  pioneerNote: string;
}
export interface Suggestion {
  parent1: Element;
  parent2: Element;
  child: string;
}
