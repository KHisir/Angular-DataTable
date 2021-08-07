import { IRow } from './cc-data-table/model/IRow';
import { Column } from './cc-data-table/model/column/column';
import { ColumnType } from './cc-data-table/model/columnType';
import { SortType } from './cc-data-table/model/sortType';
import { SelectOption } from './cc-data-table/model/selectOption';
import { ColumnSelect } from './cc-data-table/model/column/columnSelect';
import { ColumnButton } from './cc-data-table/model/column/columnButton';
import { ConditionEffect } from './cc-data-table/model/condition/conditionEffect';
import { Condition } from './cc-data-table/model/condition/condition';
import { ComparisonOperator } from './cc-data-table/model/condition/comparisonOperator';

export class TableData {
  constructor(data: any) {
    this.Columns = this.generateColumns();
    this.Rows = this.generateRows(data);
  }

  public Columns: Column[] = [];
  public Rows: MyRowObject[] = [];

  private generateColumns(): Column[] {
    return [
      new Column('Id', 'ID', null, ColumnType.Default, 0, true, true, '', true, SortType.Asc),
      new Column('IsActive', 'Checked', null, ColumnType.Checkbox, 0),
      new Column('Name', 'Name', null, ColumnType.Default, 200, true, true, undefined, undefined, undefined, [new Condition(ConditionEffect.BackgroundColor, 'Age', ComparisonOperator.LessThan, 30, undefined, undefined, '#1abc9c'), new Condition(ConditionEffect.Color, 'Age', ComparisonOperator.LessThan, 30, undefined, '#fff', undefined)]),
      new Column('Phone', 'Phone', null, ColumnType.Text, 150, true, true, undefined, undefined, undefined, [new Condition(ConditionEffect.Readonly, 'IsActive')]),
      new ColumnSelect('Gender', 'Gender', null, [new SelectOption('male', 'Person in male'), new SelectOption('female', 'Person in female')], 0, [new Condition(ConditionEffect.Disabled, 'IsActive')]),
      new Column('Age', 'Age', null, ColumnType.Default, 0, true, true, undefined, undefined, undefined, [new Condition(ConditionEffect.Color, '', ComparisonOperator.Between, 23, 30, 'red', undefined)]),
      new Column('Age', 'Progress', null, ColumnType.ProgressbarSlim, 0, true, false, '%'),
      new Column('Icon', 'Icon', null, ColumnType.Icon, 0),
      new Column('Image', 'Image', null, ColumnType.Image, 0),
      new Column('Address', 'Address', null, ColumnType.Default, 387.8, true, true),
      new ColumnButton('', 'Button', 'primaryButtonOnclick', undefined, undefined, 0, [new Condition(ConditionEffect.Disabled, 'IsActive')])
    ];
  }

  private generateRows(data: any): MyRowObject[] {
    const rows: MyRowObject[] = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < data.length; i++) {
      rows.push(
        new MyRowObject(
          data[i].id,
          data[i].name,
          data[i].phone,
          data[i].gender,
          data[i].age,
          data[i].address,
          data[i].isActive,
          data[i].icon,
          '../assets/img/angular.svg',
          '',
          ''
        )
      );
    }

    return rows;
  }
}

export class MyRowObject implements IRow {
  public Id: number;
  public Name: string;
  public Phone: string;
  public Gender: string;
  public Age: number;
  public Address: string;
  public IsActive: boolean = false;
  public Icon: string = '';
  public Image: string = '';

  Color: string = '';
  BackgroundColor: string = '';

  constructor(
    id: number,
    name: string,
    phone: string,
    gender: string,
    age: number,
    address: string,
    isActive: boolean = false,
    icon: string = '',
    image: string = '',
    color: string = '',
    bgColor: string = '',
  ) {
    // my own props:
    this.Id = id;
    this.Name = name;
    this.Phone = phone;
    this.Gender = gender;
    this.Age = age;
    this.Address = address;
    this.IsActive = isActive;
    this.Icon = icon;
    this.Image = image;

    // interface (IRow) props:
    this.Color = color;
    this.BackgroundColor = bgColor;
  }
}
