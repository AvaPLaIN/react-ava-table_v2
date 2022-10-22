import { IOnResizeProps } from "../../../hooks/useOnResizeColumns";
import { ColumnType } from "../Columns.types";

export type ColumnHeaderType = {
  headerName: string;
  children: ColumnType[];
};

export interface IColumnsGrouping {
  columns: ColumnHeaderType[];
  onResize: ({ columnHeaderIndex, columnIndex }: IOnResizeProps) => void;
}
