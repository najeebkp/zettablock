import styled from "styled-components";

export const Row = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const Button = styled.div`
  padding: 6px 10px;
  // margin: 0 5px;
  cursor: pointer;
  font-size: 12px;
  background: ${(props) => (props.active ? "grey" : "")};
  color: ${(props) => (props.active ? "white" : "grey")};
  &:hover {
    background: ${(props) => (props.active ? "#8e8e8e" : "#f2f2f2")};
  }
`;
