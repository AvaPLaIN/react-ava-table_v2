import { IColumnsGrouping } from "../../columns-grouping/ColumnsGrouping.types";
import { HeaderContainer } from "./Header.styles";

const Header = ({ columns, onResize }: IColumnsGrouping) => {
  return (
    <HeaderContainer data-name="column-group-container">
      {columns.map((column, index) => (
        <div
          key={index}
          data-name="column-header"
          data-header-id={index}
          className="column-container"
        >
          <p>{column.headerName}</p>
          <div
            onMouseDown={() => onResize({ columnHeaderIndex: index })}
            className="drag"
          >
            |
          </div>
        </div>
      ))}
    </HeaderContainer>
  );
};

export default Header;
