import { ConditionEffect } from './conditionEffect';
import { ComparisonOperator } from './comparisonOperator';
import { Column } from '../column/column';

export class Condition {
  public Effect: ConditionEffect;
  public Prop: string;
  public ComparisonOperator: ComparisonOperator|null;
  public Value1: string|number|null;
  public Value2: number|null;
  public Color: string;
  public BackgroundColor: string;


  constructor(
    effect: ConditionEffect,
    prop: string = '',
    comparisonOperator: ComparisonOperator|null = null,
    value1: string|number|null = null,
    value2: number|null = null,
    color: string = '',
    backgroundColor: string = ''
  ) {
    this.Effect = effect;
    this.Prop = prop;
    this.ComparisonOperator = comparisonOperator;
    this.Value1 = value1;
    this.Value2 = value2;
    this.Color = color;
    this.BackgroundColor = backgroundColor;
  }

  setDisabled(elem: any, column: Column, row: any): void {
    if (this.Effect === ConditionEffect.Disabled) {
      if (elem !== null) {
        let cellVal: any;

        if (this.Prop !== '' && this.Prop !== null && this.ComparisonOperator === null) {
          cellVal = row[this.Prop];
          if (cellVal === true) {
            elem.setAttribute('disabled', 'disabled');
          } else {
            elem.removeAttribute('disabled');
          }
        } else if (this.ComparisonOperator !== null) {
          if (this.Prop !== '' && this.Prop !== null) {
            cellVal = row[this.Prop];
          } else {
            cellVal = row[column.Prop];
          }

          switch (this.ComparisonOperator) {
            case ComparisonOperator.Contains:
              if (typeof cellVal === 'string' && this.Value1 !== null && typeof this.Value1 === 'string') {
                if (cellVal.includes(this.Value1)) {
                  elem.setAttribute('disabled', 'disabled');
                } else {
                  elem.removeAttribute('disabled');
                }
              }
              break;
            case ComparisonOperator.EqualTo:
              if (typeof cellVal === 'number' && this.Value1 !== null && typeof this.Value1 === 'number') {
                if (cellVal === this.Value1) {
                  elem.setAttribute('disabled', 'disabled');
                } else {
                  elem.removeAttribute('disabled');
                }
              }
              break;
            case ComparisonOperator.NotEqual:
              if (typeof cellVal !== 'number' && this.Value1 !== null && typeof this.Value1 === 'number') {
                if (cellVal === this.Value1) {
                  elem.setAttribute('disabled', 'disabled');
                } else {
                  elem.removeAttribute('disabled');
                }
              }
              break;
            case ComparisonOperator.GreaterThan:
              if (typeof cellVal === 'number' && this.Value1 !== null && typeof this.Value1 === 'number') {
                if (cellVal > this.Value1) {
                  elem.setAttribute('disabled', 'disabled');
                } else {
                  elem.removeAttribute('disabled');
                }
              }
              break;
            case ComparisonOperator.LessThan:
              if (typeof cellVal === 'number' && this.Value1 !== null && typeof this.Value1 === 'number') {
                if (cellVal < this.Value1) {
                  elem.setAttribute('disabled', 'disabled');
                } else {
                  elem.removeAttribute('disabled');
                }
              }
              break;
            case ComparisonOperator.GreaterThanOrEqualTo:
              if (typeof cellVal === 'number' && this.Value1 !== null && typeof this.Value1 === 'number') {
                if (cellVal >= this.Value1) {
                  elem.setAttribute('disabled', 'disabled');
                } else {
                  elem.removeAttribute('disabled');
                }
              }
              break;
            case ComparisonOperator.LessThanOrEqualTo:
              if (typeof cellVal === 'number' && this.Value1 !== null && typeof this.Value1 === 'number') {
                if (cellVal <= this.Value1) {
                  elem.setAttribute('disabled', 'disabled');
                } else {
                  elem.removeAttribute('disabled');
                }
              }
              break;
            case ComparisonOperator.Between:
              if (typeof cellVal === 'number' && this.Value1 !== null && typeof this.Value1 === 'number' && this.Value2 !== null && typeof this.Value2 === 'number') {
                if (cellVal > this.Value1 && cellVal < this.Value2) {
                  elem.setAttribute('disabled', 'disabled');
                } else {
                  elem.removeAttribute('disabled');
                }
              }
              break;

            default:
              break;
          }
        }
      }
    }
  }

  setReadonly(elem: any, column: Column, row: any): void {
    if (elem !== null) {
      let cellVal: any;

      if (this.Prop !== '' && this.Prop !== null && this.ComparisonOperator === null) {
        cellVal = row[this.Prop];
        if (cellVal === true) {
          elem.readOnly = true;
        } else {
          elem.readOnly = false;
        }
      } else if (this.ComparisonOperator !== null) {
        if (this.Prop !== '' && this.Prop !== null) {
          cellVal = row[this.Prop];
        } else {
          cellVal = row[column.Prop];
        }

        switch (this.ComparisonOperator) {
          case ComparisonOperator.Contains:
            if (typeof cellVal === 'string' && this.Value1 !== null && typeof this.Value1 === 'string') {
              if (cellVal.includes(this.Value1)) {
                elem.readOnly = true;
              } else {
                elem.readOnly = false;
              }
            }
            break;
          case ComparisonOperator.EqualTo:
            if (typeof cellVal === 'number' && this.Value1 !== null && typeof this.Value1 === 'number') {
              if (cellVal === this.Value1) {
                elem.readOnly = true;
              } else {
                elem.readOnly = false;
              }
            }
            break;
          case ComparisonOperator.NotEqual:
            if (typeof cellVal !== 'number' && this.Value1 !== null && typeof this.Value1 === 'number') {
              if (cellVal === this.Value1) {
                elem.readOnly = true;
              } else {
                elem.readOnly = false;
              }
            }
            break;
          case ComparisonOperator.GreaterThan:
            if (typeof cellVal === 'number' && this.Value1 !== null && typeof this.Value1 === 'number') {
              if (cellVal > this.Value1) {
                elem.readOnly = true;
              } else {
                elem.readOnly = false;
              }
            }
            break;
          case ComparisonOperator.LessThan:
            if (typeof cellVal === 'number' && this.Value1 !== null && typeof this.Value1 === 'number') {
              if (cellVal < this.Value1) {
                elem.readOnly = true;
              } else {
                elem.readOnly = false;
              }
            }
            break;
          case ComparisonOperator.GreaterThanOrEqualTo:
            if (typeof cellVal === 'number' && this.Value1 !== null && typeof this.Value1 === 'number') {
              if (cellVal >= this.Value1) {
                elem.readOnly = true;
              } else {
                elem.readOnly = false;
              }
            }
            break;
          case ComparisonOperator.LessThanOrEqualTo:
            if (typeof cellVal === 'number' && this.Value1 !== null && typeof this.Value1 === 'number') {
              if (cellVal <= this.Value1) {
                elem.readOnly = true;
              } else {
                elem.readOnly = false;
              }
            }
            break;
          case ComparisonOperator.Between:
            if (typeof cellVal === 'number' && this.Value1 !== null && typeof this.Value1 === 'number' && this.Value2 !== null && typeof this.Value2 === 'number') {
              if (cellVal > this.Value1 && cellVal < this.Value2) {
                elem.readOnly = true;
              } else {
                elem.readOnly = false;
              }
            }
            break;

          default:
            break;
        }
      }
    }
  }

  setColorOrBackgroundColor(elem: any, column: Column, row: any): void {
    if (elem !== null) {
      let cellVal: any;

      if (this.Prop !== '' && this.Prop !== null && this.ComparisonOperator === null) {
        cellVal = row[this.Prop];
        if (cellVal === true) {
          if (this.Effect === ConditionEffect.BackgroundColor) {
            elem.style.backgroundColor = this.BackgroundColor;
          } else {
            elem.style.color = this.Color;
          }
        } else {
          if (this.Effect === ConditionEffect.BackgroundColor) {
            elem.style.backgroundColor = '';
          } else {
            elem.style.color = '';
          }
        }
      } else if (this.ComparisonOperator !== null) {
        if (this.Prop !== '' && this.Prop !== null) {
          cellVal = row[this.Prop];
        } else {
          cellVal = row[column.Prop];
        }

        switch (this.ComparisonOperator) {
          case ComparisonOperator.Contains:
            if (typeof cellVal === 'string' && this.Value1 !== null && typeof this.Value1 === 'string') {
              if (cellVal.includes(this.Value1)) {
                if (this.Effect === ConditionEffect.BackgroundColor) {
                  elem.style.backgroundColor = this.BackgroundColor;
                } else {
                  elem.style.color = this.Color;
                }
              } else {
                if (this.Effect === ConditionEffect.BackgroundColor) {
                  elem.style.backgroundColor = '';
                } else {
                  elem.style.color = '';
                }
              }
            }
            break;
          case ComparisonOperator.EqualTo:
            if (typeof cellVal === 'number' && this.Value1 !== null && typeof this.Value1 === 'number') {
              if (cellVal === this.Value1) {
                if (this.Effect === ConditionEffect.BackgroundColor) {
                  elem.style.backgroundColor = this.BackgroundColor;
                } else {
                  elem.style.color = this.Color;
                }
              } else {
                if (this.Effect === ConditionEffect.BackgroundColor) {
                  elem.style.backgroundColor = '';
                } else {
                  elem.style.color = '';
                }
              }
            }
            break;
          case ComparisonOperator.NotEqual:
            if (typeof cellVal !== 'number' && this.Value1 !== null && typeof this.Value1 === 'number') {
              if (cellVal === this.Value1) {
                if (this.Effect === ConditionEffect.BackgroundColor) {
                  elem.style.backgroundColor = this.BackgroundColor;
                } else {
                  elem.style.color = this.Color;
                }
              } else {
                if (this.Effect === ConditionEffect.BackgroundColor) {
                  elem.style.backgroundColor = '';
                } else {
                  elem.style.color = '';
                }
              }
            }
            break;
          case ComparisonOperator.GreaterThan:
            if (typeof cellVal === 'number' && this.Value1 !== null && typeof this.Value1 === 'number') {
              if (cellVal > this.Value1) {
                if (this.Effect === ConditionEffect.BackgroundColor) {
                  elem.style.backgroundColor = this.BackgroundColor;
                } else {
                  elem.style.color = this.Color;
                }
              } else {
                if (this.Effect === ConditionEffect.BackgroundColor) {
                  elem.style.backgroundColor = '';
                } else {
                  elem.style.color = '';
                }
              }
            }
            break;
          case ComparisonOperator.LessThan:
            if (typeof cellVal === 'number' && this.Value1 !== null && typeof this.Value1 === 'number') {
              if (cellVal < this.Value1) {
                if (this.Effect === ConditionEffect.BackgroundColor) {
                  elem.style.backgroundColor = this.BackgroundColor;
                } else {
                  elem.style.color = this.Color;
                }
              } else {
                if (this.Effect === ConditionEffect.BackgroundColor) {
                  elem.style.backgroundColor = '';
                } else {
                  elem.style.color = '';
                }
              }
            }
            break;
          case ComparisonOperator.GreaterThanOrEqualTo:
            if (typeof cellVal === 'number' && this.Value1 !== null && typeof this.Value1 === 'number') {
              if (cellVal >= this.Value1) {
                if (this.Effect === ConditionEffect.BackgroundColor) {
                  elem.style.backgroundColor = this.BackgroundColor;
                } else {
                  elem.style.color = this.Color;
                }
              } else {
                if (this.Effect === ConditionEffect.BackgroundColor) {
                  elem.style.backgroundColor = '';
                } else {
                  elem.style.color = '';
                }
              }
            }
            break;
          case ComparisonOperator.LessThanOrEqualTo:
            if (typeof cellVal === 'number' && this.Value1 !== null && typeof this.Value1 === 'number') {
              if (cellVal <= this.Value1) {
                if (this.Effect === ConditionEffect.BackgroundColor) {
                  elem.style.backgroundColor = this.BackgroundColor;
                } else {
                  elem.style.color = this.Color;
                }
              } else {
                if (this.Effect === ConditionEffect.BackgroundColor) {
                  elem.style.backgroundColor = '';
                } else {
                  elem.style.color = '';
                }
              }
            }
            break;
          case ComparisonOperator.Between:
            if (typeof cellVal === 'number' && this.Value1 !== null && typeof this.Value1 === 'number' && this.Value2 !== null && typeof this.Value2 === 'number') {
              if (cellVal > this.Value1 && cellVal < this.Value2) {
                if (this.Effect === ConditionEffect.BackgroundColor) {
                  elem.style.backgroundColor = this.BackgroundColor;
                } else {
                  elem.style.color = this.Color;
                }
              } else {
                if (this.Effect === ConditionEffect.BackgroundColor) {
                  elem.style.backgroundColor = '';
                } else {
                  elem.style.color = '';
                }
              }
            }
            break;

          default:
            break;
        }
      }
    }
  }
}
