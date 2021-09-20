import { ColumnType } from '../columnType';
import { SortType } from '../sortType';
import { Condition } from '../condition/condition';
import { Sorter } from '../sorter';

export class Column {
  public Prop: string;
  public Name: string;
  public Type: ColumnType;
  public Sortable: boolean;
  public SortType: SortType;
  public SubProp: string|null;
  public Width: number;
  public Enabled: boolean;
  public WidthOrigin!: number;
  public ShowSearch: boolean;
  public SearchText: string;
  public Unit: string;
  public Condtion: Condition[];

  constructor(
    prop: string,
    name: string,
    subProp: string|null = null,
    type: ColumnType = ColumnType.Default,
    width: number = 240,
    enabled: boolean = true,
    showSearch: boolean = false,
    unit: string = '',
    sortable: boolean = true,
    sortType: SortType = SortType.None,
    condtion: Condition[] = []
  ) {
    this.Prop = prop;
    this.Name = name;
    this.SubProp = subProp;
    this.Type = type;
    this.Width = width;
    this.Enabled = enabled;
    this.ShowSearch = showSearch;
    this.Unit = unit;
    this.SortType = sortType;
    this.Sortable = sortable;
    this.Condtion = condtion;
    this.SearchText = '';

    if (this.WidthOrigin === undefined) {
      this.WidthOrigin = this.Width;
    }
  }

  sort(contex: any): void {
    if (this.SortType === SortType.Asc) {
      this.SortType = SortType.Desc;
    } else if (this.SortType === SortType.Desc) {
      this.SortType = SortType.None;
    } else {
      this.SortType = SortType.Asc;
    }

    contex.columns.forEach((item: Column) => {
      if (this.Prop !== item.Prop) {
        item.SortType = SortType.None;
      }
    });

    if (contex.clientsideSorting) {
      if (this.SortType !== SortType.None) {
        const reverse: boolean = (this.SortType === SortType.Asc) ? false : true;
        if (typeof contex.getCellValue(this, contex.rows[0]) === 'string') {
          contex.rows = Sorter.sort(contex.rows, reverse, this.Prop);
        } else if (typeof contex.getCellValue(this, contex.rows[0]) === 'number') {
          contex.rows = Sorter.sort(contex.rows, reverse, this.Prop, true);
        } else if (typeof contex.getCellValue(this, contex.rows[0]) === 'boolean') {
          contex.rows = Sorter.sort(contex.rows, reverse, this.Prop, false, true);
        }
      } else {
        contex.rows = contex.data.slice(
          contex.pager.StartIndex,
          contex.pager.EndIndex + 1
        );
      }

    } else {
      contex.sortTriggered.emit(this);
    }
  }

  search(contex: any): void {
    if (contex.clientsideSearch === true) {

      const columnsWithSearch: Column[] = contex.columns.filter((column: Column) => column.SearchText !== '');
      const filter: any = {};
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < columnsWithSearch.length; i++) {
        filter[columnsWithSearch[i].Prop] = columnsWithSearch[i].SearchText;
      }

      // tslint:disable-next-line:only-arrow-functions
      contex.data = contex.rawData.filter(function(item: any) {
        for (const key in filter) {
          if (item[key] === undefined || !String(item[key]).toLowerCase().includes(String(filter[key]).toLowerCase())) {
            return false;
          }
        }
        return true;
      });

      contex.rows = contex.data;
    } else {
      // contex.searchTriggered.emit(contex.columns);
      contex.searchTriggered.emit(this);
      
    }
  }
}
