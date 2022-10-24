import styled from "styled-components";
import { Trash, Search, Create } from "@styled-icons/ionicons-outline";

export const Container = styled.div`
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  display: block;
  max-width: 1000px;
  margin-top: 70px;
`;

export const Table = styled.div`
  border: 1px solid #eeeeef;
`;

export const TableCell = styled.div`
  display: flex;
  border-bottom: 1px solid #eeeeef;
  background: ${(props) => (props.head ? "#FAFAFA" : "")};
  padding: 20px;
`;
export const DetailedRow = styled.div`
  background: #fafafa;
  padding: 20px 50px;
  display: flex;
  flex-wrap: wrap;
  box-shadow: inset 0px 11px 8px -10px #ccc, inset 0px -11px 8px -10px #ccc;
`;
export const Title = styled.div`
  width: ${(props) =>
    props.big ? "300px" : props.small ? "40px" : props.auto ? "auto" : "100px"};
  color: ${(props) => (props.head ? "#696C70" : "#474B4F")};
  font-size: ${(props) => (props.size ? props.size : "14px")};
  font-weight: ${(props) => (props.bold ? "600" : "")};
  cursor: ${(props) => (props.button ? "pointer" : "")};
  text-align: left;
  padding-bottom: 6px;
  margin-left: ${(props) => (props.floatRight ? "auto" : "")};
  pointer-events: ${(props) => (props.disabled == true ? "none" : "")};
`;
export const SearchWrapper = styled.div`
  padding: 1px 8px;
  cursor: pointer;
  font-size: 12px;
  border: 1px solid #f2f2f2;
  height: fit-content;
  input {
    border: none;
    &:focus {
      outline: none;
    }
  }
`;

export const Row = styled.div`
  // display: flex;
  margin: 20px 20px;
  width: 45%;
`;

export const QueryFormat = styled.div`
  display: block;
  max-height: 200px;
  overflow-y: scroll;
  padding: 9.5px;
  margin: 0 0 10px;
  font-size: 13px;
  line-height: 1.42857143;
  color: #333;
  word-break: break-all;
  word-wrap: break-word;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px;
  white-space: pre;
`;

export const Button = styled.div`
  padding: 3px 10px;
  margin: 0 5px;
  cursor: pointer;
  font-size: 12px;
  border: 1px solid #f2f2f2;

  background: ${(props) => (props.variant == "success" ? "green" : "")};
  color: ${(props) => (props.variant == "success" ? "white" : "grey")};
  &:hover {
    background: ${(props) =>
      props.variant == "success" ? "darkgreen" : "#f2f2f2"};
  }
`;

export const Loading = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
`;

export const TrashIcon = styled(Trash)`
  color: red;
  cursor: pointer;
`;
export const SearchIcon = styled(Search)`
  cursor: pointer;
`;
export const PencilIcon = styled(Create)`
  cursor: pointer;
  margin-left: 10px;
  margin-top: -5px;
`;
