import { ISelectOption } from './ISelectOptiont';

export class SelectOption implements ISelectOption {
  constructor(key: any, value: any) {
    this.Key = key;
    this.Value = value;
  }

  Key: any;
  Value: any;
}
