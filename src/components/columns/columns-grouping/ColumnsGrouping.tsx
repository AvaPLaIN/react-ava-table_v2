import Children from "../components/children/Children";
import Header from "../components/header/Header";
import { ColumnHeaderContainer } from "./ColumnsGrouping.styles";
import { IColumnsGrouping } from "./ColumnsGrouping.types";

const ColumnGrouping = ({ columns, onResize }: IColumnsGrouping) => {
  const childrenColumns = columns
    .map((column, index) => ({ index, column: column.children }))
    .flat();

  return (
    <>
      <ColumnHeaderContainer>
        <Header columns={columns} onResize={onResize} />
      </ColumnHeaderContainer>
      <Children columns={childrenColumns} onResize={onResize} />
    </>
  );
};

export default ColumnGrouping;
