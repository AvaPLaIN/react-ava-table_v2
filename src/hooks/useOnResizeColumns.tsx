import React, { useCallback, useEffect, useRef, useState } from "react";
import spreadNumberIntoEqualParts from "../utils/spreadNumberIntoEqualParts";

interface IUseOnResizeColumnsProps {
  tableRef: React.RefObject<HTMLDivElement>;
  columnGrouping: boolean;
}

export interface IOnResizeProps {
  columnHeaderIndex?: number | null;
  columnIndex?: number | null;
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

  const columnGroupContainer = tableRef.current?.querySelector(
    "div[data-name=column-group-container]"
  ) as HTMLElement;
  const columnChildrenContainer = tableRef.current?.querySelector(
    "div[data-name=column-children-container]"
  ) as HTMLElement;

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

  const handleOnMouseMoveColumnHeaderWithColumnGrouping = useCallback(
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

      columnGroupContainer.style.gridTemplateColumns = gridColumnHeadersLayout;
      columnChildrenContainer.style.gridTemplateColumns = gridColumnLayout;
    },
    [
      columnChildrenContainer,
      columnGroupContainer,
      columnHeaderRefs,
      columnHeaderResizeIndex,
      columnRefs,
    ]
  );

  const handleOnMouseMoveColumnWithColumnGrouping = useCallback(
    (event: any) => {
      let gridColumnLayout = "";
      let gridColumnHeadersLayout = "";

      columnHeaderRefs?.forEach((column, index) => {
        if (index === columnHeaderResizeIndex) {
          let dif = 0;
          columnRefs[index].forEach((col, idx) => {
            if (idx === columnResizeIndex) {
              const beforeWidth = col.offsetWidth;
              const width = event.clientX - col.offsetLeft;
              dif = width - beforeWidth;
              gridColumnLayout += `${width}px `;
            } else {
              const width = col.offsetWidth;
              gridColumnLayout += `${width}px `;
            }
          });

          const newColumnHeaderWidth = column.offsetWidth + dif;
          gridColumnHeadersLayout += `${newColumnHeaderWidth}px `;
        } else {
          const columnHeaderWidth = column.offsetWidth;
          gridColumnHeadersLayout += `${columnHeaderWidth}px `;

          columnRefs[index].forEach((col, idx) => {
            const width = col.offsetWidth;
            gridColumnLayout += `${width}px `;
          });
        }
      });

      columnGroupContainer.style.gridTemplateColumns = gridColumnHeadersLayout;
      columnChildrenContainer.style.gridTemplateColumns = gridColumnLayout;
    },
    [
      columnChildrenContainer,
      columnGroupContainer,
      columnHeaderRefs,
      columnHeaderResizeIndex,
      columnRefs,
      columnResizeIndex,
    ]
  );

  const handleOnMouseMoveColumnWithoutColumnGrouping = useCallback(
    (event: any) => {
      let gridColumnLayout = "";

      console.log("test: ", columnHeaderResizeIndex);

      columnRefs.forEach((column, index) => {
        if (index === columnHeaderResizeIndex) {
          column.forEach((col) => {
            const width = event.clientX - col.offsetLeft;
            gridColumnLayout += `${width}px `;
          });
        } else {
          column.forEach((col) => {
            const width = col.offsetWidth;
            gridColumnLayout += `${width}px `;
          });
        }
      });

      columnChildrenContainer.style.gridTemplateColumns = gridColumnLayout;
    },
    [columnChildrenContainer, columnHeaderResizeIndex, columnRefs]
  );

  const removeListeners = useCallback(() => {
    window.removeEventListener(
      "mousemove",
      handleOnMouseMoveColumnHeaderWithColumnGrouping
    );
    window.removeEventListener(
      "mousemove",
      handleOnMouseMoveColumnWithColumnGrouping
    );
    window.removeEventListener(
      "mousemove",
      handleOnMouseMoveColumnWithoutColumnGrouping
    );
    window.removeEventListener("mouseup", handleOnMouseUp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    handleOnMouseMoveColumnWithColumnGrouping,
    handleOnMouseMoveColumnHeaderWithColumnGrouping,
    handleOnMouseMoveColumnWithoutColumnGrouping,
  ]);

  const handleOnMouseUp = useCallback(() => {
    setColumnHeaderResizeIndex(null);
    setColumnResizeIndex(null);
    removeListeners();
  }, [removeListeners]);

  useEffect(() => {
    // resize columns with no grouping
    if (!columnGrouping && columnResizeIndex !== null) {
      window.addEventListener(
        "mousemove",
        handleOnMouseMoveColumnWithoutColumnGrouping
      );
      window.addEventListener("mouseup", handleOnMouseUp);
    }

    // resize column headers with grouping
    if (
      columnGrouping &&
      columnHeaderResizeIndex !== null &&
      columnResizeIndex === null
    ) {
      window.addEventListener(
        "mousemove",
        handleOnMouseMoveColumnHeaderWithColumnGrouping
      );
      window.addEventListener("mouseup", handleOnMouseUp);
    }

    // resize normal columns with grouping
    if (
      columnGrouping &&
      columnHeaderResizeIndex !== null &&
      columnResizeIndex !== null
    ) {
      window.addEventListener(
        "mousemove",
        handleOnMouseMoveColumnWithColumnGrouping
      );
      window.addEventListener("mouseup", handleOnMouseUp);
    }

    return () => {
      removeListeners();
    };
  }, [
    columnGrouping,
    columnHeaderResizeIndex,
    columnResizeIndex,
    handleOnMouseMoveColumnWithColumnGrouping,
    handleOnMouseMoveColumnHeaderWithColumnGrouping,
    handleOnMouseUp,
    removeListeners,
    handleOnMouseMoveColumnWithoutColumnGrouping,
  ]);

  const onResize = ({
    columnHeaderIndex = null,
    columnIndex = null,
  }: IOnResizeProps) => {
    setColumnHeaderResizeIndex(columnHeaderIndex);
    setColumnResizeIndex(columnIndex);
  };

  return { onResize };
};

export default useOnResizeColumns;
