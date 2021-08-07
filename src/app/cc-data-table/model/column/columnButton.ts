import { Column } from './column';
import { ColumnType } from '../columnType';
import { SortType } from '../sortType';
import { Condition } from '../condition/condition';

export enum ButtonType {
  Default = 1,
  Info = 2,
  Warning = 3,
  Danger = 4,
  Link = 5,
}

export class ColumnButton extends Column {
  public ButtonText: string;
  public ButtonType: ButtonType;
  public FunctionName: string;

  constructor(
    prop: string,
    name: string,
    functionName: string,
    buttonText: string = 'Click me!',
    buttonType: ButtonType = ButtonType.Default,
    width: number = 0,
    condtion: Condition[] = []
  ) {
    super(prop, name, null, ColumnType.Button, width, true, false, '', false, SortType.None, condtion);
    this.FunctionName = functionName;
    this.ButtonText = buttonText;
    this.ButtonType = buttonType;
  }

  call(contex: any, functionName: string, row: any): void {
    contex.parent[functionName](row);
  }
}
