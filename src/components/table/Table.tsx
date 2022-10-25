import { useRef } from "react";
import useOnResizeColumns from "../../hooks/useOnResizeColumns";
import ColumnsGrouping from "../columns/columns-grouping/ColumnsGrouping";
import DefaultColumns from "../columns/default-columns/DefaultColumns";
import { TableContainer } from "./Table.styles";
import { TTableProps } from "./Table.types";

const Table = ({ columns, columnGrouping }: TTableProps) => {
  const tableRef = useRef<HTMLDivElement>(null);

  const { onResize } = useOnResizeColumns({ tableRef, columnGrouping });

  return (
    <TableContainer ref={tableRef}>TableContainer
      {columnGrouping ? (
        <ColumnsGrouping columns={columns} onResize={onResize} />
      ) : (
        <DefaultColumns columns={columns} onResize={onResize} />
      )}
    </TableContainer>
  );
};

export default Table;
