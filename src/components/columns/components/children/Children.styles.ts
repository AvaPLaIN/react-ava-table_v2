import styled from "styled-components";

export const ChildrenContainer = styled.div`
  border: 1px solid green;
  display: grid;
  grid-template-columns: 200px 200px 200px 200px;

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
