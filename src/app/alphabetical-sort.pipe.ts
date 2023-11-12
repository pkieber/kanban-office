import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alphabeticalSort'
})
export class AlphabeticalSortPipe implements PipeTransform {

  transform(array: any[] | null): any[] {
    if (!array || array.length <= 1) {
      return array || []; // return an empty array if the input is null
    }

    // Use the Array.sort() method to sort the array alphabetically based on last names
    return array.sort((a, b) => {
      const lastNameA = a.lastName.toUpperCase();
      const lastNameB = b.lastName.toUpperCase();

      if (lastNameA < lastNameB) {
        return -1;
      } else if (lastNameA > lastNameB) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
