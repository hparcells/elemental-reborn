export type ElementColor =
  | 'sky'
  | 'brown'
  | 'orange'
  | 'blue'
  | 'navy'
  | 'silver'
  | 'purple'
  | 'maroon'
  | 'gray'
  | 'green'
  | 'lime'
  | 'yellow'
  | 'olive'
  | 'white'
  | 'tan'
  | 'black'
  | 'red'
  | 'lavender'
  | 'pink'
  | 'magenta';

/** Suggestion for a new element. */
export interface Suggestion {
  /** Parent element that will make this element. */
  parent1: Element;
  /** Parent element that will make this element. */
  parent2: Element;
  /** The name of the element that will be formed. */
  child: string;
  /** Array of user IDs from people who votes. */
  votes: string[];
}
/** An element. */
export interface Element {
  /** Unique number ID of this element. */
  id: number;
  /** The name of the element. */
  name: string;
  /** The color of the element. */
  color: ElementColor;
  /** Parent element that will make this element. */
  parent1: Element;
  /** Parent element that will make this element. */
  parent2: Element;
  /** The user who got the final vote. */
  pioneer: string;
  /** The note provided by the pioneer. */
  pioneerNote: string;
  /** Time created. */
  createdOn: number;
}
/** A recipe for an element. */
export interface Recipe {
  /** Parent element that will make this element. */
  parent1: Element;
  /** Parent element that will make this element. */
  parent2: Element;
  /** The element that will be formed. */
  child: Element;
}

export const ELEMENT_COLOR_MAP: { [K in ElementColor]: string } = {
  sky: '#bbdefb',
  brown: '#5d4037',
  orange: '#ff7043',
  blue: '#2196f3',
  navy: '#303f9f',
  silver: '#bdbdbd',
  purple: '#7b1fa2',
  maroon: '#b71c1c',
  gray: '#424242',
  green: '#4caf50',
  lime: '#76ff03',
  yellow: '#ffee58',
  olive: '#afb42b',
  white: '#ffffff',
  tan: '#d3b8ae',
  black: '#212121',
  red: '#ef5350',
  lavender: '#b39ddb',
  pink: '#ff80ab',
  magenta: '#e040fb'
};
