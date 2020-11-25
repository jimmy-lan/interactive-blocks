/*
 * Created by Jimmy Lan
 * Creation Date: 2020-11-25
 */

/**
 * Return whether two arrays are containing the same elements. Order does
 * not matter. This function is not designed to work with nested array or
 * array of objects, so it might fail in these cases.
 *
 * @param arr1 First array in comparison
 * @param arr2 Second array in comparison
 */
export const isArrayEqual = (arr1: any[], arr2: any[]) => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  arr2.sort();
  arr1.sort();

  for (let i = 0; i < arr2.length; i++) {
    if (arr2[i] !== arr1[i]) {
      return false;
    }
  }

  return true;
};
