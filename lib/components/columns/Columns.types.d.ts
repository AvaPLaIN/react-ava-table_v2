export declare type ColumnType = {
    id: string;
    label: string;
};
export declare type ColumnHeaderType = {
    headerName: string;
    children: ColumnType[];
};
interface ColumnGroupingType {
    columnGrouping: boolean;
}
export interface IColumnsWithGrouping extends ColumnGroupingType {
    columnGrouping: true;
    columns: ColumnHeaderType[];
}
export interface IColumnsWithoutGrouping extends ColumnGroupingType {
    columnGrouping: false;
    columns: ColumnType[];
}
export {};
//# sourceMappingURL=Columns.types.d.ts.map