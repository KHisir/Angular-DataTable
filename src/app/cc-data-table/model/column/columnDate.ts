import { Column } from './column';
import { ColumnType } from '../columnType';
import { SortType } from '../sortType';
import { Condition } from '../condition/condition';

export enum DateSelectionType {
  None = 0,
  Date = 1,
  Time = 2,
  DateTime = 3,
  Month = 4,
  Year = 5,
}

export enum PickerType {
  None = 0,
  Simple = 1,
  Range = 2,
}

export class ColumnDate extends Column {
  public DateSelectionType: DateSelectionType;
  public PickerType: PickerType;

  constructor(
    prop: string,
    name: string,
    dateSelectionType: DateSelectionType = DateSelectionType.DateTime,
    pickerType: PickerType = PickerType.Simple,
    width: number = 0,
    condtion: Condition[] = []
  ) {
    super(prop, name, null, ColumnType.Date, width, true, false, '', false, SortType.None, condtion);
    this.DateSelectionType = dateSelectionType;
    this.PickerType = pickerType;
  }
}
