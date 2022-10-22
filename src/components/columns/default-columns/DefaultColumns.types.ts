import { IOnResizeProps } from "../../../hooks/useOnResizeColumns";
import { ColumnType } from "../Columns.types";

export interface IDefaultColumns {
  columns: ColumnType[];
  onResize: ({ columnHeaderIndex, columnIndex }: IOnResizeProps) => void;
}
