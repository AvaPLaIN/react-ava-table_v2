import styled from "styled-components";

export const HeaderContainer = styled.div`
  border: 1px solid blue;
  display: grid;
  grid-template-columns: 400px 400px;

  .column-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .drag {
    cursor: col-resize;
    width: 10px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
