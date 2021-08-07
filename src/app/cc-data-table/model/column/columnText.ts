import { Column } from './column';
import { SortType } from '../sortType';
import { ColumnType } from '../columnType';
import { Condition } from '../condition/condition';

export class ColumnText extends Column {
  public ValidationText: string;

  constructor(
    prop: string,
    name: string,
    subProp: string|null = null,
    validationText: string = '',
    width: number = 240,
    showSearch: boolean = true,
    unit: string = '',
    sortable: boolean = true,
    sortType: SortType = SortType.None,
    condtion: Condition[] = []
  ) {
    super(prop, name, subProp, ColumnType.Text, width, true, showSearch, unit, sortable, sortType, condtion);
    this.ValidationText = validationText;
  }
}

