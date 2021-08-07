export class Sorter {
  constructor() {}

  static sort<T>(
    list: T[],
    reverse: boolean,
    sortBy: string = '',
    isNumericSort?: boolean,
    isBooleanSort?: boolean
  ): T[] {
    sortBy = sortBy; // by default null
    isNumericSort = isNumericSort || false; // by default text sort
    isBooleanSort = isBooleanSort || false; // by default text sort
    reverse = reverse || false; // by default no reverse

    const reversed = reverse ? -1 : 1;

    if (isBooleanSort) {
      if (sortBy !== '' && sortBy !== null) {
        // tslint:disable-next-line:only-arrow-functions
        list.sort(function(a: any, b: any) {
          return reversed * (Number(a[sortBy]) - Number(b[sortBy]));
        });
      } else {
        // tslint:disable-next-line:only-arrow-functions
        list.sort(function(a: any, b: any) {
          return reversed * (Number(a) - Number(b));
        });
      }
    } else if (isNumericSort) {
      if (sortBy !== '' && sortBy !== null) {
        // tslint:disable-next-line:only-arrow-functions
        list.sort(function(a: any, b: any) {
          return reversed * (a[sortBy] - b[sortBy]);
        });
      } else {
        // tslint:disable-next-line:only-arrow-functions
        list.sort(function(a: any, b: any) {
          return reversed * (a - b);
        });
      }
    } else {
      if (sortBy !== '' && sortBy !== null) {
        // tslint:disable-next-line:only-arrow-functions
        list.sort(function(a: any, b: any) {
          const x = a[sortBy].toLowerCase();
          const y = b[sortBy].toLowerCase();
          return x < y ? reversed * -1 : x > y ? reversed : 0;
        });
      } else {
        // tslint:disable-next-line:only-arrow-functions
        list.sort(function(a: any, b: any) {
          const x = a.toLowerCase();
          const y = b.toLowerCase();
          return x < y ? reversed * -1 : x > y ? reversed : 0;
        });
      }
    }

    return list;
  }

  static sortDate(list: any, sortBy: any) {
    const sortedArray = list.sort(
      (a: any, b: any) => a[sortBy].valueOf() - b[sortBy].valueOf()
    );
    return sortedArray;
  }
}