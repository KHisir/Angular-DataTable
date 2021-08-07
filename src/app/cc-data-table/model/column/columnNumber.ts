import { Column } from './column';
import { SortType } from '../sortType';
import { ColumnType } from '../columnType';
import { Condition } from '../condition/condition';

export class ColumnNumber extends Column {
  public MinValue: number;
  public MaxValue: number;
  public ValidationText: string;

  constructor(
    prop: string,
    name: string,
    subProp: string|null = null,
    minValue: number,
    maxValue: number,
    validationText: string = '',
    width: number = 240,
    showSearch: boolean = true,
    unit: string = '',
    sortable: boolean = true,
    sortType: SortType = SortType.None,
    condtion: Condition[] = []
  ) {
    super(prop, name, subProp, ColumnType.Number, width, true, showSearch, unit, sortable, sortType, condtion);
    this.MinValue = minValue;
    this.MaxValue = maxValue;
    this.ValidationText = validationText;
  }
}
