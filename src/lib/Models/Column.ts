import { DataType, SortDirection } from '../enums';
import { Field } from '../types';
import { PopupPosition } from './PopupPosition';

export class Column {
  public colGroup?: React.ColHTMLAttributes<HTMLElement>;
  public dataType?: DataType;
  public field?: Field;
  public filterRowOperator?: any;
  public filterRowValue?: any;
  public headerFilterValues?: any[];
  public headerFilterPopupPosition?: PopupPosition;
  public isHeaderFilterPopupShown?: boolean;
  public isEditable?: boolean;
  public isResizable?: boolean;
  public isSortable?: boolean;
  public key!: string;
  public sortDirection?: SortDirection;
  public sortIndex?: number;
  public style?: React.CSSProperties;
  public title?: string;
  public visible?: boolean;
  public width?: number | string;
  public getGroupKey?: (rowData: any) => string
}
