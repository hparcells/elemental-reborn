import { database } from '.';

import { Recipe } from '../../shared/types';

export async function recipeExists(parent1: number, parent2: number) {
  return (await database.collection('recipes').find({ parent1, parent2 }).count()) === 1;
}

export async function getRecipe(id: number): Promise<Recipe> {
  return (await database.collection('recipes').find({ child: id }).toArray())[0];
}

export async function getChildId(parent1: number, parent2: number) {
  return (
    await database
      .collection('recipes')
      .find({ parent1, parent2 })
      .project({ _id: false, child: true })
      .toArray()
  )[0].child;
}
