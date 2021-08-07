import { Column } from './column';
import { SelectOption } from '../selectOption';
import { ColumnType } from '../columnType';
import { SortType } from '../sortType';
import { Condition } from '../condition/condition';

export class ColumnSelect extends Column {
  public SelectOptions: SelectOption[];

  constructor(
    prop: string,
    name: string,
    subProp: string|null = null,
    options: SelectOption[] = [],
    width: number = 0,
    condtion: Condition[] = []
  ) {
    super(prop, name, subProp, ColumnType.Select, width, true, false, '', false, SortType.None, condtion);
    this.SelectOptions = options;
  }
}
