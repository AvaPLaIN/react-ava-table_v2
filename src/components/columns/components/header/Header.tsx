import { IColumnsGrouping } from "../../columns-grouping/ColumnsGrouping.types";
import { HeaderContainer } from "./Header.styles";

const Header = ({ columns, onResize }: IColumnsGrouping) => {
  return (
    <HeaderContainer>
      {columns.map((column, index) => (
        <div key={index} data-name="column-header" data-header-id={index}>
          <p>{column.headerName}</p>
          <div onMouseDown={() => onResize({ columnHeaderIndex: index })}>
            |
          </div>
        </div>
      ))}
    </HeaderContainer>
  );
};

export default Header;
