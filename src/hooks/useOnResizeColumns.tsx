import React, { useCallback, useEffect, useRef, useState } from "react";
import spreadNumberIntoEqualParts from "../utils/spreadNumberIntoEqualParts";

interface IUseOnResizeColumnsProps {
  tableRef: React.RefObject<HTMLDivElement>;
  columnGrouping: boolean;
}

export interface IOnResizeProps {
  columnHeaderIndex?: number;
  columnIndex?: number;
}

type ColumnRefType = Array<HTMLDivElement[]>;

const useOnResizeColumns = ({
  tableRef,
  columnGrouping,
}: IUseOnResizeColumnsProps) => {
  const [columnHeaderResizeIndex, setColumnHeaderResizeIndex] =
    useState<number | null>(null);
  const [columnResizeIndex, setColumnResizeIndex] =
    useState<number | null>(null);
  const [columnRefs, setColumnRefs] = useState<ColumnRefType>([]);
  const [columnHeaderRefs, setColumnHeaderRefs] =
    useState<NodeListOf<HTMLDivElement>>();
  const indexOfColumn = useRef(1);

  useEffect(() => {
    const columnHeaderRefs = columnGrouping
      ? tableRef.current?.children[0].querySelectorAll<HTMLDivElement>(
          "div[data-name=column-header]"
        )
      : undefined;

    let sortedColumnRefs = [] as ColumnRefType;
    const columnRefs = columnGrouping
      ? tableRef.current?.children[1].querySelectorAll<HTMLDivElement>(
          "div[data-name=column]"
        )
      : tableRef.current?.children[0].querySelectorAll<HTMLDivElement>(
          "div[data-name=column]"
        );

    columnRefs?.forEach((column, index) => {
      const columnHeaderId = parseInt(
        column.getAttribute("data-header-id") || `${index}`,
        10
      );
      if (!sortedColumnRefs[columnHeaderId])
        sortedColumnRefs[columnHeaderId] = [];
      sortedColumnRefs[columnHeaderId].push(column);
    });

    setColumnHeaderRefs(columnHeaderRefs);
    setColumnRefs(sortedColumnRefs);
  }, [tableRef, columnGrouping]);

  const handleOnMouseMoveColumnHeader = useCallback(
    (event: any) => {
      let gridColumnLayout = "";
      let gridColumnHeadersLayout = "";

      columnHeaderRefs?.forEach((column, index) => {
        if (index === columnHeaderResizeIndex) {
          const beforeWidth = column.offsetWidth;
          const width = event.clientX - column.offsetLeft;
          gridColumnHeadersLayout += `${width}px `;

          const n = column.children.length;
          const d = spreadNumberIntoEqualParts(
            width - beforeWidth,
            n,
            indexOfColumn.current
          );
          indexOfColumn.current = (indexOfColumn.current % n) + 1;

          columnRefs[index].forEach((col, idx) => {
            const colWidth = col.offsetWidth + d[idx];
            gridColumnLayout += `${colWidth}px `;
          });
        } else {
          gridColumnHeadersLayout += `${column.offsetWidth}px `;

          columnRefs[index].forEach((col, idx) => {
            const colWidth = col.offsetWidth;
            gridColumnLayout += `${colWidth}px `;
          });
        }
      });

      console.log("gridColumnHeadersLayout: ", gridColumnHeadersLayout);
      console.log("gridColumnLayout: ", gridColumnLayout);
    },
    [columnHeaderRefs, columnHeaderResizeIndex, columnRefs]
  );

  const handleOnMouseMoveColumn = useCallback(() => {}, []);
  const handleOnMouseUp = useCallback(() => {}, []);

  const removeListeners = useCallback(() => {
    window.removeEventListener("mousemove", handleOnMouseMoveColumnHeader);
    window.removeEventListener("mousemove", handleOnMouseMoveColumn);
    window.removeEventListener("mouseup", handleOnMouseUp);
    setColumnHeaderResizeIndex(null);
    setColumnResizeIndex(null);
  }, [handleOnMouseMoveColumn, handleOnMouseMoveColumnHeader, handleOnMouseUp]);

  useEffect(() => {
    if (columnHeaderResizeIndex !== null && columnResizeIndex === null) {
      window.addEventListener("mousemove", handleOnMouseMoveColumnHeader);
      window.addEventListener("mouseup", handleOnMouseUp);
    }

    if (columnHeaderResizeIndex !== null && columnResizeIndex !== null) {
      window.addEventListener("mousemove", handleOnMouseMoveColumn);
      window.addEventListener("mouseup", handleOnMouseUp);
    }

    return () => {
      removeListeners();
    };
  }, [
    columnHeaderResizeIndex,
    columnResizeIndex,
    handleOnMouseMoveColumn,
    handleOnMouseMoveColumnHeader,
    handleOnMouseUp,
    removeListeners,
  ]);

  const onResize = ({ columnHeaderIndex, columnIndex }: IOnResizeProps) => {
    setColumnHeaderResizeIndex(columnHeaderIndex || null);
    setColumnResizeIndex(columnIndex || null);
  };

  return { onResize };
};

export default useOnResizeColumns;
