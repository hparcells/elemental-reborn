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

/** Suggestion data for the suggestion window. */
export interface SuggestingData {
  /** Parent element that will make this element. */
  parent1: SimpleElement;
  /** Parent element that will make this element. */
  parent2: SimpleElement;
  /** The name of the element that will be formed. */
  childName: string;
  /** The color of the element that will be formed. */
  childColor: ElementColor;
}
/** Suggestion for a new element. */
export interface Suggestion {
  /** UUID. */
  uuid: string;
  /** The person who suggested the element. */
  suggestedBy: string;
  /** Parent element that will make this element. */
  parent1: number;
  /** Parent element that will make this element. */
  parent2: number;
  /** The name of the element that will be formed. */
  childName: string;
  /** The color of the element that will be formed. */
  childColor: ElementColor;
  /** Array of user IDs from people who votes. */
  upvotes: string[];
  /** Array of user IDs from people who downvoted. */
  downvotes: string[];
}

/** Client stored element data. */
export interface SimpleElement {
  /** Unique number ID of this element. */
  id: number;
  /** The name of the element. */
  name: string;
  /** The color of the element. */
  color: ElementColor;
}
/** An element. */
export interface Element extends SimpleElement {
  /** The person who suggested the element. */
  suggestedBy: string;
  /** The user who got the final vote. */
  pioneer: string;
  /** The note provided by the pioneer. */
  pioneerNote: string;
  /** Time created. */
  createdOn: number;
}
/** Data for displaying the most recent element. */
export interface MostRecentElement extends SimpleElement {
  /** Time created. */
  createdOn: number;
  /** Parent one element. */
  parent1: Element;
  /** Parent two element. */
  parent2: Element;
}

/** A recipe for an element. */
export interface Recipe {
  /** Parent element ID that will make this element. */
  parent1: number;
  /** Parent element ID that will make this element. */
  parent2: number;
  /** The element ID that will be formed. */
  child: number;
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
export interface ElementCount {
  total: number;
  sky: number;
  brown: number;
  orange: number;
  blue: number;
  navy: number;
  silver: number;
  purple: number;
  maroon: number;
  gray: number;
  green: number;
  lime: number;
  yellow: number;
  olive: number;
  white: number;
  tan: number;
  black: number;
  red: number;
  lavender: number;
  pink: number;
  magenta: number;
}
