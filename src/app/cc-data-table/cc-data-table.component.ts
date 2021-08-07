import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Pager } from './cc-paginator/pager';
import { Column } from './model/column/column';
import { ColumnType } from './model/columnType';
import { ConditionEffect } from './model/condition/conditionEffect';
import { SortType } from './model/sortType';

@Component({
  selector: 'app-cc-data-table',
  templateUrl: './cc-data-table.component.html',
  styleUrls: ['./cc-data-table.component.scss'],
  animations: [
    trigger('panelInOut', [
      transition('void => *', [
        style({ opacity: 0, top: '45%' }),
        animate(350)
      ]),
      transition('* => void', [
        animate(350, style({ opacity: 1, top: '0%' }))
      ])
    ])
  ]
})
export class CcDataTableComponent implements OnInit {
  private _data: any;
  private _column: any[] = [];
  @Input() parent: any;
  @Input() height: string = '500px'; // For automatic adaptation to your outer container => here 100% and outside any value as px!
  @Input() showMenu: boolean = false;
  @Input() textAlign: string = 'center'; // left, center, right
  @Input() showIndexColumn: boolean = true;
  @Input() bordered: boolean = true;
  @Input() stripedRows: boolean = true;
  @Input() showLoadingIndicator: boolean = false;
  @Input() frozenColumns: number = 1;
  @Input() frozenRows: number = 1;
  @Input() clientsideSearch: boolean = true;
  @Input() clientsideSorting: boolean = true;
  @Input() clientsidePaging: boolean = true;
  @Input() pageSize: number = 50;
  @Input() pageSizeOptions: number[] = [10, 25, 50, 100, 500];
  @Input() maxDisplayedTotalPages: number = 5;
  @Input() paginatorBordered: boolean = false;
  @Input()
  public set data(v: any) {
    this._data = v;

    if (v !== undefined) {
      try {
        this.showLoadingIndicator = true;

        if (this.clientsidePaging === true) {
          this.rows = this._data.slice(0, this.pageSize);
        } else {
          this.rows = this.data;
        }

        this.showLoadingIndicator = false;
      } catch (error) {
        console.error(error);
        this.showLoadingIndicator = false;
      }
    }
  }
  public get data(): any {
    return this._data;
  }

  @Input()
  public set columns(value: any[]) {
    this._column = value;

    if (value !== undefined) {
      this.columnWidthHandling();
    }
  }
  public get columns(): any[] {
    return this._column;
  }

  @Output() searchTriggered = new EventEmitter<Column>();
  @Output() sortTriggered = new EventEmitter<Column>();
  @Output() paginationTriggered = new EventEmitter<Pager>();
  @Output() valueChanged = new EventEmitter<any>();

  componentId: string;
  start: any;
  pressed: boolean = false;
  startX: number = 0;
  startWidth: any;
  indexColumnWidth: number = 50;

  ColumnType: any = ColumnType;
  SortType: any = SortType;

  pagedItems: any[] = [];
  rows: any;

  showColumnSelection: boolean = false;
  columnsFitToContent: boolean = false;

  @ViewChild('tableContainer', { static: true }) elem!: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.columnWidthHandling();
  }

  constructor(public renderer: Renderer2, private ref: ChangeDetectorRef) {
    this.componentId = this.createComponentId();
  }

  ngOnInit() {
    // this.pressed = false;
    // this.startX = 0;

    const self: any = this;

    // Draggable DIV Element (menu button)
    document.addEventListener('DOMContentLoaded', (event) => {
      // Make the DIV element draggagle:
      const dragElem: any = document.getElementById('column-selector');
      dragElement(dragElem);

      function dragElement(elem: HTMLElement) {
        let pos1 = 0;
        let pos2 = 0;
        let pos3 = 0;
        let pos4 = 0;
        const dragElemMover: any = document.getElementById(elem.id + 'column-selector-mover');
        if (dragElemMover) {
          /* if present, the menu-mover is where you move the DIV from:*/
          dragElemMover.onmousedown = dragMouseDown;
        } else {
          /* otherwise, move the DIV from anywhere inside the DIV:*/
          elem.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e: any) {
          e = e || window.event;
          e.preventDefault();
          // get the mouse cursor position at startup:
          pos3 = e.clientX;
          pos4 = e.clientY;

          document.onmouseup = closeDragElement;
          // call a function whenever the cursor moves:
          document.onmousemove = elementDrag;
        }

        function elementDrag(e: any) {
          e = e || window.event;
          e.preventDefault();

          // calculate the new cursor position:
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;

          if (pos3 < 40 || pos3 > (self.elem.nativeElement.offsetWidth - 20) || pos4 < 20 || pos4 > (self.elem.nativeElement.offsetHeight - 80)) {
            return;
          }

          // set the element's new position:
          elem.style.top = (elem.offsetTop - pos2) + 'px';
          elem.style.left = (elem.offsetLeft - pos1) + 'px';
        }

        function closeDragElement() {
          /* stop moving when mouse button is released:*/
          document.onmouseup = null;
          document.onmousemove = null;
        }
      }
    });
  }

  setValue(column: Column, rowIndex: number, event: any): void {
    if (event.target.type === 'checkbox') {
      this.rows[rowIndex][column.Prop] = event.target.checked;
      const checkedRows: any[] = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.rows.length; i++) {
        if (this.rows[i][column.Prop] === true) {
          checkedRows.push(this.rows[i]);
        }
      }
      this.valueChanged.emit(checkedRows); // send all selected rows!
      // this.valueChanged.emit(this.rows[rowIndex]); // send current selected row!
    } else {
      this.rows[rowIndex][column.Prop] = event.target.value;
      this.valueChanged.emit(this.rows[rowIndex]);
    }
  }

  getCellValue(column: Column, row: any): any {
    const val: any = row[column.Prop];
    if (column.SubProp !== null && typeof val === 'object' && val !== null) {
      return val[column.SubProp];
    } else {
      return val;
    }
  }

  getCellTitle(column: Column, row: any): string {
    if (column.Unit !== '') {
      return this.getCellValue(column, row) + column.Unit;
    } else {
      return this.getCellValue(column, row);
    }
  }

  onMouseDown(event: any): void {
    this.start = event.target;
    this.pressed = true;
    this.startX = event.clientX; // event.x;
    // this.startWidth = $(this.start)
    //   .parent()
    //   .width();
    this.startWidth = this.start.parentElement.clientWidth; // offsetWidth
    this.initResizableColumns();
  }

  onMouseUp(event: any): void {
  }

  initResizableColumns(): void {
    let widthCopy = 0;
    this.renderer.listen('window', 'mousemove', (event: any) => {
      if (this.pressed) {
        const width = this.startWidth + (event.clientX - this.startX);
        // $(this.start)
        //   .parent()
        //   .css({ 'min-width': width, 'max-width': width });
        // const index =
        //   $(this.start)
        //     .parent()
        //     .index() + 1;
        // $('.glowTableBody tr td:nth-child(' + index + ')').css({
        //   'min-width': width,
        //   'max-width': width
        // });
        widthCopy = width;
        // Nachdem colum-resize wird der Wert in die entspr. Width-Eigenschaft des Column's reingeschrieben. Damit z.B. nach pageSize Änderung die neuen Zeilen mit der aktuellen Breite dargestellt werden können!
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.columns.length; i++) {
          // if (this.columns[i].Prop === $(this.start).parent().attr('id')) {
          if (this.columns[i].Prop === this.start.parentElement.id) {
            this.columns[i].Width = width;
            break;
          }
        }
      }
    });
    this.renderer.listen('window', 'mouseup', (event: any) => {
      if (this.pressed) {
        this.pressed = false;
        // console.log(widthCopy);
      }
    });
  }

  public getCountOfColumnsWithoutWidth(): number {
    const count: number = this.columns.filter(
      (item: Column) => item.WidthOrigin <= 0
    ).length;

    return count;
  }

  columnWidthHandling(): void {
    let containerWidth: number = this.elem.nativeElement.offsetWidth;

    if (this.showIndexColumn === true) {
      containerWidth = (containerWidth - this.indexColumnWidth);
    }

    // 1. gesetzte Spaltenbreiten von der Containerbreite abziehen.
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.columns.length; i++) {
      if (this.columns[i].WidthOrigin > 0 && this.columns[i].Enabled === true) {
        containerWidth = (containerWidth - this.columns[i].WidthOrigin);
      }
    }

    const defaultMinWidth: number = 100;
    const countOfColumnsWithoutWidth: number = this.getCountOfColumnsWithoutWidth();

    // 2. Für die ungesetzte Spaltenbreiten die Breite pro Spalte berechnen.
    let columnWidth: number = containerWidth / countOfColumnsWithoutWidth;
    if (columnWidth < defaultMinWidth) {
      columnWidth = defaultMinWidth;
    }

    // 3. Die übriggebliebene Containerbreite auf die restliche Spalten verteilen.
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.columns.length; i++) {
      if (this.columns[i].WidthOrigin <= 0) {
        this.columns[i].Width = columnWidth;
      }
    }
  }

  pagerOnChange(pager: Pager) {
    try {
      this.showLoadingIndicator = true;

      if (this.clientsidePaging === true) {
        this.rows = this.data.slice(
          pager.StartIndex,
          pager.EndIndex + 1
        );
        this.rows = [...this.rows];
      } else {
        this.paginationTriggered.emit(pager);
      }

      this.showLoadingIndicator = false;
    } catch (error) {
      console.error(error);
      this.showLoadingIndicator = false;
    }
  }

  checkAll(column: Column, event: any): void {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.rows.length; i++) {
      this.rows[i][column.Prop] = event.target.checked;
    }
    this.valueChanged.emit(this.rows);
  }

  // toggleSort(column: Column): void {
  //   if (column.SortType === SortType.Asc) {
  //     column.SortType = SortType.Desc;
  //   } else {
  //     column.SortType = SortType.Asc;
  //   }

  //   this.columns.forEach((item: Column) => {
  //     if (column.Prop !== item.Prop) {
  //       item.SortType = SortType.None;
  //     }
  //   });

  //   if (this.clientsideSorting) {
  //     // Todo
  //   } else {
  //     this.sortTriggered.emit(column);
  //   }
  // }

  // searchOnclick(column: Column): void {
  //   if (this.clientsideSearch === true) {
  //     // Todo
  //   } else {
  //     this.searchTriggered.emit(column);
  //   }
  // }

  // buttonOnclick(functionName: string, row: any): void {
  //   this.parent[functionName](row);
  // }

  createComponentId() {
    // tslint:disable-next-line:only-arrow-functions
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      // tslint:disable-next-line:no-bitwise
      const r = Math.random() * 16 | 0;
      // tslint:disable-next-line:no-bitwise
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return 'id-' + v.toString(16);
    });
  }

  setCondition(column: Column, row: any, id: string): void {
    if (column.Condtion.length <= 0) {
      return;
    }

    const elem: any = document.getElementById(id);

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < column.Condtion.length; i++) {
      const condition = column.Condtion[i];

      if (condition.Effect === ConditionEffect.Disabled) {
        condition.setDisabled(elem, column, row);
      } else if (condition.Effect === ConditionEffect.Readonly) {
        condition.setReadonly(elem, column, row);
      } else if (condition.Effect === ConditionEffect.BackgroundColor || condition.Effect === ConditionEffect.Color) {
        condition.setColorOrBackgroundColor(elem, column, row);
      }
    }
  }

  closeColumnSelection(): void {
    this.showColumnSelection = false;

    if (this.columnsFitToContent === true) {
      let containerWidth: number = 0;
      if (this.showIndexColumn === true) {
        containerWidth = (this.elem.nativeElement.offsetWidth - this.indexColumnWidth);
      } else {
        containerWidth = this.elem.nativeElement.offsetWidth;
      }

      const widthPerColumn = containerWidth / this.columns.filter(column => column.Enabled === true).length;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.columns.length; i++) {
        if (this.columns[i].Enabled === true) {
          this.columns[i].Width = widthPerColumn;
        }
      }
    } else {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.columns.length; i++) {
        this.columns[i].Width = this.columns[i].WidthOrigin;
      }
      this.columnWidthHandling();
    }
  }

}
