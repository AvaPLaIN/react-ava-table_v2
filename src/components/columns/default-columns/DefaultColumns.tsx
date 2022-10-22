import Children from "../components/children/Children";
import { DefaultColumnsContainer } from "./DefaultColumns.styles";
import { IDefaultColumns } from "./DefaultColumns.types";

const DefaultColumns = ({ columns, onResize }: IDefaultColumns) => {
  const childrenColumns = columns.map((column, index) => ({
    index,
    column: [column],
  }));

  return (
    <DefaultColumnsContainer>
      <Children columns={childrenColumns} onResize={onResize} />
    </DefaultColumnsContainer>
  );
};

export default DefaultColumns;
