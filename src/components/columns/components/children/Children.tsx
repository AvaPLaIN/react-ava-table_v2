import { IOnResizeProps } from "../../../../hooks/useOnResizeColumns";
import { ColumnType } from "../../Columns.types";
import { ChildrenContainer } from "./Children.styles";

type ChildrenColumnType = {
  index: number;
  column: ColumnType[];
};

interface IChildrenProps {
  columns: ChildrenColumnType[];
  onResize: ({ columnHeaderIndex, columnIndex }: IOnResizeProps) => void;
}

const Children = ({ columns, onResize }: IChildrenProps) => {
  return (
    <ChildrenContainer>
      {columns.map((column) =>
        column.column.map((col, idx) => (
          <div
            key={`${column.index}-${idx}`}
            data-name="column"
            data-header-id={column.index}
            className="column-container"
          >
            <p>{col.label}</p>
            <div
              className="drag"
              onMouseDown={() =>
                onResize({ columnIndex: idx, columnHeaderIndex: column.index })
              }
            >
              |
            </div>
          </div>
        ))
      )}
    </ChildrenContainer>
  );
};

export default Children;
