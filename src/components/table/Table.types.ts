import { ColumnHeaderType } from "../columns/columns-grouping/ColumnsGrouping.types";
import { ColumnType } from "../columns/Columns.types";

type DefaultColumnsType = {
  columns: ColumnType[];
  columnGrouping: false;
};

type ColumnsGroupingType = {
  columns: ColumnHeaderType[];
  columnGrouping: true;
};

export interface ITableProps {}

export type TTableProps = ITableProps &
  (DefaultColumnsType | ColumnsGroupingType);
